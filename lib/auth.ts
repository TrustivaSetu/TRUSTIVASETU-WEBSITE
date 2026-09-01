import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
 
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "change-me-in-env");
const COOKIE_NAME = "trustiva_website_admin";
 
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}
 
export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
 
export async function createAdminSession(adminId: string, email: string) {
  const token = await new SignJWT({ adminId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
 
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}
 
export async function getAdminSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { adminId: string; email: string };
  } catch {
    return null;
  }
}
 
export async function clearAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}
 
// Use this at the top of every /api/admin/* route:
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  return session;
}
