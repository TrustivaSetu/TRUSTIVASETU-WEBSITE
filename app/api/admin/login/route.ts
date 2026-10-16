import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, createAdminSession } from "@/lib/auth";
import { adminClientIp, adminLoginBlocked, adminLoginFailed, adminLoginSucceeded } from "@/lib/admin-login-limit";

// Compared against when the email is unknown, so both paths cost one bcrypt check.
const DUMMY_HASH = "$2b$10$6fc7R5/VmHKJygrOArSKbevWSNxqlP6cHGWvmXk/wptx/WafeNTt.";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const key = String(email).toLowerCase().trim();
  const wait = adminLoginBlocked(adminClientIp(req), key);
  if (wait !== null) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(wait) } },
    );
  }

  const admin = await db.adminUser.findUnique({ where: { email } });
  const valid = await verifyPassword(String(password), admin?.passwordHash ?? DUMMY_HASH);
  if (!admin || !valid) {
    adminLoginFailed(key);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  adminLoginSucceeded(key);
  await createAdminSession(admin.id, admin.email);
  return NextResponse.json({ success: true, name: admin.name });
}
