import crypto from "crypto";
import bcrypt from "bcryptjs";

/**
 * Hash password using Node.js native PBKDF2 with SHA-512 and random salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify password against stored PBKDF2 or bcrypt hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    // Fallback for bcrypt hashes
    if (storedHash.startsWith("$2a$") || storedHash.startsWith("$2b$")) {
      return bcrypt.compareSync(password, storedHash);
    }

    const [salt, originalHash] = storedHash.split(":");
    if (!salt || !originalHash) return false;

    const hashToVerify = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    return crypto.timingSafeEqual(Buffer.from(originalHash), Buffer.from(hashToVerify));
  } catch {
    return false;
  }
}

/**
 * Generate secure random session token
 */
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
