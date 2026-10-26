import nodemailer from "nodemailer";
 
// Reuses the same AWS SES SMTP credentials pattern as the LMS.
// Set these in .env.production: SES_SMTP_HOST, SES_SMTP_USER, SES_SMTP_PASS, ALERT_EMAIL_TO
const transporter = nodemailer.createTransport({
  host: process.env.SES_SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SES_SMTP_USER,
    pass: process.env.SES_SMTP_PASS,
  },
});
 
export async function sendEnquiryAlert(enquiry: {
  name: string;
  phone: string;
  email?: string | null;
  clinicName?: string | null;
  message?: string | null;
  source?: string | null;
}) {
  await transporter.sendMail({
    from: `"TrustivaSetu Website" <no-reply@trustivasetu.com>`,
    to: process.env.ALERT_EMAIL_TO, // e.g. info@trustivasetu.com
    subject: `New Website Enquiry — ${enquiry.name}`,
    text: `
Name: ${enquiry.name}
Phone: ${enquiry.phone}
Email: ${enquiry.email || "-"}
Clinic: ${enquiry.clinicName || "-"}
Source: ${enquiry.source || "-"}
 
Message:
${enquiry.message || "-"}
    `.trim(),
  });
}
