import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, createAdminSession } from "@/lib/auth";
 
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
 
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }
 
  const admin = await db.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
 
  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
 
  await createAdminSession(admin.id, admin.email);
  return NextResponse.json({ success: true, name: admin.name });
}
