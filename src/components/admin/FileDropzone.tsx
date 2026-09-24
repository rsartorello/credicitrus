"use client";

import { useCallback, useId, useRef, useState } from "react";
import { FileText, ImageIcon, Upload, X } from "lucide-react";

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

type FileDropzoneProps = {
  label: string;
  hint?: string;
  accept?: string;
  required?: boolean;
  value: File | null;
  onChange: (file: File | null) => void;
  previewUrl?: string | null;
};

export function FileDropzone({
  label,
  hint = "Arraste o arquivo para cá ou clique para escolher",
  accept = "application/pdf,.pdf",
  required = false,
  value,
  onChange,
  previewUrl = null,
}: FileDropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const isImageAccept = accept.includes("image");

  const applyFile = useCallback(
    (file: File | null) => {
      if (localPreview) URL.revokeObjectURL(localPreview);
      if (file && file.type.startsWith("image/")) {
        setLocalPreview(URL.createObjectURL(file));
      } else {
        setLocalPreview(null);
      }
      onChange(file);
    },
    [localPreview, onChange],
  );

  function onPick(fileList: FileList | null) {
    const file = fileList?.[0] ?? null;
    applyFile(file);
  }

  const showPreview = localPreview || previewUrl;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={inputId} className="text-sm font-semibold text-[#003641]">
          {label}
          {required ? <span className="text-red-600"> *</span> : null}
        </label>
        {value ? (
          <button
            type="button"
            onClick={() => {
              applyFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="text-xs font-medium text-red-600 hover:underline"
          >
            Remover arquivo
          </button>
        ) : null}
      </div>

      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          onPick(e.dataTransfer.files);
        }}
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition ${
          dragging
            ? "border-[#00A79D] bg-[#e8f8f7]"
            : value
              ? "border-[#00A79D]/40 bg-white"
              : "border-gray-300 bg-[#fafbfc] hover:border-[#00A79D]/60 hover:bg-white"
        }`}
      >
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept={accept}
          required={required && !value}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
          onChange={(e) => onPick(e.target.files)}
        />

        {value || showPreview ? (
          <div className="flex items-center gap-4 p-4">
            {isImageAccept && showPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={showPreview}
                alt="Pré-visualização"
                className="h-20 w-28 rounded-lg object-cover ring-1 ring-black/5"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#003641]/5 text-[#00A79D]">
                {isImageAccept ? <ImageIcon className="h-7 w-7" /> : <FileText className="h-7 w-7" />}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#003641]">
                {value?.name || "Arquivo selecionado"}
              </p>
              {value ? (
                <p className="mt-1 text-xs text-[#003641]/60">{formatBytes(value.size)}</p>
              ) : (
                <p className="mt-1 text-xs text-[#003641]/60">Clique para trocar o arquivo</p>
              )}
              <p className="mt-2 text-xs font-medium text-[#00A79D]">Pronto para enviar</p>
            </div>
            <X className="h-4 w-4 shrink-0 text-[#003641]/30" aria-hidden />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00A79D]/10 text-[#00A79D]">
              <Upload className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-[#003641]">{hint}</p>
            <p className="max-w-sm text-xs leading-relaxed text-[#003641]/55">
              {isImageAccept
                ? "Formatos: JPG, PNG ou WebP. Prefira imagens leves para o banner."
                : "Formato aceito: PDF. Tamanho máximo 40 MB."}
            </p>
            <span className="mt-1 rounded-full bg-[#003641] px-3 py-1.5 text-xs font-semibold text-white">
              Escolher arquivo
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
