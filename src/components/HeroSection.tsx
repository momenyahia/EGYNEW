"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Play, Pause } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface HeroMediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  label_en: string;
  label_ar: string;
}

interface HeroSectionProps {
  lang: Language;
  headline?: string;
  subheadline?: string;
  onOpenProjectForm: () => void;
}

const defaultMediaList: HeroMediaItem[] = [
  {
    id: "m1",
    type: "image",
    url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=85",
    label_en: "01 • Commercial Production & 360 FMCG",
    label_ar: "01 • الإنتاج التجاري والغذائي 360°"
  },
  {
    id: "m2",
    type: "image",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85",
    label_en: "02 • High-Net-Worth Luxury Hospitality",
    label_ar: "02 • الضيافة الفندقية فائقة الفخامة"
  },
  {
    id: "m3",
    type: "image",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85",
    label_en: "03 • Enterprise Real Estate Scale",
    label_ar: "03 • استراتيجيات التطوير العقاري الكبرى"
  }
];

export default function HeroSection({
  lang,
  headline,
  subheadline,
  onOpenProjectForm
}: HeroSectionProps) {
  const t = translations[lang].hero;
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
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-14 overflow-hidden bg-[#080808]"
    >
      {/* Background Dynamic Cinematic Media Layer with Parallax */}
      <motion.div
        style={{ x: bgTranslateX, y: bgTranslateY, scale: 1.08 }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={defaultMediaList[activeMediaIndex].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={defaultMediaList[activeMediaIndex].url}
              alt="Egypt Creative Hero Reel"
              className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] grayscale-[40%]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
      </motion.div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-grain opacity-40" />
      <div className="absolute top-0 bottom-0 left-[15%] w-[1px] bg-white/[0.03] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-white/[0.03] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-[85%] w-[1px] bg-white/[0.03] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-center">
        {/* Top Tagline with Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-[#FFD400] animate-pulse" />
          <span className="text-xs uppercase font-mono font-semibold tracking-[0.25em] text-[#FFD400]/90">
            {t.tag}
          </span>
        </motion.div>

        {/* Line-by-line Mask Reveal Headline */}
        <div className="mb-8 max-w-6xl">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white leading-[1.04]"
            >
              {line1}
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white leading-[1.04]"
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6 border-t border-white/[0.08]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="max-w-2xl"
          >
            <p className="font-sans text-lg sm:text-xl md:text-2xl text-white/80 font-light tracking-wide leading-relaxed">
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
              className="group relative overflow-hidden px-9 py-4 bg-[#FFD400] text-black font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-2xl shadow-[#FFD400]/25 hover:shadow-[#FFD400]/40"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>{t.ctaPrimary}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 stroke-[2.5]" />
              </span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            <a
              href="#work"
              data-cursor="EXPLORE"
              className="group flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-heading font-semibold text-xs sm:text-sm tracking-widest uppercase hover:border-[#FFD400] hover:text-[#FFD400] transition-all duration-300 backdrop-blur-sm"
            >
              <span>{t.ctaSecondary}</span>
              <span className="text-[#FFD400] transition-transform group-hover:translate-y-1">
                ↓
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Bar: Carousel Controls + Location + Scroll Indicator */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono tracking-widest uppercase text-white/50 pt-10">
        {/* Dynamic Media Sequencer Indicators */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 text-white/40 hover:text-[#FFD400] transition-colors"
            title={isPlaying ? "Pause Reel" : "Play Reel"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-2">
            {defaultMediaList.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMediaIndex(idx);
                  setIsPlaying(false);
                }}
                className={`h-1 rounded-full transition-all duration-500 ${
                  activeMediaIndex === idx ? "w-8 bg-[#FFD400]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                title={lang === "ar" ? item.label_ar : item.label_en}
              />
            ))}
          </div>

          <span className="text-[11px] text-white/60 hidden md:inline">
            {lang === "ar"
              ? defaultMediaList[activeMediaIndex].label_ar
              : defaultMediaList[activeMediaIndex].label_en}
          </span>
        </div>

        {/* Scroll hint */}
        <a
          href="#about"
          className="flex items-center gap-2 hover:text-[#FFD400] transition-colors"
        >
          <span>{t.scrollDown}</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
