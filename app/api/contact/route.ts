import nodemailer from "nodemailer";

// --- Upload constraints -----------------------------------------------------
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_RESUME_MIME = new Set([
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
]);
const ALLOWED_RESUME_EXT = /\.(pdf|doc|docx)$/i;

// Escape values before interpolating into the HTML email body so applicant
// input can't inject markup/links into the recruiter's inbox.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strip path components and dangerous chars from an attacker-controlled filename.
function sanitizeFilename(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "resume";
  const cleaned = base.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 100);
  return cleaned || "resume";
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const region = formData.get("region") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const resume = formData.get("resume") as File;
    const position = formData.get("position") as string;

    if (!name || !email || !region || !phone || !message || !resume || !position) {
      return Response.json({ success: false, error: "All fields required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, error: "Invalid email" }, { status: 400 });
    }

    // --- File validation (size, type, extension) ---------------------------
    if (!(resume instanceof File)) {
      return Response.json({ success: false, error: "Invalid resume upload" }, { status: 400 });
    }
    if (resume.size === 0) {
      return Response.json({ success: false, error: "Resume file is empty" }, { status: 400 });
    }
    if (resume.size > MAX_RESUME_BYTES) {
      return Response.json(
        { success: false, error: "Resume exceeds the 5 MB limit" },
        { status: 413 }
      );
    }
    if (!ALLOWED_RESUME_MIME.has(resume.type) || !ALLOWED_RESUME_EXT.test(resume.name)) {
      return Response.json(
        { success: false, error: "Resume must be a PDF, DOC, or DOCX file" },
        { status: 415 }
      );
    }

    if (!process.env.SMTP_PASS) {
      return Response.json(
        {
          success: false,
          error:
            "Email service not configured. Please email your CV directly to info@trustivasetu.com",
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info@trustivasetu.com",
        pass: process.env.SMTP_PASS,
      },
    });

    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    // Escape all interpolated, attacker-controlled values.
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeRegion = escapeHtml(region);
    const safePosition = escapeHtml(position);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await transporter.sendMail({
      from: '"Trustiva Setu Careers" <info@trustivasetu.com>',
      to: "info@trustivasetu.com",
      replyTo: email,
      subject: `Job Application: ${position} — ${name}`,
      html: `
        <h2 style="color:#1a1a2e">New Job Application — Trustiva Setu</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px;font-weight:bold;width:140px">Name</td><td style="padding:8px">${safeName}</td></tr>
          <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${safePhone}</td></tr>
          <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Region</td><td style="padding:8px">${safeRegion}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Position</td><td style="padding:8px">${safePosition}</td></tr>
        </table>
        <h3 style="margin-top:24px;color:#1a1a2e">Why they want to join:</h3>
        <p style="font-family:sans-serif;line-height:1.6">${safeMessage}</p>
        <p style="color:#888;font-size:12px;margin-top:24px">Resume attached. Reply-To is set to the applicant's email.</p>
      `,
      attachments: [
        {
          filename: sanitizeFilename(resume.name),
          content: resumeBuffer,
        },
      ],
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { success: false, error: "Submission failed. Please try again." },
      { status: 500 }
    );
  }
}
