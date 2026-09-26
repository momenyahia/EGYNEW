"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  X,
  Play,
  Maximize2,
  Film,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { Project } from "@/types";

interface ProjectDetailModalProps {
  project: Project | null;
  lang: Language;
  onClose: () => void;
  onOpenProjectForm: () => void;
}

export default function ProjectDetailModal({
  project,
  lang,
  onClose,
  onOpenProjectForm
}: ProjectDetailModalProps) {
  const t = translations[lang].work;

  const [activeMediaUrl, setActiveMediaUrl] = useState<string | null>(null);
  const [activeMediaType, setActiveMediaType] = useState<"image" | "video">("image");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Lock body scroll while open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else if (isVideoModalOpen) {
          setIsVideoModalOpen(false);
        } else if (project) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose, isVideoModalOpen, isLightboxOpen]);

  if (!project) return null;

  const title = lang === "ar" ? project.title_ar : project.title_en;
  const companyName = lang === "ar" ? project.company_name_ar : project.company_name_en;
  const category = lang === "ar" ? project.category_ar : project.category_en;
  const desc = lang === "ar" ? project.desc_ar : project.desc_en;
  const cs = project.case_study;

  const isDirectVideo = (url: string) => {
    return /\.(mp4|webm|ogg|mov|m4v)($|\?)/i.test(url);
  };

  const isStreamVideo = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com");
  };

  const isVideo = (url: string) => isDirectVideo(url) || isStreamVideo(url);

  const openLightbox = (url: string, type: "image" | "video" = "image") => {
    setActiveMediaUrl(url);
    setActiveMediaType(type);
    setIsLightboxOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080808]">
        {/* Sticky Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.08] px-6 sm:px-10 lg:px-14 py-4 flex items-center justify-between"
        >
          <button
            onClick={onClose}
            className="group flex items-center gap-3 text-xs font-heading font-extrabold uppercase tracking-widest text-white hover:text-[#FFD400] transition-colors cursor-pointer"
            data-cursor="BACK"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t.backToWork}</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="font-heading font-bold text-sm text-white/80 hidden sm:inline-block">
              {companyName}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#FFD400] transition-colors cursor-pointer"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Main Content Container with Shared Element Expansion */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-12">
          {/* Project Header Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-4xl mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] px-2.5 py-1 bg-white/[0.04] border border-[#FFD400]/20">
                {category}
              </span>
              <span className="text-xs font-mono text-white/40">{project.year}</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] mb-6">
              {title}
            </h1>

            <p className="text-lg sm:text-xl text-white/70 font-light leading-relaxed">
              {desc}
            </p>
          </motion.div>

          {/* Featured Visual: Preserves Original Dimensions / High-Res Showcase */}
          <div className="relative w-full bg-[#0d0d0d] mb-16 border border-white/[0.1] rounded overflow-hidden">
            {/* If Project Hero is a Video or Video URL is present */}
            {project.hero_media_type === "video" && project.video_url ? (
              <div className="w-full flex items-center justify-center bg-black p-2 sm:p-4">
                {isDirectVideo(project.video_url) ? (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={project.hero_image}
                    className="w-full max-h-[85vh] object-contain rounded bg-black"
                  >
                    <source src={project.video_url} type="video/mp4" />
                    <source src={project.video_url} type="video/webm" />
                    <source src={project.video_url} type="video/ogg" />
                    <source src={project.video_url} type="video/quicktime" />
                    Your browser does not support HTML5 video.
                  </video>
                ) : isStreamVideo(project.video_url) ? (
                  <div className="w-full aspect-video">
                    <iframe
                      src={
                        project.video_url.includes("youtube.com") || project.video_url.includes("youtu.be")
                          ? project.video_url.replace("watch?v=", "embed/")
                          : project.video_url
                      }
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video
                    src={project.video_url}
                    controls
                    playsInline
                    className="w-full max-h-[85vh] object-contain"
                  />
                )}
              </div>
            ) : (
              /* Original Aspect Ratio Image Showcase */
              <div className="relative flex items-center justify-center min-h-[420px] max-h-[88vh] bg-black/40 overflow-hidden group">
                <motion.img
                  layoutId={`project-img-${project.id}`}
                  src={project.hero_image}
                  alt={title}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="max-h-[88vh] w-auto max-w-full object-contain mx-auto transition-transform duration-500"
                />

                {/* Lightbox Zoom Button for Original High-Res Resolution */}
                <button
                  onClick={() => openLightbox(project.hero_image, "image")}
                  className="absolute top-4 right-4 p-3 bg-black/80 hover:bg-[#FFD400] text-white hover:text-black border border-white/20 transition-all rounded shadow-2xl flex items-center gap-2 text-xs font-mono uppercase"
                  title="View Original Dimensions"
                  data-cursor="EXPAND"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Original Size</span>
                </button>

                {/* Watch Reel Button if video is linked */}
                {project.video_url && (
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute bottom-6 right-6 px-6 py-3 bg-[#FFD400] text-black font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl hover:bg-white transition-colors cursor-pointer"
                    data-cursor="PLAY"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>Watch Commercial Reel</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Deliverables & Impact Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="p-8 sm:p-12 bg-white/[0.02] border border-white/[0.08] mb-20"
            >
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FFD400] mb-8">
                {t.metricsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {project.metrics.map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-heading font-black text-4xl sm:text-5xl text-white mb-2">
                      {m.val}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-white/60">
                      {lang === "ar" ? m.lbl_ar : m.lbl_en}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Case Study Modules: Challenge, Strategy, Execution, Results */}
          {cs && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24"
            >
              <div className="lg:col-span-4">
                <span className="sticky top-28 font-mono text-xs uppercase tracking-widest text-[#FFD400] block mb-2">
                  // COMPREHENSIVE CASE STUDY
                </span>
                <h2 className="sticky top-36 font-heading font-bold text-2xl sm:text-3xl text-white">
                  How Egypt Creative Engineered The Breakthrough.
                </h2>
              </div>

              <div className="lg:col-span-8 flex flex-col gap-12">
                {/* Challenge */}
                {(cs.challenge_en || cs.challenge_ar) && (
                  <div className="pb-8 border-b border-white/[0.08]">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/40 block mb-2">
                      01 • {t.challenge}
                    </span>
                    <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
                      {lang === "ar" ? cs.challenge_ar : cs.challenge_en}
                    </p>
                  </div>
                )}

                {/* Strategy */}
                {(cs.strategy_en || cs.strategy_ar) && (
                  <div className="pb-8 border-b border-white/[0.08]">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/40 block mb-2">
                      02 • {t.strategy}
                    </span>
                    <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
                      {lang === "ar" ? cs.strategy_ar : cs.strategy_en}
                    </p>
                  </div>
                )}

                {/* Execution */}
                {(cs.execution_en || cs.execution_ar) && (
                  <div className="pb-8 border-b border-white/[0.08]">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/40 block mb-2">
                      03 • {t.execution}
                    </span>
                    <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
                      {lang === "ar" ? cs.execution_ar : cs.execution_en}
                    </p>
                  </div>
                )}

                {/* Results */}
                {(cs.results_en || cs.results_ar) && (
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#FFD400] block mb-2">
                      04 • {t.results}
                    </span>
                    <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                      {lang === "ar" ? cs.results_ar : cs.results_en}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Gallery / Asset Showcase with Original Dimensions & Video Format Support */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mb-24"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FFD400]">
                    {t.visualsTitle}
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    ({project.gallery.length} Production Assets)
                  </span>
                </div>
                <span className="text-xs font-mono text-white/40 hidden sm:inline">
                  Click any visual for original high-resolution lightbox
                </span>
              </div>

              {/* Responsive Masonry / Column Layout allowing Natural Image Dimensions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {project.gallery.map((mediaUrl, idx) => {
                  const mediaIsVideo = isVideo(mediaUrl);

                  return (
                    <div
                      key={idx}
                      className="group relative bg-[#0e0e0e] border border-white/[0.08] hover:border-[#FFD400]/60 transition-colors duration-300 rounded overflow-hidden"
                    >
                      {mediaIsVideo ? (
                        /* Video Player in Gallery */
                        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                          {isDirectVideo(mediaUrl) ? (
                            <video
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-contain"
                            >
                              <source src={mediaUrl} type="video/mp4" />
                              <source src={mediaUrl} type="video/webm" />
                              <source src={mediaUrl} type="video/ogg" />
                              <source src={mediaUrl} type="video/quicktime" />
                            </video>
                          ) : isStreamVideo(mediaUrl) ? (
                            <iframe
                              src={
                                mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be")
                                  ? mediaUrl.replace("watch?v=", "embed/")
                                  : mediaUrl
                              }
                              className="w-full h-full"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video src={mediaUrl} controls className="w-full h-full object-contain" />
                          )}
                        </div>
                      ) : (
                        /* Original Aspect Ratio Image */
                        <div
                          onClick={() => openLightbox(mediaUrl, "image")}
                          className="relative overflow-hidden cursor-zoom-in flex items-center justify-center min-h-[300px] bg-black/30"
                          data-cursor="EXPAND"
                        >
                          <img
                            src={mediaUrl}
                            alt={`${title} Asset ${idx + 1}`}
                            className="w-full h-auto max-h-[650px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
                          />

                          {/* Hover Overlay Button */}
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-4 py-2 bg-black/85 text-[#FFD400] text-xs font-mono uppercase tracking-widest border border-[#FFD400]/40 flex items-center gap-2">
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span>View Original Size</span>
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/50">
                        <span>ASSET #{idx + 1}</span>
                        <span>{mediaIsVideo ? "CINEMA VIDEO" : "HIGH-RES VISUAL"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Bottom CTA within project */}
          <div className="p-10 sm:p-16 bg-[#121212] border border-white/[0.1] text-center flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#FFD400] font-mono mb-4">
              EGYPT CREATIVE • FULL-SERVICE MASTERY
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-4xl text-white mb-6">
              Ready to craft your brand&apos;s next success story?
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  onClose();
                  onOpenProjectForm();
                }}
                className="px-8 py-4 bg-[#FFD400] text-black font-heading font-extrabold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
              >
                Start A Similar Project →
              </button>
              <button
                onClick={onClose}
                className="px-8 py-4 border border-white/20 text-white font-heading font-bold text-xs uppercase tracking-widest hover:border-white transition-colors cursor-pointer"
              >
                {t.backToWork}
              </button>
            </div>
          </div>
        </div>

        {/* FULLSCREEN LIGHTBOX: Displays Image In 100% Original Dimensions */}
        {isLightboxOpen && activeMediaUrl && (
          <div
            className="fixed inset-0 z-[999999] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="w-full max-w-7xl flex items-center justify-between pb-4 border-b border-white/10 mb-4 text-xs font-mono">
              <span className="text-[#FFD400] tracking-widest uppercase">
                ORIGINAL RESOLUTION VIEW // {title}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="flex items-center gap-2 text-white/70 hover:text-white px-3 py-1 border border-white/20 hover:border-white rounded cursor-pointer"
              >
                <span>CLOSE [ESC]</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              className="relative max-h-[85vh] max-w-full flex items-center justify-center overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeMediaUrl}
                alt="High-Res Asset View"
                className="max-h-[85vh] max-w-full w-auto h-auto object-contain rounded border border-white/20 shadow-2xl"
              />
            </div>
          </div>
        )}

        {/* Cinema Video Modal Player */}
        {isVideoModalOpen && project.video_url && (
          <div
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10 animate-in fade-in"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-12 left-0 right-0 flex items-center justify-between text-xs font-mono text-white/60">
                <span className="uppercase tracking-widest text-[#FFD400]">
                  CINEMA SCREEN // {title}
                </span>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="flex items-center gap-2 hover:text-[#FFD400] transition-colors cursor-pointer"
                >
                  <span>CLOSE [ESC]</span>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isDirectVideo(project.video_url) ? (
                <video
                  src={project.video_url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  <source src={project.video_url} type="video/mp4" />
                  <source src={project.video_url} type="video/webm" />
                  <source src={project.video_url} type="video/ogg" />
                  <source src={project.video_url} type="video/quicktime" />
                  Your browser does not support HTML5 video.
                </video>
              ) : isStreamVideo(project.video_url) ? (
                <iframe
                  src={
                    project.video_url.includes("youtube.com") || project.video_url.includes("youtu.be")
                      ? project.video_url.replace("watch?v=", "embed/")
                      : project.video_url
                  }
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={project.video_url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
