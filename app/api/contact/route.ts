import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@trustivasetu.com",
    pass: "ddjfmsxaerzspcvo",
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const region = formData.get("region") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const resume = formData.get("resume") as File;

    if (!email || !resume) {
      return Response.json({ success: false });
    }

    const buffer = Buffer.from(await resume.arrayBuffer());
const position = formData.get("position") as string;

// 🔥 STRICT VALIDATION (ADDED ONLY)
if (
  !name ||
  !email ||
  !region ||
  !phone ||
  !message ||
  !resume ||
  !position
) {
  return Response.json({ success: false, error: "All fields required" });
}

// 🔥 EMAIL VALIDATION (STRICT)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return Response.json({ success: false, error: "Invalid email" });
}
    // 🔥 1. COMPANY MAIL (DETAILS + RESUME)
    await transporter.sendMail({
      from: `"Trustiva Setu" <info@trustivasetu.com>`,
      to: "info@trustivasetu.com, support@trustivasetu.com",
      subject: "New Job Application",
      replyTo: email, // 👈 IMPORTANT (direct reply to candidate)
      html: `
        <h2>New Application Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Region:</b> ${region}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Position Applied:</b> ${position}</p>
        <p><b>Message:</b> ${message}</p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        },
      ],
    });

    // 🔥 2. AUTO REPLY TO APPLICANT
    await transporter.sendMail({
      from: `"Trustiva Setu" <info@trustivasetu.com>`,
      to: email,
      subject: "Application Received - Trustiva Setu",
      html: `
        <p>Hi ${name},</p>
        <p>We have received your application. Our team will review it and get back to you shortly.</p>
        <p>Thanks,<br/>Trustiva Setu Team</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("MAIL ERROR:", error);
    return Response.json({ success: false });
  }
}