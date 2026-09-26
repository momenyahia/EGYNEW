"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Play, Pause } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { HeroMediaItem } from "@/types";

interface HeroSectionProps {
  lang: Language;
  headline?: string;
  subheadline?: string;
  heroMedia?: HeroMediaItem[];
  onOpenProjectForm: () => void;
}

const defaultMediaList: HeroMediaItem[] = [
  {
    id: "m1",
    title_en: "Commercial Production & 360 FMCG",
    title_ar: "الإنتاج التجاري والغذائي 360°",
    type: "image",
    url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=85",
    display_order: 1,
    duration_seconds: 6,
    active: true
  },
  {
    id: "m2",
    title_en: "High-Net-Worth Luxury Hospitality",
    title_ar: "الضيافة الفندقية فائقة الفخامة",
    type: "image",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85",
    display_order: 2,
    duration_seconds: 6,
    active: true
  },
  {
    id: "m3",
    title_en: "Enterprise Real Estate Scale",
    title_ar: "استراتيجيات التطوير العقاري الكبرى",
    type: "image",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85",
    display_order: 3,
    duration_seconds: 6,
    active: true
  }
];

export default function HeroSection({
  lang,
  headline,
  subheadline,
  heroMedia,
  onOpenProjectForm
}: HeroSectionProps) {
  const t = translations[lang].hero;
  const mediaList = heroMedia && heroMedia.length > 0 ? heroMedia : defaultMediaList;
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  // Handle auto-advance media reel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % defaultMediaList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const xNorm = clientX / width - 0.5;
    const yNorm = clientY / height - 0.5;
    mouseX.set(xNorm);
    mouseY.set(yNorm);
  };

  const displayHeadline = headline || t.headline;
  const displaySubheadline = subheadline || t.subheadline;

  // Split headline lines for mask reveal
  const headlineWords = displayHeadline.split(" ");
  const line1 = headlineWords.slice(0, 3).join(" ");
  const line2 = headlineWords.slice(3).join(" ");

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-8 sm:pb-12 overflow-hidden bg-[#080808]"
    >
      {/* Background Dynamic Cinematic Media Layer with Parallax */}
      <motion.div
        style={{ x: bgTranslateX, y: bgTranslateY, scale: 1.05 }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mediaList[activeMediaIndex].id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.72, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {mediaList[activeMediaIndex].type === "video" || mediaList[activeMediaIndex].url.endsWith(".mp4") ? (
              <video
                src={mediaList[activeMediaIndex].url}
                autoPlay
                muted
                playsInline
                loop={mediaList.length === 1}
                onEnded={() => setActiveMediaIndex((prev) => (prev + 1) % mediaList.length)}
                className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
              />
            ) : (
              <img
                src={mediaList[activeMediaIndex].url}
                alt="Egypt Creative Hero Reel"
                className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Ambient Subtle Vignette Overlays (Softened so video is vivid and clear) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-[#080808]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/60" />
      </motion.div>



      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-center">
        {/* Top Tagline with Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-2 h-2 rounded-full bg-[#FFD400] animate-pulse" />
          <span className="text-xs uppercase font-mono font-semibold tracking-[0.25em] text-[#FFD400]">
            {t.tag}
          </span>
        </motion.div>

        {/* Line-by-line Mask Reveal Headline (Scaled down slightly for refined luxury aesthetic) */}
        <div className="mb-6 max-w-5xl">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] tracking-tight text-white leading-[1.08]"
            >
              {line1}
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] tracking-tight text-white leading-[1.08]"
            >
              {line2.includes("MOVE FORWARD") || line2.includes("المستقبل") ? (
                <span>
                  {line2.replace(/MOVE FORWARD|المستقبل/g, "")}
                  <span className="text-[#FFD400] relative inline-block">
                    {line2.includes("المستقبل") ? "المستقبل." : "MOVE FORWARD."}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                      className="absolute -bottom-2 left-0 right-0 h-[3px] bg-[#FFD400] origin-left"
                    />
                  </span>
                </span>
              ) : (
                line2
              )}
            </motion.h1>
          </div>
        </div>

        {/* Subheadline & Action Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-5 border-t border-white/[0.1]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="max-w-2xl"
          >
            <p className="font-sans text-base sm:text-lg md:text-xl text-white/85 font-light tracking-wide leading-relaxed">
              {displaySubheadline}
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <button
              onClick={onOpenProjectForm}
              data-cursor="START →"
              className="group relative overflow-hidden px-8 py-3.5 bg-[#FFD400] text-black font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-[#FFD400]/20 hover:shadow-[#FFD400]/40 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                <span>{t.ctaPrimary}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 stroke-[2.5]" />
              </span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            <a
              href="#work"
              data-cursor="EXPLORE"
              className="group flex items-center gap-2.5 px-7 py-3.5 border border-white/25 text-white font-heading font-semibold text-xs sm:text-sm tracking-widest uppercase hover:border-[#FFD400] hover:text-[#FFD400] transition-all duration-300 backdrop-blur-sm"
            >
              <span>{t.ctaSecondary}</span>
              <span className="text-[#FFD400] transition-transform group-hover:translate-y-1">
                ↓
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Bar: Clean Location Badge & Scroll Down Indicator */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 w-full flex items-center justify-between gap-4 text-xs font-mono tracking-widest uppercase text-white/50 pt-6 border-t border-white/[0.04]">
        <a
          href="https://maps.google.com/?q=The+Greek+Campus+West+Mall+of+Arabia+6th+of+October"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="LOCATION"
          title="Open in Google Maps"
          className="group flex items-center gap-2 text-[11px] text-white/60 hover:text-[#FFD400] transition-colors cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400] group-hover:scale-125 transition-transform" />
          <span>Mall of Arabia • Greek Campus, 6th of October, Egypt</span>
          <span className="text-[10px] text-[#FFD400] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
        </a>

        {/* Scroll hint */}
        <a
          href="#about"
          className="flex items-center gap-2 hover:text-[#FFD400] transition-colors"
        >
          <span>{t.scrollDown}</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#FFD400]" />
        </a>
      </div>
    </section>
  );
}
