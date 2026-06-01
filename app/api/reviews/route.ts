import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return Response.json({ success: true, reviews: [] });
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, message, rating, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return Response.json({ success: false, error: error.message }, { status: 500 });
    }
    return Response.json({ success: true, reviews: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ success: false, error: msg }, { status: 500 });
  }
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

  const supabase = getSupabase();

  // Supabase not configured — return the submitted data so it displays in the session
  if (!supabase) {
    const ephemeralReview = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      rating: Number(rating),
      created_at: new Date().toISOString(),
    };
    return Response.json({ success: true, review: ephemeralReview }, { status: 201 });
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .insert([{ name: name.trim(), message: message.trim(), rating: Number(rating) }])
      .select("id, name, message, rating, created_at")
      .single();

    if (error) {
      return Response.json({ success: false, error: error.message }, { status: 500 });
    }
    return Response.json({ success: true, review: data }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ success: false, error: msg }, { status: 500 });
  }
}
