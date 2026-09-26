import { NextResponse } from "next/server";
import { getHeroMedia, saveHeroMedia } from "@/lib/db";

export async function GET() {
  try {
    const items = getHeroMedia();
    return NextResponse.json({ success: true, hero_media: items });
  } catch (error) {
    console.error("API /api/hero-media GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch hero media" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (Array.isArray(body.hero_media)) {
      const saved = saveHeroMedia(body.hero_media);
      return NextResponse.json({ success: true, hero_media: saved });
    }
    return NextResponse.json({ success: false, error: "Invalid payload format" }, { status: 400 });
  } catch (error) {
    console.error("API /api/hero-media POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to save hero media" }, { status: 500 });
  }
}
