"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Palette,
  Share2,
  Video,
  TrendingUp,
  Megaphone,
  Globe,
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { ServiceItem } from "@/types";

interface ServicesSectionProps {
  lang: Language;
  services: ServiceItem[];
  settings?: import("@/types").SiteSettings;
  onSelectService: (serviceName: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Palette,
  Share2,
  Video,
  TrendingUp,
  Megaphone,
  Globe,
  Sparkles
};

// Abstract decorative visual backgrounds for each discipline (Roadmap section 10: "Service visuals may be image, video, motion, typography, abstract or none")
const serviceVisuals: Record<string, string> = {
  "srv-1": "radial-gradient(circle at 80% 20%, rgba(255, 212, 0, 0.16) 0%, transparent 60%)",
  "srv-2": "radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)",
  "srv-3": "radial-gradient(circle at 80% 80%, rgba(255, 212, 0, 0.14) 0%, transparent 60%)",
  "srv-4": "radial-gradient(circle at 20% 20%, rgba(255, 212, 0, 0.18) 0%, transparent 60%)",
  "srv-5": "radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.14) 0%, transparent 60%)",
  "srv-6": "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.14) 0%, transparent 60%)",
  "srv-7": "radial-gradient(circle at 80% 20%, rgba(255, 212, 0, 0.16) 0%, transparent 60%)",
  "srv-8": "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.14) 0%, transparent 60%)"
};

// High-end cinematic background imagery per discipline
const serviceImages: Record<string, string> = {
  "srv-1": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80", // Strategy & Planning
  "srv-2": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80", // Branding & Design
  "srv-3": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80", // Social Media (Multi-Platform Ecosystem Icons)
  "srv-4": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80", // Content Production
  "srv-5": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // Media Buying & Performance
  "srv-6": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80", // PR & Communications
  "srv-7": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80", // Web Development & Digital
  "srv-8": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"  // Events & Activations
};

// Deliverables highlights per service discipline
const deliverablesMap: Record<string, { en: string[]; ar: string[] }> = {
  "srv-1": {
    en: ["Brand Audit & Intelligence", "Market Positioning", "Growth Architecture", "Go-To-Market Roadmap"],
    ar: ["تدقيق العلامة التجارية", "التموضع السوقي", "هندسة النمو التجاري", "خارطة دخول السوق"]
  },
  "srv-2": {
    en: ["Iconic Logo System", "Comprehensive Guidelines", "Packaging Design", "Custom Typography & Tone"],
    ar: ["أنظمة الهوية البصرية", "أدلة العلامة الشاملة", "تصميم العبوات والمنتجات", "الخطوط والنبرة التحريرية"]
  },
  "srv-3": {
    en: ["Strategic Content Calendars", "High-Engagement Reels", "Community Moderation", "Trend Engineering"],
    ar: ["خطط المحتوى الاستراتيجي", "ريلز وتيك توك عالية التفاعل", "إدارة مجتمعات المنصات", "صناعة وتوجيه التريند"]
  },
  "srv-4": {
    en: ["Cinematic Commercial Films", "4K Video Production", "High-End Photography", "3D Motion & CGI"],
    ar: ["إعلانات وأفلام سينمائية", "إنتاج فيديو بدقة 4K", "تصوير فوتوغرافي تجاري", "موشن جرافيك و3D CGI"]
  },
  "srv-5": {
    en: ["Meta & Google Precision Ads", "TikTok Growth Engines", "Conversion Optimization (CRO)", "Real-Time Analytics"],
    ar: ["إعلانات ميتا وجوجل الدقيقة", "حملات تيك توك الموسعة", "تحسين معدلات التحويل", "تحليلات العائد اللحظية"]
  },
  "srv-6": {
    en: ["National Press Campaigns", "Reputation & Crisis Control", "Executive Positioning", "Influencer Alliances"],
    ar: ["حملات النشر الصحفي", "إدارة السمعة والأزمات", "تموضع قيادات الأعمال", "شراكات المؤثرين المعتمدة"]
  },
  "srv-7": {
    en: ["Next.js Enterprise Platforms", "Bespoke UI/UX Engineering", "Headless E-Commerce", "High-Impact Performance"],
    ar: ["منصات ومواقع Next.js الفائقة", "تصميم تجارب UI/UX متقدمة", "متاجر إلكترونية متطورة", "أعلى معايير السرعة والأمان"]
  },
  "srv-8": {
    en: ["Turnkey Brand Activations", "VIP Product Launches", "Immersive Experience Booths", "Media Press Conferences"],
    ar: ["تفعيلات العلامات المبتكرة", "إطلاق المنتجات الكبرى", "أجنحة تفاعلية متطورة", "مؤتمرات إعلامية متكاملة"]
  }
};

export default function ServicesSection({
  lang,
  services,
  settings,
  onSelectService
}: ServicesSectionProps) {
  const t = translations[lang].services;
  const activeServices = services.filter((s) => s.active);

  const badge =
    lang === "ar"
      ? settings?.services_badge_ar || t.badge
      : settings?.services_badge_en || t.badge;

  const headline =
    lang === "ar"
      ? settings?.services_headline_ar || t.headline
      : settings?.services_headline_en || t.headline;

  const subheadline =
    lang === "ar"
      ? settings?.services_subheadline_ar || t.subheadline
      : settings?.services_subheadline_en || t.subheadline;

  return (
    <section id="services" className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/[0.06] overflow-visible">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-ambient-glow opacity-60" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-24 sm:mb-32">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FFD400]">
              {badge}
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-6">
            {headline}
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed">
            {subheadline}
          </p>
        </div>

        {/* Central Vertical Guide Line (Hidden on Mobile) */}
        <div className="hidden lg:block absolute left-1/2 top-72 bottom-24 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-x-1/2 pointer-events-none" />

        {/* Editorial Alternating (Zig-Zag) Layout with Compact Sizing:
            Even items on the LEFT, Odd items on the RIGHT */}
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 relative">
          {activeServices.map((service, idx) => {
            const isEven = idx % 2 === 0;
            const name = lang === "ar" ? service.name_ar : service.name_en;
            const desc = lang === "ar" ? service.desc_ar : service.desc_en;
            const badge = lang === "ar" ? service.badge_ar : service.badge_en;
            const IconComponent = iconMap[service.icon] || Compass;
            const visualBg = serviceVisuals[service.id] || "none";
            const deliverables = deliverablesMap[service.id]
              ? deliverablesMap[service.id][lang]
              : [];

            return (
              <div
                key={service.id}
                className={`flex flex-col lg:flex-row items-center w-full relative ${
                  isEven ? "lg:justify-start" : "lg:justify-end"
                }`}
              >
                {/* Center Node Indicator on Timeline */}
                <div
                  className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/20 bg-[#080808] items-center justify-center text-[10px] font-mono font-bold text-[#FFD400] z-20 shadow-xl"
                  title={`0${idx + 1}`}
                >
                  0{idx + 1}
                </div>

                {/* Alternating Compact Card: Left on Even, Right on Odd */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={{
                    scale: 1.08,
                    zIndex: 45,
                    boxShadow:
                      "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 212, 0, 0.2)"
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  data-cursor="SERVICE"
                  style={{ backgroundImage: visualBg }}
                  className={`w-full lg:w-[48%] group relative p-6 sm:p-8 bg-[#0e0e0e] border border-white/[0.1] hover:border-[#FFD400]/80 transition-colors duration-300 flex flex-col justify-between origin-center cursor-default backdrop-blur-md overflow-hidden rounded-lg ${
                    isEven ? "lg:mr-auto" : "lg:ml-auto"
                  }`}
                >
                  {/* Background Cinematic Discipline Image Layer (Lightened & Vivid) */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={serviceImages[service.id]}
                      alt={name}
                      className="w-full h-full object-cover filter brightness-[0.58] contrast-[1.1] grayscale-[10%] group-hover:brightness-[0.75] group-hover:scale-108 group-hover:grayscale-0 transition-all duration-700 ease-out"
                      loading="lazy"
                    />
                    {/* Soft Vignette Gradient ensuring crisp text legibility while displaying imagery clearly */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-[#080808]/35" />
                  </div>

                  {/* Subtle Abstract Watermark Number */}
                  <span
                    className={`absolute -bottom-4 font-heading font-black text-7xl sm:text-8xl text-white/[0.04] select-none pointer-events-none group-hover:text-[#FFD400]/[0.08] transition-colors z-0 ${
                      isEven ? "-right-3" : "-left-3"
                    }`}
                  >
                    0{idx + 1}
                  </span>

                  <div className="relative z-10">
                    {/* Top Bar with Number & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs text-[#FFD400] font-bold">
                          0{idx + 1} //
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/70 px-2.5 py-0.5 border border-white/15 bg-black/40 backdrop-blur-sm">
                          {badge}
                        </span>
                      </div>

                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="w-10 h-10 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white/80 group-hover:text-[#FFD400] group-hover:border-[#FFD400]/50 transition-colors shadow-lg"
                      >
                        <IconComponent className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Service Title (More compact & refined) */}
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-[#FFD400] transition-colors leading-tight mb-3">
                      {name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-5 line-clamp-3">
                      {desc}
                    </p>

                    {/* Deliverables Checklist Matrix */}
                    {deliverables.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 mb-5 border-t border-white/[0.08]">
                        {deliverables.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="flex items-center gap-1.5 text-[11px] font-mono text-white/70 group-hover:text-white/90 transition-colors"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#FFD400] flex-shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <button
                      onClick={() => onSelectService(name)}
                      className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-white/90 hover:text-[#FFD400] transition-colors group-hover:translate-x-1 duration-300 cursor-pointer"
                    >
                      <span>{t.explore}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FFD400]" />
                    </button>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-[#FFD400] transition-colors" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
