export async function GET() {
  return Response.json({ success: true, reviews: [] });
}

export async function POST(req: Request) {
  let body: { name?: string; message?: string; rating?: number };

  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { name, message, rating } = body;

  if (!name?.trim() || !message?.trim() || !rating) {
    return Response.json({ success: false, error: "All fields are required" }, { status: 400 });
  }

  if (!Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
    return Response.json({ success: false, error: "Rating must be 1–5" }, { status: 400 });
  }

  return Response.json({
    success: true,
    review: {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      rating: Number(rating),
      created_at: new Date().toISOString(),
    },
  }, { status: 201 });
}
