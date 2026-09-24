export const PERMISSION_MODULES = [
  "relatorios",
  "normativos",
  "etica",
  "tarifas",
  "assembleia",
  "banners",
] as const;

export type PermissionModule = (typeof PERMISSION_MODULES)[number];
export type PermissionLevel = "none" | "view" | "edit" | "publish";

export const PERMISSION_MODULE_LABELS: Record<PermissionModule, string> = {
  relatorios: "Relatórios",
  normativos: "Normativos",
  etica: "Ética e Integridade",
  tarifas: "Tabela de Tarifas",
  assembleia: "Assembleias",
  banners: "Banners da home",
};

export const DOCUMENT_MODULES = PERMISSION_MODULES.filter(
  (module) => module !== "banners",
);

const LEVEL_RANK: Record<PermissionLevel, number> = {
  none: 0,
  view: 1,
  edit: 2,
  publish: 3,
};

export type CmsSession = {
  userId: number | null;
  username: string;
  isSuperAdmin: boolean;
  isEnvAdmin: boolean;
  /** true = sessão válida, mas o painel/APIs ficam bloqueados até trocar a senha */
  mustChangePassword: boolean;
  permissions: Record<PermissionModule, PermissionLevel>;
};

export function emptyPermissions(): Record<PermissionModule, PermissionLevel> {
  return {
    relatorios: "none",
    normativos: "none",
    etica: "none",
    tarifas: "none",
    assembleia: "none",
    banners: "none",
  };
}

export function fullPermissions(): Record<PermissionModule, PermissionLevel> {
  return {
    relatorios: "publish",
    normativos: "publish",
    etica: "publish",
    tarifas: "publish",
    assembleia: "publish",
    banners: "publish",
  };
}

export function isPermissionModule(value: string): value is PermissionModule {
  return (PERMISSION_MODULES as readonly string[]).includes(value);
}

export function isPermissionLevel(value: string): value is PermissionLevel {
  return value === "none" || value === "view" || value === "edit" || value === "publish";
}

export function canAccess(
  session: CmsSession,
  module: PermissionModule,
  minLevel: Exclude<PermissionLevel, "none">,
): boolean {
  if (session.isSuperAdmin) return true;
  return LEVEL_RANK[session.permissions[module] || "none"] >= LEVEL_RANK[minLevel];
}

export function assertModuleAccess(
  session: CmsSession,
  module: PermissionModule,
  minLevel: Exclude<PermissionLevel, "none">,
): void {
  if (!canAccess(session, module, minLevel)) {
    throw new Error("FORBIDDEN");
  }
}

export function assertSuperAdmin(session: CmsSession): void {
  if (!session.isSuperAdmin) {
    throw new Error("FORBIDDEN");
  }
}
