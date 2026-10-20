import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    return false;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("eishq_admin_session")?.value;

  if (!token || token.length > 500) {
    return false;
  }

  const parts = token.split(":");

  if (parts.length !== 3) {
    return false;
  }

  const [role, expiryText, signature] = parts;
  const expiry = Number(expiryText);

  if (
    role !== "admin" ||
    !Number.isSafeInteger(expiry) ||
    expiry <= Math.floor(Date.now() / 1000) ||
    !/^[a-f0-9]{64}$/.test(signature)
  ) {
    return false;
  }

  const payload = `${role}:${expiryText}`;
  const expectedSignature = createHmac("sha256", secret)
    .update(payload)
    .digest();

  const providedSignature = Buffer.from(signature, "hex");

  if (expectedSignature.length !== providedSignature.length) {
    return false;
  }

  return timingSafeEqual(expectedSignature, providedSignature);
}