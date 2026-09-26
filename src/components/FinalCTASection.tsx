"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { SiteSettings } from "@/types";

interface FinalCTASectionProps {
  lang: Language;
  settings?: SiteSettings;
  onOpenProjectForm: () => void;
}

export default function FinalCTASection({
  lang,
  settings,
  onOpenProjectForm
}: FinalCTASectionProps) {
  const t = translations[lang].cta;
  const whatsappNumber = settings?.whatsapp || "201044107134";
  const whatsappMsg = encodeURIComponent(
    lang === "ar"
      ? settings?.whatsapp_prefilled_ar || "مرحباً إيجيبت كرييتف، أرغب بمناقشة مشروع خاص بعلامتي التجارية."
      : settings?.whatsapp_prefilled_en || "Hello Egypt Creative, I would like to discuss a project for my brand."
  );

  const badge =
    lang === "ar"
      ? settings?.cta_badge_ar || t.badge
      : settings?.cta_badge_en || t.badge;

  const headline =
    lang === "ar"
      ? settings?.cta_headline_ar || t.headline
      : settings?.cta_headline_en || t.headline;

  const subheadline =
    lang === "ar"
      ? settings?.cta_subheadline_ar || t.subheadline
      : settings?.cta_subheadline_en || t.subheadline;

  return (
    <section className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/[0.08] overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FFD400]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 text-center flex flex-col items-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FFD400] mb-6">
          {badge}
        </span>

        <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.05] max-w-5xl mb-8">
          {headline}
        </h2>

        <p className="font-sans text-lg sm:text-2xl text-white/70 font-light max-w-2xl leading-relaxed mb-12">
          {subheadline}
        </p>

        {/* Dual Actions */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
          <button
            onClick={onOpenProjectForm}
            data-cursor="START →"
            className="group flex items-center gap-3 px-10 py-5 bg-[#FFD400] text-black font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase hover:bg-white transition-all duration-300 shadow-2xl shadow-[#FFD400]/25"
          >
            <span>{t.startProject}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="WHATSAPP"
            className="group flex items-center gap-3 px-8 py-5 border border-white/20 text-white font-heading font-bold text-xs sm:text-sm tracking-widest uppercase hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>{t.whatsapp}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
