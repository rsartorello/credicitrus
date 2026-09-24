import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

/** Limite anti-DoS (scrypt é caro). */
export const MAX_PASSWORD_LENGTH = 128;
export const MIN_PASSWORD_LENGTH = 8;

export function assertPasswordPolicy(password: string): void {
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres`);
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    throw new Error(`A senha deve ter no máximo ${MAX_PASSWORD_LENGTH} caracteres`);
  }
}

export async function hashPassword(password: string): Promise<string> {
  assertPasswordPolicy(password);
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  if (password.length > MAX_PASSWORD_LENGTH) return false;

  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;

  const derived = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  const expected = Buffer.from(hashHex, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}
