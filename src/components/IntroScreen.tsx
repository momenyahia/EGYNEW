"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroScreenProps {
  onComplete?: () => void;
}

const manifestoWords = [
  { step: "01 // VISION", text: "STRATEGIC FORESIGHT & AUDIT" },
  { step: "02 // CRAFT", text: "ICONIC BRAND IDENTITY" },
  { step: "03 // CINEMA", text: "4K CINEMATIC MEDIA PRODUCTION" },
  { step: "04 // SCALE", text: "HIGH-PERFORMANCE ACQUISITION" },
  { step: "05 // LAUNCH", text: "WE BUILD BRANDS THAT MOVE FORWARD." }
];

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // Fast-track if already experienced in current session
    const hasSeen = sessionStorage.getItem("ec_intro_v3");
    if (hasSeen) {
      setVisible(false);
      if (onComplete) onComplete();
      return;
    }

    // High-performance progress counter from 0 to 100
    const duration = 1800; // 1.8 seconds total cinematic experience
    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Smooth cubic-out easing for speed then settle
      const eased = Math.floor(100 * Math.sin((rawProgress * Math.PI) / 2));

      setProgress(eased);

      const wordIdx = Math.min(
        Math.floor(rawProgress * manifestoWords.length),
        manifestoWords.length - 1
      );
      setWordIndex(wordIdx);

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          handleDismiss();
        }, 400);
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("ec_intro_v3", "true");
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[99999] bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none"
        >
          {/* Dual Curtain Split on Exit */}
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{
              y: "-100%",
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
            }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#080808] z-0 origin-top pointer-events-none border-b border-[#FFD400]/20"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{
              y: "100%",
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
            }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#080808] z-0 origin-bottom pointer-events-none border-t border-[#FFD400]/20"
          />

          {/* Golden Center Light Flare */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: [0.8, 1.4, 1.1],
              opacity: [0.15, 0.35, 0.2]
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-radial from-[#FFD400]/30 via-transparent to-transparent blur-[90px] pointer-events-none z-10"
          />

          {/* Top Bar: Agency Coordinates & Brand Tag */}
          <div className="relative z-20 flex items-center justify-between text-xs font-mono tracking-widest text-white/50 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#FFD400] animate-ping" />
              <span className="text-white/80 font-bold uppercase tracking-wider">
                EGYPT CREATIVE // AGENCY SYSTEM
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span className="hidden sm:inline text-white/40">
                CAIRO, EG • 30.0444° N, 31.2357° E
              </span>
              <button
                onClick={handleDismiss}
                className="hover:text-[#FFD400] transition-colors uppercase tracking-widest text-[11px] px-2.5 py-1 border border-white/10"
              >
                SKIP [ESC]
              </button>
            </div>
          </div>

          {/* Center Stage: Rotating Camera Aperture Rings + Massive Counter + Kinetic Typography */}
          <div className="relative z-20 max-w-5xl mx-auto w-full my-auto flex flex-col items-center text-center">
            {/* Camera Iris / Optical Rings */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 mb-8 flex items-center justify-center">
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-white/20"
              />
              {/* Golden Calibrated Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full border-t-2 border-r border-[#FFD400]/80 border-b-transparent border-l-transparent"
              />
              {/* Crosshair Optics */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-white/[0.08]" />
                <div className="h-full w-[1px] bg-white/[0.08] absolute" />
              </div>

              {/* Digital Percentage Counter in Center */}
              <div className="flex flex-col items-center justify-center z-10">
                <span className="font-heading font-black text-5xl sm:text-6xl text-white tracking-tighter">
                  {progress < 10 ? `0${progress}` : progress}
                  <span className="text-[#FFD400] text-3xl">%</span>
                </span>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mt-1">
                  CALIBRATING
                </span>
              </div>
            </div>

            {/* Kinetic Manifesto Line */}
            <div className="h-16 flex flex-col items-center justify-center overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={wordIndex}
                  initial={{ y: 25, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -25, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#FFD400] mb-1">
                    {manifestoWords[wordIndex].step}
                  </span>
                  <h2 className="font-heading font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight">
                    {manifestoWords[wordIndex].text}
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Soundwave Equalizer Bars */}
            <div className="flex items-center gap-1.5 h-6">
              {[18, 35, 14, 48, 22, 54, 30, 42, 16, 50, 24, 36, 12, 44, 28].map(
                (h, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [h * 0.4, h, h * 0.3]
                    }}
                    transition={{
                      duration: 0.6 + (i % 5) * 0.15,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className="w-[3px] bg-[#FFD400]/70 rounded-full"
                    style={{ height: `${h}px` }}
                  />
                )
              )}
            </div>
          </div>

          {/* Bottom Bar: Timeline Progress Bar + Official Launch Status */}
          <div className="relative z-20 max-w-5xl mx-auto w-full pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-[#FFD400]">SYS.READY</span>
              <div className="w-full sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#FFD400]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <span className="tracking-widest uppercase text-[10px]">
              FULL-SERVICE AGENCY ECOSYSTEM • 2026
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
