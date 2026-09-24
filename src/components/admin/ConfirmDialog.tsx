"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

type ConfirmOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "neutral";
  /** Exige um segundo passo de confirmação no mesmo modal. */
  doubleConfirm?: boolean;
  doubleConfirmTitle?: string;
  doubleConfirmDescription?: string;
};

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

type Pending = ConfirmOptions & {
  resolve: (value: boolean) => void;
};

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<Pending | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const titleId = useId();
  const descId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const confirm = useCallback<ConfirmFn>((options) => {
    return new Promise<boolean>((resolve) => {
      setStep(1);
      setPending({ ...options, resolve });
    });
  }, []);

  function close(result: boolean) {
    pending?.resolve(result);
    setPending(null);
    setStep(1);
  }

  useEffect(() => {
    if (!pending) return;
    const previous = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- close reads latest pending via setState
  }, [pending]);

  const tone = pending?.tone ?? "danger";
  const isStep2 = Boolean(pending?.doubleConfirm && step === 2);
  const title = isStep2
    ? pending?.doubleConfirmTitle || "Confirmar exclusão"
    : pending?.title || "";
  const description = isStep2
    ? pending?.doubleConfirmDescription ||
      "Esta ação não pode ser desfeita. Deseja continuar?"
    : pending?.description;

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {pending ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-[#003641]/45 backdrop-blur-[2px] transition"
            onClick={() => close(false)}
          />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            className="relative z-[101] w-full max-w-md overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl shadow-[#003641]/20"
          >
            <div className="flex items-start gap-4 p-5 sm:p-6">
              <div
                className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  tone === "danger"
                    ? "bg-red-50 text-red-600"
                    : "bg-[#00A79D]/10 text-[#00A79D]"
                }`}
              >
                {tone === "danger" ? (
                  isStep2 ? (
                    <Trash2 className="h-5 w-5" strokeWidth={2} />
                  ) : (
                    <AlertTriangle className="h-5 w-5" strokeWidth={2} />
                  )
                ) : (
                  <AlertTriangle className="h-5 w-5" strokeWidth={2} />
                )}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <h2
                  id={titleId}
                  className="text-lg font-extrabold tracking-tight text-[#003641]"
                >
                  {title}
                </h2>
                {description ? (
                  <p
                    id={descId}
                    className="mt-2 text-sm leading-relaxed text-[#003641]/70"
                  >
                    {description}
                  </p>
                ) : null}
                {pending.doubleConfirm ? (
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className={`h-1.5 flex-1 rounded-full ${
                        step >= 1 ? "bg-[#00A79D]" : "bg-gray-200"
                      }`}
                    />
                    <span
                      className={`h-1.5 flex-1 rounded-full ${
                        step >= 2 ? "bg-red-500" : "bg-gray-200"
                      }`}
                    />
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => close(false)}
                className="rounded-lg p-1.5 text-[#003641]/45 transition hover:bg-gray-100 hover:text-[#003641]"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-gray-100 bg-gray-50/80 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                ref={cancelRef}
                type="button"
                onClick={() => close(false)}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#003641] transition hover:bg-gray-50"
              >
                {pending.cancelLabel || "Cancelar"}
              </button>
              {pending.doubleConfirm && step === 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center justify-center rounded-xl bg-[#003641] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#002a32]"
                >
                  Continuar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => close(true)}
                  className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold text-white transition ${
                    tone === "danger"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-[#00A79D] hover:bg-[#008f86]"
                  }`}
                >
                  {pending.confirmLabel || "Confirmar"}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmFn {
  const confirm = useContext(ConfirmContext);
  if (!confirm) {
    throw new Error("useConfirm deve ser usado dentro de ConfirmProvider.");
  }
  return confirm;
}

export function confirmDelete(
  confirm: ConfirmFn,
  entityLabel = "este item",
): Promise<boolean> {
  return confirm({
    title: `Excluir ${entityLabel}?`,
    description:
      "O registro será removido permanentemente do CMS e deixará de aparecer no site.",
    confirmLabel: "Excluir definitivamente",
    tone: "danger",
    doubleConfirm: true,
    doubleConfirmTitle: "Confirma a exclusão?",
    doubleConfirmDescription:
      "Esta é a última confirmação. A exclusão não pode ser desfeita.",
  });
}

export function useConfirmDelete() {
  const confirm = useConfirm();
  return useCallback(
    (entityLabel = "este item") => confirmDelete(confirm, entityLabel),
    [confirm],
  );
}
