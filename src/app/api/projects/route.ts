import { NextResponse } from "next/server";
import { getProjects, saveProject } from "@/lib/db";
import { Project } from "@/types";

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("API /api/projects GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title_en || !body.company_name_en) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const project: Project = {
      id: body.id || "proj-" + Date.now(),
      slug: body.slug || (body.company_name_en as string).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      company_name_en: body.company_name_en,
      company_name_ar: body.company_name_ar || body.company_name_en,
      company_logo: body.company_logo || "",
      title_en: body.title_en,
      title_ar: body.title_ar || body.title_en,
      category_en: body.category_en || "Creative & Performance",
      category_ar: body.category_ar || "الإبداع والتسويق",
      tag_en: body.tag_en || "Featured Case",
      tag_ar: body.tag_ar || "مشروع مميز",
      desc_en: body.desc_en || "",
      desc_ar: body.desc_ar || "",
      year: body.year || "2026",
      hero_image: body.hero_image || "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=85",
      hero_media_type: body.hero_media_type || (body.video_url && !body.hero_image ? "video" : "image"),
      gallery: Array.isArray(body.gallery) ? body.gallery : [],
      video_url: body.video_url || "",
      featured: Boolean(body.featured),
      display_order: Number(body.display_order) || 99,
      active: body.active !== undefined ? Boolean(body.active) : true,
      status: body.status || "published",
      metrics: body.metrics || [],
      case_study: body.case_study || {
        challenge_en: "",
        challenge_ar: "",
        strategy_en: "",
        strategy_ar: "",
        execution_en: "",
        execution_ar: "",
        results_en: "",
        results_ar: ""
      }
    };

    const saved = saveProject(project);
    return NextResponse.json({ success: true, project: saved });
  } catch (error) {
    console.error("API /api/projects POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to save project" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (Array.isArray(body.projects)) {
      body.projects.forEach((proj: Project, index: number) => {
        saveProject({ ...proj, display_order: index + 1 });
      });
      return NextResponse.json({ success: true, projects: getProjects() });
    }
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  } catch (error) {
    console.error("API /api/projects PUT error:", error);
    return NextResponse.json({ success: false, error: "Failed to reorder projects" }, { status: 500 });
  }
}
