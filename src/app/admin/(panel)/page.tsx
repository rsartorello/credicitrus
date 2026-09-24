import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  ImageIcon,
  Info,
  Layers3,
} from "lucide-react";
import { getAdminSession } from "@/lib/cms/auth";
import {
  formatAuditAction,
  formatDateTime,
  getDashboardData,
} from "@/lib/cms/dashboard";

export default async function AdminHomePage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  let data: Awaited<ReturnType<typeof getDashboardData>>;
  try {
    data = await getDashboardData(session);
  } catch {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-extrabold text-[#003641]">Dashboard</h1>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          Não foi possível carregar as métricas do CMS. Confira se o SQL Server
          está no ar e se <code className="rounded bg-white px-1">CMS_ENABLED=true</code>{" "}
          no <code className="rounded bg-white px-1">.env.local</code>.
        </div>
      </div>
    );
  }

  const {
    totals,
    moduleStats,
    alerts,
    recentDocuments,
    recentActivity,
    showAudit,
    tariff,
    campaigns,
  } = data;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#00A79D]">
            Visão geral
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#003641]">
            Dashboard do CMS
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#003641]/70 md:text-base">
            Olá, <strong>{session.username}</strong>. Acompanhe o status do
            conteúdo de Transparência e das campanhas da home.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/relatorios"
            className="rounded-xl bg-[#00A79D] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#008f86]"
          >
            Novo relatório
          </Link>
          <Link
            href="/admin/banners"
            className="rounded-xl border border-[#003641]/15 bg-white px-4 py-2.5 text-sm font-bold text-[#003641] hover:bg-white/80"
          >
            Nova campanha
          </Link>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Documentos"
          value={totals.documents}
          hint={`${totals.published} publicados`}
          icon={<FileText className="h-5 w-5" />}
        />
        <KpiCard
          label="Rascunhos"
          value={totals.drafts}
          hint="Ainda não visíveis no site"
          icon={<Layers3 className="h-5 w-5" />}
        />
        <KpiCard
          label="Banners"
          value={totals.banners}
          hint={`${totals.bannersPublished} ativos/publicados`}
          icon={<ImageIcon className="h-5 w-5" />}
        />
        <KpiCard
          label="Módulos com conteúdo"
          value={totals.categoriesCovered}
          hint="de 5 módulos documentais"
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h2 className="text-lg font-bold text-[#003641]">Atenção e status</h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.title}
                className={`rounded-2xl border px-4 py-4 ${
                  alert.tone === "warning"
                    ? "border-amber-200 bg-amber-50"
                    : alert.tone === "success"
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-sky-200 bg-sky-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-[#003641]/70">
                    {alert.tone === "warning" ? (
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    ) : alert.tone === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Info className="h-5 w-5 text-sky-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#003641]">{alert.title}</p>
                    <p className="mt-1 text-sm text-[#003641]/70">{alert.detail}</p>
                    {alert.href ? (
                      <Link
                        href={alert.href}
                        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#00A79D] hover:underline"
                      >
                        Resolver agora <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#003641]">Tabela de tarifas</h2>
          <p className="mt-1 text-sm text-[#003641]/65">
            Arquivo usado no Header e no Rodapé do site.
          </p>
          <div className="mt-4 rounded-xl bg-[#f4f6f7] p-4">
            {tariff.url ? (
              <>
                <p className="text-xs font-bold uppercase tracking-wide text-[#00A79D]">
                  Vigente
                </p>
                <p className="mt-1 font-semibold text-[#003641]">
                  {tariff.title || "Tabela publicada"}
                </p>
                <a
                  href={tariff.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-[#00A79D] hover:underline"
                >
                  Abrir arquivo atual
                </a>
              </>
            ) : (
              <>
                <p className="font-semibold text-amber-700">Sem tarifa vigente</p>
                <p className="mt-1 text-sm text-[#003641]/65">
                  Cadastre e marque um PDF como vigente.
                </p>
              </>
            )}
          </div>
          <Link
            href="/admin/tarifas"
            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#003641] hover:text-[#00A79D]"
          >
            Gerenciar tarifas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-lg font-bold text-[#003641]">Módulos</h2>
          <p className="text-xs text-[#003641]/55">Clique para gerenciar</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {moduleStats.map((mod) => {
            const coverage =
              mod.total === 0 ? 0 : Math.round((mod.published / mod.total) * 100);
            return (
              <Link
                key={mod.key}
                href={mod.href}
                className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-[#003641] group-hover:text-[#00A79D]">
                      {mod.label}
                    </h3>
                    <p className="mt-1 text-sm text-[#003641]/65">{mod.description}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#003641]/25 transition group-hover:text-[#00A79D]" />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  <MetricMini label="Total" value={mod.total} />
                  <MetricMini label="Publicados" value={mod.published} />
                  <MetricMini label="Rascunhos" value={mod.drafts} />
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-[11px] font-semibold text-[#003641]/55">
                    <span>Publicação</span>
                    <span>{coverage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#eef1f2]">
                    <div
                      className="h-full rounded-full bg-[#00A79D]"
                      style={{ width: `${coverage}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#003641]">Documentos recentes</h2>
            <Link href="/admin/relatorios" className="text-xs font-bold text-[#00A79D] hover:underline">
              Ver todos
            </Link>
          </div>
          {recentDocuments.length === 0 ? (
            <EmptyState text="Nenhum documento cadastrado no CMS ainda." />
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentDocuments.map((doc) => (
                <li key={doc.Id} className="flex items-start justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#003641]">{doc.Title}</p>
                    <p className="mt-0.5 text-xs text-[#003641]/55">
                      {doc.Module || "módulo"}
                      {doc.CategoryTitle ? ` · ${doc.CategoryTitle}` : ""}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-bold ${
                      doc.IsPublished
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {doc.IsPublished ? "Publicado" : "Rascunho"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#003641]">Campanhas recentes</h2>
            <Link href="/admin/banners" className="text-xs font-bold text-[#00A79D] hover:underline">
              Ver banners
            </Link>
          </div>
          {campaigns.length === 0 ? (
            <EmptyState text="Nenhuma campanha cadastrada." />
          ) : (
            <ul className="divide-y divide-gray-100">
              {campaigns.map((item) => (
                <li key={item.Id} className="flex items-start justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#003641]">{item.Title}</p>
                    <p className="mt-0.5 text-xs text-[#003641]/55">
                      {item.CtaLabel ? `CTA: ${item.CtaLabel}` : "Sem CTA"}
                      {item.StartsAt || item.EndsAt
                        ? ` · ${formatDateTime(item.StartsAt)} → ${formatDateTime(item.EndsAt)}`
                        : ""}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-bold ${
                      item.IsPublished
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {item.IsPublished ? "Publicado" : "Rascunho"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {showAudit ? (
        <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#003641]">Atividade recente</h2>
          <p className="mt-1 text-sm text-[#003641]/65">
            Últimas ações registradas no CMS (uploads, publicações e exclusões).
          </p>
          {recentActivity.length === 0 ? (
            <div className="mt-4">
              <EmptyState text="Ainda não há atividade registrada." />
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-gray-100">
              {recentActivity.map((item, index) => (
                <li
                  key={`${item.CreatedAt}-${index}`}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="text-sm text-[#003641]">
                    <strong>{item.Actor}</strong> {formatAuditAction(item.Action)}{" "}
                    <span className="font-medium">{item.EntityType}</span>
                    {item.Details ? (
                      <span className="text-[#003641]/60"> — {item.Details}</span>
                    ) : null}
                  </p>
                  <span className="text-xs font-medium text-[#003641]/45">
                    {formatDateTime(item.CreatedAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}
    </div>
  );
}

function KpiCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: number;
  hint: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#003641]/65">{label}</p>
        <div className="rounded-xl bg-[#00A79D]/10 p-2 text-[#00A79D]">{icon}</div>
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#003641]">{value}</p>
      <p className="mt-1 text-xs text-[#003641]/55">{hint}</p>
    </div>
  );
}

function MetricMini({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-[#f4f6f7] px-2 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#003641]/45">
        {label}
      </p>
      <p className="text-lg font-extrabold text-[#003641]">{value}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 bg-[#fafbfc] px-4 py-8 text-center text-sm text-[#003641]/55">
      {text}
    </div>
  );
}
