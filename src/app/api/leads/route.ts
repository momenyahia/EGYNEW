import { NextResponse } from "next/server";
import { addLead, getLeads } from "@/lib/db";

export async function GET() {
  try {
    const leads = getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("API /api/leads GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, company, email, phone, serviceNeeded, message, source } = body;

    if (!fullName || !company || !email || !phone || !serviceNeeded) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address format." },
        { status: 400 }
      );
    }

    const newLead = addLead({
      fullName: String(fullName).trim(),
      company: String(company).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      serviceNeeded: String(serviceNeeded).trim(),
      message: message ? String(message).trim() : "",
      notes: "Inquiry received via website project overlay.",
      source: source || "Direct Website Form"
    });

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    console.error("API /api/leads POST error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while saving the inquiry." },
      { status: 500 }
    );
  }
}
