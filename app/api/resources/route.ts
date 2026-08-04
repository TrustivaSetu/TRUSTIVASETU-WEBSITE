import { NextResponse } from "next/server";
import articles from "@/data/knowledge/articles.json";

export async function GET() {
  return NextResponse.json({
    total: articles.length,
    updatedAt: new Date().toISOString(),
    articles
  });
}
