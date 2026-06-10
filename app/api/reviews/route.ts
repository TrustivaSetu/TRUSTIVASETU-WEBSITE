import { createClient } from "@supabase/supabase-js";

interface Review {
  id: number;
  name: string;
  mobile: string;
  message: string;
  rating: number;
  created_at: string;
}

// In-memory fallback — persists within a single server instance
const memoryStore: Review[] = [];

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, message, rating, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) {
      return Response.json({ success: true, reviews: data });
    }
  }

  return Response.json({ success: true, reviews: [...memoryStore] });
}

export async function POST(req: Request) {
  let body: { name?: string; mobile?: string; message?: string; rating?: number };

  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { name, mobile, message, rating } = body;

  if (!name?.trim() || !mobile?.trim() || !message?.trim() || !rating) {
    return Response.json({ success: false, error: "All fields are required" }, { status: 400 });
  }

  if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
    return Response.json({ success: false, error: "Enter a valid 10-digit mobile number" }, { status: 400 });
  }

  if (!Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
    return Response.json({ success: false, error: "Rating must be 1–5" }, { status: 400 });
  }

  const supabase = getSupabase();

  if (supabase) {
    // Duplicate check: same name (case-insensitive) + same mobile
    const { data: existing } = await supabase
      .from("reviews")
      .select("id")
      .ilike("name", name.trim())
      .eq("mobile", mobile.trim())
      .limit(1);

    if (existing && existing.length > 0) {
      return Response.json({ success: false, error: "You have already submitted a review." }, { status: 409 });
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert({ name: name.trim(), mobile: mobile.trim(), message: message.trim(), rating: Number(rating) })
      .select("id, name, message, rating, created_at")
      .single();

    if (!error && data) {
      return Response.json({ success: true, review: data }, { status: 201 });
    }
  }

  // In-memory fallback — duplicate check
  const duplicate = memoryStore.find(
    (r) =>
      r.name.toLowerCase() === name.trim().toLowerCase() &&
      r.mobile === mobile.trim()
  );
  if (duplicate) {
    return Response.json({ success: false, error: "You have already submitted a review." }, { status: 409 });
  }

  const newReview: Review = {
    id: Date.now(),
    name: name.trim(),
    mobile: mobile.trim(),
    message: message.trim(),
    rating: Number(rating),
    created_at: new Date().toISOString(),
  };

  memoryStore.unshift(newReview);

  return Response.json({ success: true, review: newReview }, { status: 201 });
}
