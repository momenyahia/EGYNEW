"use client";

import { useState } from "react";
import { Sparkles, HelpCircle, Globe, ChevronDown, ChevronUp } from "lucide-react";

interface AdminSectionGuideProps {
  badge: string;
  titleAr: string;
  titleEn: string;
  purposeAr: string;
  purposeEn: string;
  impactAr?: string;
  impactEn?: string;
  tips?: { ar: string; en: string }[];
}

export default function AdminSectionGuide({
  badge,
  titleAr,
  titleEn,
  purposeAr,
  purposeEn,
  impactAr,
  impactEn,
  tips
}: AdminSectionGuideProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-8 bg-gradient-to-r from-[#FFD400]/[0.07] via-white/[0.02] to-transparent border border-[#FFD400]/30 rounded-lg p-5 sm:p-6 transition-all shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded bg-[#FFD400]/10 border border-[#FFD400]/40 flex items-center justify-center text-[#FFD400] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFD400] px-2 py-0.5 bg-[#FFD400]/15 border border-[#FFD400]/30 rounded">
                {badge}
              </span>
              <span className="text-[11px] font-mono text-white/50">
                // دليل القسم وماذا يفعل • Section Guide
              </span>
            </div>
            <h2 className="font-heading font-black text-lg sm:text-xl text-white mt-1.5 flex flex-wrap items-baseline gap-2">
              <span>{titleAr}</span>
              <span className="text-white/40 font-normal text-xs sm:text-sm font-sans">| {titleEn}</span>
            </h2>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-[#FFD400] px-3 py-1.5 rounded bg-white/[0.04] border border-white/10 shrink-0 hover:bg-white/[0.08] transition-colors cursor-pointer"
        >
          <span>{isOpen ? "إخفاء الشرح" : "عرض الشرح بالتفصيل"}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 pt-5 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans animate-in fade-in duration-200">
          {/* ماذا يفعل هذا القسم */}
          <div className="space-y-1.5 bg-white/[0.015] p-3.5 border border-white/[0.05] rounded">
            <span className="font-mono font-bold text-[#FFD400] uppercase text-[11px] flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              ماذا يفعل هذا القسم؟ (What This Does)
            </span>
            <p className="text-white/85 text-[13px] leading-relaxed pt-1">{purposeAr}</p>
            <p className="text-white/45 text-[11px] font-mono leading-relaxed pt-1">{purposeEn}</p>
          </div>

          {/* تأثيره على الموقع المباشر */}
          <div className="space-y-1.5 bg-white/[0.015] p-3.5 border border-white/[0.05] rounded">
            <span className="font-mono font-bold text-emerald-400 uppercase text-[11px] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              التأثير على الموقع المباشر (Live Site Impact)
            </span>
            <p className="text-white/85 text-[13px] leading-relaxed pt-1">
              {impactAr || "التعديلات تظهر فوراً للزوار دون الحاجة لإعادة نشر الكود."}
            </p>
            <p className="text-white/45 text-[11px] font-mono leading-relaxed pt-1">
              {impactEn || "Changes are reflected instantly on the live website upon saving."}
            </p>
          </div>

          {/* نصائح ومميزات سريعة */}
          {tips && tips.length > 0 && (
            <div className="md:col-span-2 pt-3 border-t border-white/[0.06]">
              <span className="font-mono font-bold text-[#FFD400] uppercase text-[11px] block mb-2.5">
                // إرشادات سريعة وأهم المميزات • Quick Tips & Features:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {tips.map((tip, idx) => (
                  <div key={idx} className="p-3 bg-black/50 border border-white/[0.08] rounded hover:border-[#FFD400]/40 transition-colors">
                    <span className="text-white font-bold text-xs block mb-1">
                      <span className="text-[#FFD400] mr-1.5">✓</span>{tip.ar}
                    </span>
                    <span className="text-white/40 font-mono text-[10px] block leading-tight">
                      {tip.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
