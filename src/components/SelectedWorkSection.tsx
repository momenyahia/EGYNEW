"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Grid3X3, ListFilter, Play, Film } from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [viewMode, setViewMode] = useState<"carousel" | "stream">("carousel");
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

  // Desktop: 3 per view | Mobile: 1 per view (Roadmap Section 07)
  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.max(1, Math.ceil(activeProjects.length / itemsPerPage));

  // Reset page if filtered projects count shrinks
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [totalPages, currentPage]);

  const displayedProjects = activeProjects.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  // Determine grid columns dynamically based on item count so 1 or 2 items look centered and well-proportioned
  const getGridClasses = (count: number) => {
    if (isMobile) return "grid-cols-1 max-w-lg mx-auto";
    if (count === 1) return "grid-cols-1 max-w-xl mx-auto";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <section id="work" className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
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

          {/* Controls: View Mode & Carousel Pagination */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 self-start md:self-auto">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 bg-white/[0.04] border border-white/10 rounded">
              <button
                onClick={() => setViewMode("carousel")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                  viewMode === "carousel"
                    ? "bg-[#FFD400] text-black font-bold shadow-lg"
                    : "text-white/60 hover:text-white"
                }`}
                title={lang === "ar" ? "عرض 3 في 3" : "3-in-View Carousel"}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === "ar" ? "3 بـ 3" : "3 by 3"}</span>
              </button>
              <button
                onClick={() => setViewMode("stream")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                  viewMode === "stream"
                    ? "bg-[#FFD400] text-black font-bold shadow-lg"
                    : "text-white/60 hover:text-white"
                }`}
                title={lang === "ar" ? "عرض متتابع تحت بعض" : "Vertical Stream"}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === "ar" ? "تحت بعض" : "Stream"}</span>
              </button>
            </div>

            {/* Pagination Controls in Carousel Mode */}
            {viewMode === "carousel" && totalPages > 1 && (
              <div className="flex items-center gap-4">
                <div className="font-mono text-xs text-white/50 tracking-widest">
                  <span className="text-white font-bold">0{currentPage + 1}</span> / <span>0{totalPages}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 rounded-full border border-white/20 text-white hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
                    aria-label="Previous Projects"
                    data-cursor="PREV"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 rounded-full border border-white/20 text-white hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
                    aria-label="Next Projects"
                    data-cursor="NEXT"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
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

        {/* CAROUSEL MODE: 3 by 3 with directional slide transitions */}
        {viewMode === "carousel" && activeProjects.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPage}-${isMobile}`}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`grid gap-8 sm:gap-10 ${getGridClasses(displayedProjects.length)}`}
            >
              {displayedProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  lang={lang}
                  t={t}
                  indexNumber={currentPage * itemsPerPage + idx + 1}
                  onSelectProject={onSelectProject}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* STREAM MODE: All projects displayed under each other with scroll-reveal transitions */}
        {viewMode === "stream" && activeProjects.length > 0 && (
          <div className="flex flex-col gap-12 sm:gap-16">
            {activeProjects.map((project, idx) => {
              const title = lang === "ar" ? project.title_ar : project.title_en;
              const companyName = lang === "ar" ? project.company_name_ar : project.company_name_en;
              const category = lang === "ar" ? project.category_ar : project.category_en;
              const tag = lang === "ar" ? project.tag_ar : project.tag_en;
              const desc = lang === "ar" ? project.desc_ar : project.desc_en;
              const hasVideo = project.hero_media_type === "video" || Boolean(project.video_url);

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onSelectProject(project)}
                  data-cursor="VIEW →"
                  className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.02] border border-white/[0.08] hover:border-[#FFD400]/60 p-6 sm:p-10 transition-colors duration-400 cursor-pointer overflow-hidden"
                >
                  {/* Visual container (Original proportion friendly) */}
                  <div className="lg:col-span-7 relative aspect-[16/10] w-full bg-[#121212] overflow-hidden border border-white/10">
                    <img
                      src={project.hero_image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                      loading="lazy"
                    />

                    {/* Media Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 bg-black/85 backdrop-blur-md text-[#FFD400] border border-[#FFD400]/30">
                        {tag}
                      </span>
                      {hasVideo && (
                        <span className="flex items-center gap-1.5 text-[10px] font-mono text-black font-bold px-2 py-0.5 bg-[#FFD400] rounded">
                          <Film className="w-3 h-3" />
                          <span>FILM</span>
                        </span>
                      )}
                    </div>

                    {/* Hover Play / View overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#FFD400] text-black flex items-center justify-center shadow-2xl">
                        {hasVideo ? <Play className="w-7 h-7 fill-black ml-0.5" /> : <ArrowUpRight className="w-7 h-7 stroke-[2.5]" />}
                      </div>
                    </div>
                  </div>

                  {/* Editorial Content */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
                    <div>
                      <div className="flex items-center justify-between text-xs text-white/50 uppercase tracking-widest mb-4">
                        <span className="font-mono text-[#FFD400]">0{idx + 1} // {companyName}</span>
                        <span className="font-mono">{project.year}</span>
                      </div>

                      <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white group-hover:text-[#FFD400] transition-colors leading-tight mb-4">
                        {title}
                      </h3>

                      <p className="text-xs font-mono uppercase text-white/50 tracking-wider mb-4">
                        {category}
                      </p>

                      <p className="text-sm text-white/70 font-light leading-relaxed line-clamp-3 mb-6">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                      {project.metrics && project.metrics.length > 0 ? (
                        <div>
                          <span className="font-heading font-black text-2xl text-white block">
                            {project.metrics[0].val}
                          </span>
                          <span className="block text-[10px] uppercase tracking-wider text-white/40">
                            {lang === "ar" ? project.metrics[0].lbl_ar : project.metrics[0].lbl_en}
                          </span>
                        </div>
                      ) : <div />}

                      <div className="flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-[#FFD400] group-hover:translate-x-1 transition-transform">
                        <span>{t.viewProject}</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

// Subcomponent: ProjectCard for Carousel / Grid View
function ProjectCard({
  project,
  lang,
  t,
  indexNumber,
  onSelectProject
}: {
  project: Project;
  lang: Language;
  t: { viewProject: string };
  indexNumber: number;
  onSelectProject: (p: Project) => void;
}) {
  const title = lang === "ar" ? project.title_ar : project.title_en;
  const companyName = lang === "ar" ? project.company_name_ar : project.company_name_en;
  const category = lang === "ar" ? project.category_ar : project.category_en;
  const tag = lang === "ar" ? project.tag_ar : project.tag_en;
  const hasVideo = project.hero_media_type === "video" || Boolean(project.video_url);

  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      onClick={() => onSelectProject(project)}
      data-cursor="VIEW →"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative flex flex-col justify-between bg-white/[0.02] border border-white/[0.08] hover:border-[#FFD400]/60 transition-colors duration-400 overflow-hidden cursor-pointer"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#121212]">
        <motion.img
          layoutId={`project-img-${project.id}`}
          src={project.hero_image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[25%] group-hover:grayscale-0"
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
          <motion.div
            initial={{ scale: 0.5, rotate: -20 }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            className="w-14 h-14 rounded-full bg-[#FFD400] text-black flex items-center justify-center shadow-2xl"
          >
            {hasVideo ? <Play className="w-6 h-6 fill-black ml-0.5" /> : <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />}
          </motion.div>
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
