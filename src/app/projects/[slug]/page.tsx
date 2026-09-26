import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects, getSettings } from "@/lib/db";
import ProjectDetailClient from "./ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — Egypt Creative"
    };
  }

  return {
    title: `${project.title_en} — ${project.company_name_en} | Egypt Creative`,
    description: project.desc_en,
    openGraph: {
      title: `${project.title_en} — ${project.company_name_en}`,
      description: project.desc_en,
      images: [{ url: project.hero_image }]
    }
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const allProjects = getProjects().filter((p) => p.active);
  const settings = getSettings();

  if (!project) {
    notFound();
  }

  const currentIndex = allProjects.findIndex((p) => p.id === project.id || p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
      settings={settings}
    />
  );
}
