import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEnquiryAlert } from "@/lib/mailer";
 
// Public endpoint — the website's Contact Us / enquiry form posts here.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, email, clinicName, message, source } = body;
 
  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }
 
  const enquiry = await db.enquiry.create({
    data: { name, phone, email, clinicName, message, source },
  });
 
  // Don't let an email hiccup fail the whole submission — the enquiry is
  // already saved in the DB and visible in the admin panel either way.
  try {
    await sendEnquiryAlert({ name, phone, email, clinicName, message, source });
  } catch (err) {
    console.error("Enquiry alert email failed:", err);
  }
 
  return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
}
