import nodemailer from "nodemailer";

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
      return Response.json({ success: false, error: "All fields required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, error: "Invalid email" });
    }

    if (!process.env.SMTP_PASS) {
      return Response.json({ success: false, error: "Email service not configured. Please email your CV directly to info@trustivasetu.com" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info@trustivasetu.com",
        pass: process.env.SMTP_PASS,
      },
    });

    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    await transporter.sendMail({
      from: '"Trustiva Setu Careers" <info@trustivasetu.com>',
      to: "info@trustivasetu.com",
      replyTo: email,
      subject: `Job Application: ${position} — ${name}`,
      html: `
        <h2 style="color:#1a1a2e">New Job Application — Trustiva Setu</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px;font-weight:bold;width:140px">Name</td><td style="padding:8px">${name}</td></tr>
          <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone}</td></tr>
          <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Region</td><td style="padding:8px">${region}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Position</td><td style="padding:8px">${position}</td></tr>
        </table>
        <h3 style="margin-top:24px;color:#1a1a2e">Why they want to join:</h3>
        <p style="font-family:sans-serif;line-height:1.6">${message.replace(/\n/g, "<br>")}</p>
        <p style="color:#888;font-size:12px;margin-top:24px">Resume attached. Reply-To is set to the applicant's email.</p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
        },
      ],
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: "Submission failed. Please try again." });
  }
}
