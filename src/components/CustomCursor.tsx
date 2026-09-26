"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for natural smooth drag
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    // Disable on touch devices
    if (!window.matchMedia("(pointer: fine)").matches) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (target) {
        setIsHovered(true);
        setLabel(target.getAttribute("data-cursor") || "VIEW");
      } else {
        const isClickable = (e.target as HTMLElement)?.closest(
          "a, button, [role='button'], input, textarea, select"
        );
        setIsHovered(Boolean(isClickable));
        setLabel(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[99999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%"
      }}
    >
      <motion.div
        animate={{
          scale: label ? 1 : isHovered ? 1.4 : 1,
          width: label ? "auto" : isHovered ? 40 : 16,
          height: label ? "auto" : isHovered ? 40 : 16,
          backgroundColor: label
            ? "#FFD400"
            : isHovered
            ? "rgba(255, 212, 0, 0.15)"
            : "rgba(255, 255, 255, 0.7)",
          borderColor: label
            ? "#FFD400"
            : isHovered
            ? "#FFD400"
            : "rgba(255, 255, 255, 0.3)"
        }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="rounded-full border flex items-center justify-center backdrop-blur-[2px] shadow-2xl overflow-hidden px-3 py-1.5"
      >
        {label ? (
          <div className="flex items-center gap-1.5 text-black font-heading font-black text-[11px] uppercase tracking-wider whitespace-nowrap px-1 select-none">
            <span>{label}</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
