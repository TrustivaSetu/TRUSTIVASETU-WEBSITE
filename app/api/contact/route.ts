import nodemailer from "nodemailer";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_MIME = new Set(["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
const ALLOWED_RESUME_EXT = /\.(pdf|doc|docx)$/i;

function escapeHtml(v: string) { return v.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"); }
function sanitizeFilename(n: string) { return (n.split(/[\\/]/).pop()??"resume").replace(/[^A-Za-z0-9._-]/g,"_").slice(0,100)||"resume"; }

export async function POST(req: Request) {
  try {
    const f = await req.formData();
    const name=f.get("name") as string, email=f.get("email") as string, region=f.get("region") as string;
    const phone=f.get("phone") as string, message=f.get("message") as string;
    const resume=f.get("resume") as File, position=f.get("position") as string;

    if (!name||!email||!region||!phone||!message||!resume||!position)
      return Response.json({success:false,error:"All fields required"},{status:400});
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return Response.json({success:false,error:"Invalid email"},{status:400});
    if (!(resume instanceof File)||resume.size===0)
      return Response.json({success:false,error:"Invalid resume"},{status:400});
    if (resume.size>MAX_RESUME_BYTES)
      return Response.json({success:false,error:"Resume exceeds 5MB"},{status:413});
    if (!ALLOWED_RESUME_MIME.has(resume.type)||!ALLOWED_RESUME_EXT.test(resume.name))
      return Response.json({success:false,error:"Resume must be PDF/DOC/DOCX"},{status:415});
    if (!process.env.SMTP_USER||!process.env.SMTP_PASS)
      return Response.json({success:false,error:"Email not configured"},{status:503});

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST??"email-smtp.ap-south-1.amazonaws.com",
      port: parseInt(process.env.SMTP_PORT??"587"),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const [sn,se,sp,sr,spos,sm] = [name,email,phone,region,position,message].map(escapeHtml);

    await transporter.sendMail({
      from: '"Trustiva Setu Careers" <noreply@trustivasetu.com>',
      to: "info@trustivasetu.com",
      replyTo: email,
      subject: `Job Application: ${position} — ${name}`,
      html: `<h2>New Job Application</h2><table><tr><td>Name</td><td>${sn}</td></tr><tr><td>Email</td><td>${se}</td></tr><tr><td>Phone</td><td>${sp}</td></tr><tr><td>Region</td><td>${sr}</td></tr><tr><td>Position</td><td>${spos}</td></tr></table><p>${sm}</p>`,
      attachments: [{filename: sanitizeFilename(resume.name), content: Buffer.from(await resume.arrayBuffer())}]
    });

    return Response.json({success:true});
  } catch {
    return Response.json({success:false,error:"Submission failed"},{status:500});
  }
}
