"use client";

import { useMemo, useState, type ReactNode } from "react";
import { selectClass, selectStyle } from "@/components/admin/ui";

const PAGE_SIZES = [10, 25, 50, 100] as const;

export function useClientPagination<T>(items: T[], initialPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const from = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, total);

  function goTo(next: number) {
    setPage(Math.max(1, Math.min(totalPages, next)));
  }

  function changePageSize(size: number) {
    setPageSize(size);
    setPage(1);
  }

  return {
    pageItems,
    page: currentPage,
    pageSize,
    total,
    totalPages,
    from,
    to,
    goTo,
    changePageSize,
    setPage,
  };
}

export function PaginationBar({
  page,
  pageSize,
  total,
  totalPages,
  from,
  to,
  onPageChange,
  onPageSizeChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  from: number;
  to: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) {
  if (total === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3 text-sm text-[#003641]/70">
        <label className="inline-flex items-center gap-2">
          <span>Exibir</span>
          <select
            className={`${selectClass} w-auto min-w-[4.5rem] py-1.5`}
            style={selectStyle}
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <span>
          Mostrando <strong>{from}</strong>–<strong>{to}</strong> de{" "}
          <strong>{total}</strong> {total === 1 ? "item" : "itens"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#003641] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Anterior
        </button>
        <span className="min-w-[7rem] text-center text-xs font-semibold text-[#003641]/70">
          Página {page} de {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#003641] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export function AdminDataTable({
  columns,
  rows,
  empty,
  pageSize = 10,
}: {
  columns: Array<{ key: string; header: string; className?: string }>;
  rows: Array<{ id: string | number; cells: Record<string, ReactNode> }>;
  empty: string;
  pageSize?: number;
}) {
  const pagination = useClientPagination(rows, pageSize);

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 px-4 py-10 text-center text-sm text-[#003641]/55">
        {empty}
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b text-xs uppercase tracking-wide text-[#003641]/45">
              {columns.map((col) => (
                <th key={col.key} className={`px-2 py-3 ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagination.pageItems.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 align-top">
                {columns.map((col) => (
                  <td key={col.key} className={`px-2 py-3 ${col.className || ""}`}>
                    {row.cells[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationBar
        page={pagination.page}
        pageSize={pagination.pageSize}
        total={pagination.total}
        totalPages={pagination.totalPages}
        from={pagination.from}
        to={pagination.to}
        onPageChange={pagination.goTo}
        onPageSizeChange={pagination.changePageSize}
      />
    </div>
  );
}
