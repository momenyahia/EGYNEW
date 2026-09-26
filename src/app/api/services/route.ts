import { NextResponse } from "next/server";
import { getServices, updateService } from "@/lib/db";
import { ServiceItem } from "@/types";

export async function GET() {
  try {
    const services = getServices();
    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("API /api/services GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body: ServiceItem = await req.json();
    if (!body.id || !body.name_en) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    const updated = updateService(body);
    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
    console.error("API /api/services POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to update service" }, { status: 500 });
  }
}
