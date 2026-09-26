import { NextResponse } from "next/server";
import { getSettings, getStats, updateSettings, updateStats } from "@/lib/db";

export async function GET() {
  try {
    const settings = getSettings();
    const stats = getStats();
    return NextResponse.json({ success: true, settings, stats });
  } catch (error) {
    console.error("API /api/content GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.settings) {
      updateSettings(body.settings);
    }
    if (body.stats) {
      updateStats(body.stats);
    }
    return NextResponse.json({ success: true, settings: getSettings(), stats: getStats() });
  } catch (error) {
    console.error("API /api/content POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to update content" }, { status: 500 });
  }
}
