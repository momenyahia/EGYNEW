"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Film } from "lucide-react";
import Link from "next/link";
import { Language, translations } from "@/lib/translations";
import { Project, SiteSettings } from "@/types";

interface SelectedWorkSectionProps {
  lang: Language;
  projects: Project[];
  settings?: SiteSettings;
  onSelectProject: (project: Project) => void;
}

export default function SelectedWorkSection({
  lang,
  projects,
  settings,
  onSelectProject
}: SelectedWorkSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const t = translations[lang].work;

  const badge =
    lang === "ar"
      ? settings?.work_badge_ar || t.badge
      : settings?.work_badge_en || t.badge;

  const headline =
    lang === "ar"
      ? settings?.work_headline_ar || t.headline
      : settings?.work_headline_en || t.headline;

  // Track responsive screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter out archived or inactive projects, sorted by display_order
  const activeProjects = projects
    .filter((p) => p.active !== false && p.status !== "archived")
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));

  // Determine dynamic grid classes for 1, 2, or 3+ projects
  const getGridClasses = (count: number) => {
    if (isMobile) return "grid-cols-1 max-w-lg mx-auto";
    if (count === 1) return "grid-cols-1 max-w-xl mx-auto";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <section id="work" className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Clean Editorial Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FFD400]">
                {badge}
              </span>
              <div className="w-12 h-[1px] bg-white/20" />
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] max-w-3xl">
              {headline}
            </h2>
          </div>

          {/* Project Count Indicator */}
          <div className="flex items-center gap-3 self-start md:self-auto text-xs font-mono tracking-widest text-white/40 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#FFD400] animate-pulse" />
            <span>
              {activeProjects.length} {lang === "ar" ? "مشاريع استثنائية" : "Selected Masterpieces"}
            </span>
          </div>
        </div>

        {/* Empty State when no active projects */}
        {activeProjects.length === 0 && (
          <div className="p-16 border border-white/10 text-center bg-white/[0.02]">
            <p className="font-mono text-sm text-white/50">
              {lang === "ar" ? "لا توجد مشاريع منشورة حالياً." : "No published projects available at this moment."}
            </p>
          </div>
        )}

        {/* Continuous 3-by-3 Scroll Cascade Grid:
            - Left card (index % 3 === 0): enters from Left
            - Center card (index % 3 === 1): rises from Bottom
            - Right card (index % 3 === 2): enters from Right
            - Continues seamlessly as user scrolls down through all projects */}
        {activeProjects.length > 0 && (
          <div className={`grid gap-8 sm:gap-10 ${getGridClasses(activeProjects.length)}`}>
            {activeProjects.map((project, idx) => {
              const posInRow = idx % 3;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  lang={lang}
                  t={t}
                  indexNumber={idx + 1}
                  posInRow={posInRow}
                  isMobile={isMobile}
                  onSelectProject={onSelectProject}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// Subcomponent: ProjectCard with Directional Scroll Entrance
function ProjectCard({
  project,
  lang,
  t,
  indexNumber,
  posInRow,
  isMobile,
  onSelectProject
}: {
  project: Project;
  lang: Language;
  t: { viewProject: string };
  indexNumber: number;
  posInRow: number;
  isMobile: boolean;
  onSelectProject: (p: Project) => void;
}) {
  const title = lang === "ar" ? project.title_ar : project.title_en;
  const companyName = lang === "ar" ? project.company_name_ar : project.company_name_en;
  const category = lang === "ar" ? project.category_ar : project.category_en;
  const tag = lang === "ar" ? project.tag_ar : project.tag_en;
  const hasVideo = project.hero_media_type === "video" || Boolean(project.video_url);

  // Directional entrance per user specification:
  // posInRow 0 (Left): enters from Left (x: -80)
  // posInRow 1 (Center): rises from Bottom (y: 80)
  // posInRow 2 (Right): enters from Right (x: 80)
  const getInitial = () => {
    if (isMobile) return { opacity: 0, y: 50 };
    if (posInRow === 0) return { opacity: 0, x: -80, y: 0 };
    if (posInRow === 1) return { opacity: 0, x: 0, y: 80 };
    return { opacity: 0, x: 80, y: 0 };
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: isMobile ? 0.05 : posInRow * 0.12,
        ease: [0.16, 1, 0.3, 1]
      }}
      onClick={() => onSelectProject(project)}
      data-cursor={lang === "ar" ? "استعراض المشروع" : "VIEW CASE"}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col justify-between bg-white/[0.02] border border-white/[0.08] hover:border-[#FFD400]/60 transition-colors duration-400 overflow-hidden cursor-pointer"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#121212]">
        <img
          src={project.hero_image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 bg-black/85 backdrop-blur-md text-[#FFD400] border border-[#FFD400]/30">
            {tag}
          </span>
          <div className="flex items-center gap-1.5">
            {hasVideo && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-black font-bold px-2 py-0.5 bg-[#FFD400] rounded">
                <Play className="w-2.5 h-2.5 fill-black" />
                <span>VIDEO</span>
              </span>
            )}
            <span className="text-[11px] font-mono text-white/80 px-2.5 py-1 bg-black/70 backdrop-blur-md">
              {project.year}
            </span>
          </div>
        </div>

        {/* Magnetic Arrow Overlay Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#FFD400] text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            {hasVideo ? <Play className="w-6 h-6 fill-black ml-0.5" /> : <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />}
          </div>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-xs text-white/50 uppercase tracking-widest mb-3">
            <span className="font-mono">{companyName}</span>
            <span className="text-[#FFD400] font-mono">0{indexNumber}</span>
          </div>

          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-[#FFD400] transition-colors leading-snug mb-3">
            {title}
          </h3>

          <p className="text-xs font-mono text-white/50 tracking-wider uppercase mb-6">
            {category}
          </p>
        </div>

        {/* Primary Impact Metric + Actions */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          {project.metrics && project.metrics.length > 0 ? (
            <div>
              <span className="font-heading font-black text-xl text-white block">
                {project.metrics[0].val}
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-white/40">
                {lang === "ar" ? project.metrics[0].lbl_ar : project.metrics[0].lbl_en}
              </span>
            </div>
          ) : <div />}

          <div className="flex items-center gap-3">
            <Link
              href={`/projects/${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] font-mono text-white/40 hover:text-[#FFD400] underline"
              title="Open direct project page"
            >
              Permalink
            </Link>
            <div className="flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-widest text-[#FFD400] group-hover:translate-x-1 transition-transform">
              <span>{t.viewProject}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
