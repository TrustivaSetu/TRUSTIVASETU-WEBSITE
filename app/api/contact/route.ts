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

    return Response.json({ success: true });

  } catch {
    return Response.json({ success: false, error: "Submission failed. Please try again." });
  }
}
