import { NextResponse } from "next/server";
import { deleteLead, updateLead } from "@/lib/db";
import { LeadStatus } from "@/types";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updates: { status?: LeadStatus; notes?: string } = {};

    if (body.status) updates.status = body.status;
    if (body.notes !== undefined) updates.notes = body.notes;

    const updated = updateLead(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error("API /api/leads/[id] PATCH error:", error);
    return NextResponse.json({ success: false, error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deleteLead(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("API /api/leads/[id] DELETE error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete lead" }, { status: 500 });
  }
}
