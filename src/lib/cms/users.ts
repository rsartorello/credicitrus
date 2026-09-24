import { query, execute } from "./db";
import { assertPasswordPolicy, hashPassword, verifyPassword } from "./password";
import {
  emptyPermissions,
  isPermissionLevel,
  isPermissionModule,
  PERMISSION_MODULES,
  type PermissionLevel,
  type PermissionModule,
} from "./permissions";

export interface CmsUserRow {
  Id: number;
  Username: string;
  DisplayName: string;
  PasswordHash: string;
  IsSuperAdmin: boolean;
  IsActive: boolean;
  SessionVersion: number;
  MustChangePassword: boolean;
}

export interface CmsUserPublic {
  Id: number;
  Username: string;
  DisplayName: string;
  IsSuperAdmin: boolean;
  IsActive: boolean;
  MustChangePassword: boolean;
  permissions: Record<PermissionModule, PermissionLevel>;
}

function asBool(value: unknown): boolean {
  return value === true || value === 1;
}

function mapUser(row: CmsUserRow): CmsUserRow {
  return {
    ...row,
    IsSuperAdmin: asBool(row.IsSuperAdmin),
    IsActive: asBool(row.IsActive),
    MustChangePassword: asBool(row.MustChangePassword),
    SessionVersion: Number(row.SessionVersion ?? 0),
  };
}

const USER_SELECT = `Id, Username, DisplayName, PasswordHash, IsSuperAdmin, IsActive, SessionVersion, MustChangePassword`;

export async function getUserByUsername(
  username: string,
): Promise<CmsUserRow | null> {
  const rows = await query<CmsUserRow>(
    `SELECT ${USER_SELECT}
     FROM CmsUser
     WHERE Username = @username`,
    { username },
  );
  return rows[0] ? mapUser(rows[0]) : null;
}

export async function getUserById(id: number): Promise<CmsUserRow | null> {
  const rows = await query<CmsUserRow>(
    `SELECT ${USER_SELECT}
     FROM CmsUser
     WHERE Id = @id`,
    { id },
  );
  return rows[0] ? mapUser(rows[0]) : null;
}

export async function listUserPermissions(
  userId: number,
): Promise<Record<PermissionModule, PermissionLevel>> {
  const permissions = emptyPermissions();
  const rows = await query<{ Module: string; AccessLevel: string }>(
    `SELECT Module, AccessLevel FROM CmsUserPermission WHERE UserId = @userId`,
    { userId },
  );

  for (const row of rows) {
    if (isPermissionModule(row.Module) && isPermissionLevel(row.AccessLevel)) {
      permissions[row.Module] = row.AccessLevel;
    }
  }

  return permissions;
}

export async function toPublicUser(user: CmsUserRow): Promise<CmsUserPublic> {
  return {
    Id: user.Id,
    Username: user.Username,
    DisplayName: user.DisplayName,
    IsSuperAdmin: user.IsSuperAdmin,
    IsActive: user.IsActive,
    MustChangePassword: user.MustChangePassword,
    permissions: await listUserPermissions(user.Id),
  };
}

export async function listUsers(): Promise<CmsUserPublic[]> {
  const rows = await query<CmsUserRow>(
    `SELECT ${USER_SELECT}
     FROM CmsUser
     ORDER BY Username`,
  );
  const users = rows.map(mapUser);
  return Promise.all(users.map(toPublicUser));
}

export async function countSuperAdmins(): Promise<number> {
  const rows = await query<{ Total: number }>(
    `SELECT COUNT(*) AS Total FROM CmsUser WHERE IsSuperAdmin = 1 AND IsActive = 1`,
  );
  return Number(rows[0]?.Total ?? 0);
}

async function replacePermissions(
  userId: number,
  permissions: Record<PermissionModule, PermissionLevel>,
): Promise<void> {
  await execute(`DELETE FROM CmsUserPermission WHERE UserId = @userId`, { userId });

  for (const module of PERMISSION_MODULES) {
    const level = permissions[module] || "none";
    await execute(
      `INSERT INTO CmsUserPermission (UserId, Module, AccessLevel)
       VALUES (@userId, @module, @level)`,
      { userId, module, level },
    );
  }
}

function normalizePermissions(
  input?: Partial<Record<PermissionModule, PermissionLevel>>,
): Record<PermissionModule, PermissionLevel> {
  const next = emptyPermissions();
  if (!input) return next;
  for (const module of PERMISSION_MODULES) {
    const level = input[module];
    if (level && isPermissionLevel(level)) {
      next[module] = level;
    }
  }
  return next;
}

export async function createUser(input: {
  username: string;
  displayName: string;
  password: string;
  isSuperAdmin?: boolean;
  isActive?: boolean;
  permissions?: Partial<Record<PermissionModule, PermissionLevel>>;
}): Promise<number> {
  const username = input.username.trim().toLowerCase();
  const displayName = input.displayName.trim();
  if (!username || !displayName) {
    throw new Error("Usuário e nome são obrigatórios");
  }
  assertPasswordPolicy(input.password);

  const existing = await getUserByUsername(username);
  if (existing) {
    throw new Error("Já existe um usuário com esse login");
  }

  const passwordHash = await hashPassword(input.password);
  const rows = await query<{ Id: number }>(
    `INSERT INTO CmsUser (Username, DisplayName, PasswordHash, IsSuperAdmin, IsActive, MustChangePassword)
     OUTPUT INSERTED.Id
     VALUES (@username, @displayName, @passwordHash, @isSuperAdmin, @isActive, 1)`,
    {
      username,
      displayName,
      passwordHash,
      isSuperAdmin: input.isSuperAdmin ? 1 : 0,
      isActive: input.isActive === false ? 0 : 1,
    },
  );

  const id = rows[0]?.Id ?? 0;
  await replacePermissions(id, normalizePermissions(input.permissions));
  return id;
}

export async function updateUser(
  id: number,
  input: {
    displayName?: string;
    password?: string;
    isSuperAdmin?: boolean;
    isActive?: boolean;
    permissions?: Partial<Record<PermissionModule, PermissionLevel>>;
  },
): Promise<void> {
  const current = await getUserById(id);
  if (!current) throw new Error("Usuário não encontrado");

  if (current.IsSuperAdmin && input.isSuperAdmin === false) {
    const total = await countSuperAdmins();
    if (total <= 1) {
      throw new Error("Não é possível remover o último administrador");
    }
  }

  if (current.IsActive && input.isActive === false && current.IsSuperAdmin) {
    const total = await countSuperAdmins();
    if (total <= 1) {
      throw new Error("Não é possível desativar o último administrador");
    }
  }

  if (input.password) {
    assertPasswordPolicy(input.password);
  }

  const displayName = input.displayName?.trim() || current.DisplayName;
  const passwordChanged = Boolean(input.password);
  const passwordHash = input.password
    ? await hashPassword(input.password)
    : current.PasswordHash;
  const isSuperAdmin =
    input.isSuperAdmin !== undefined ? input.isSuperAdmin : current.IsSuperAdmin;
  const isActive = input.isActive !== undefined ? input.isActive : current.IsActive;
  const sessionVersion = passwordChanged
    ? current.SessionVersion + 1
    : current.SessionVersion;
  const mustChangePassword = passwordChanged
    ? 1
    : current.MustChangePassword
      ? 1
      : 0;

  await execute(
    `UPDATE CmsUser SET
       DisplayName = @displayName,
       PasswordHash = @passwordHash,
       IsSuperAdmin = @isSuperAdmin,
       IsActive = @isActive,
       SessionVersion = @sessionVersion,
       MustChangePassword = @mustChangePassword,
       UpdatedAt = SYSUTCDATETIME()
     WHERE Id = @id`,
    {
      id,
      displayName,
      passwordHash,
      isSuperAdmin: isSuperAdmin ? 1 : 0,
      isActive: isActive ? 1 : 0,
      sessionVersion,
      mustChangePassword,
    },
  );

  if (input.permissions) {
    await replacePermissions(id, normalizePermissions(input.permissions));
  }
}

export async function deactivateUser(id: number): Promise<void> {
  const current = await getUserById(id);
  if (!current) throw new Error("Usuário não encontrado");
  if (current.IsSuperAdmin) {
    const total = await countSuperAdmins();
    if (total <= 1) {
      throw new Error("Não é possível desativar o último administrador");
    }
  }

  await execute(
    `UPDATE CmsUser SET IsActive = 0, UpdatedAt = SYSUTCDATETIME() WHERE Id = @id`,
    { id },
  );
}

/**
 * Troca de senha pelo próprio usuário (primeiro acesso ou voluntária).
 * Limpa MustChangePassword e incrementa SessionVersion.
 */
export async function changeOwnPassword(
  userId: number,
  currentPassword: string,
  newPassword: string,
): Promise<{ sessionVersion: number }> {
  const user = await getUserById(userId);
  if (!user || !user.IsActive) {
    throw new Error("Usuário não encontrado");
  }

  const ok = await verifyPassword(currentPassword, user.PasswordHash);
  if (!ok) {
    throw new Error("Senha atual incorreta");
  }

  assertPasswordPolicy(newPassword);
  if (currentPassword === newPassword) {
    throw new Error("A nova senha deve ser diferente da senha atual");
  }

  const passwordHash = await hashPassword(newPassword);
  const sessionVersion = user.SessionVersion + 1;

  await execute(
    `UPDATE CmsUser SET
       PasswordHash = @passwordHash,
       MustChangePassword = 0,
       SessionVersion = @sessionVersion,
       UpdatedAt = SYSUTCDATETIME()
     WHERE Id = @id`,
    { id: userId, passwordHash, sessionVersion },
  );

  return { sessionVersion };
}
