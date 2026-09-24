"use client";

import Image from "next/image";
import { useActionState } from "react";
import { unlockSite, type UnlockState } from "./actions";

const initialState: UnlockState = { error: "" };

export default function AcessoGateForm() {
  const [state, formAction, pending] = useActionState(unlockSite, initialState);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#e8f4f3] via-white to-[#f3f7e9] px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <Image
          src="/header/logo-header.svg"
          alt="Credicitrus"
          width={260}
          height={52}
          priority
        />

        <div className="w-full text-center space-y-2">
          <h1 className="text-primary text-2xl md:text-3xl font-extrabold tracking-tight">
            Acesso restrito
          </h1>
          <p className="text-primary/70 text-sm md:text-base font-medium leading-relaxed">
            O site está em desenvolvimento. Informe a senha para continuar.
          </p>
        </div>

        <form action={formAction} className="w-full space-y-4">
          <label className="block space-y-2">
            <span className="sr-only">Senha</span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              autoComplete="current-password"
              placeholder="Digite a senha"
              className="w-full rounded-xl border border-primary/15 bg-white px-4 py-3.5 text-primary text-base outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
            />
          </label>

          {state.error ? (
            <p className="text-sm font-medium text-red-600 text-center" role="alert">
              {state.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-secondary hover:bg-primary disabled:opacity-60 text-white font-bold text-base py-3.5 transition-colors"
          >
            {pending ? "Validando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
