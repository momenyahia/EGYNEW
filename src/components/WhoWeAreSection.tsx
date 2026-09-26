"use client";

import { motion } from "framer-motion";
import { Language, translations } from "@/lib/translations";
import { SiteSettings, StatItem } from "@/types";

interface WhoWeAreSectionProps {
  lang: Language;
  settings?: SiteSettings;
  stats?: StatItem[];
}

export default function WhoWeAreSection({
  lang,
  settings,
  stats
}: WhoWeAreSectionProps) {
  const t = translations[lang].whoWeAre;

  const headline =
    lang === "ar"
      ? settings?.about_headline_ar || t.headline
      : settings?.about_headline_en || t.headline;

  const desc =
    lang === "ar"
      ? settings?.about_desc_ar ||
        "إيجيبت كرييتف هي وكالة إبداعية وتسويقية متكاملة تنطلق من القاهرة نحو المنطقة بأسرها. ندمج بين الرؤية الاستراتيجية الاستباقية، الهوية البصرية الأيقونية، التجارب الرقمية الفائقة، والنمو القابل للقياس لقيادة العلامات التجارية الطموحة نحو الريادة."
      : settings?.about_desc_en ||
        "Egypt Creative is a full-service creative and performance marketing agency operating from Cairo to the region. We blend strategic foresight, iconic visual direction, cutting-edge digital experiences, and measurable ROI to scale ambitious market leaders.";

  const vision =
    lang === "ar"
      ? settings?.vision_ar ||
        "أن نكون المعيار الإقليمي الأول للعمل الإبداعي التحويلي، حيث يلتقي الابتكار البصري غير المسبوق مع التأثير التجاري الحقيقي والمستدام."
      : settings?.vision_en ||
        "To set the regional benchmark for transformative agency work where boundary-pushing creativity and disciplined commercial impact unite seamlessly.";

  const mission =
    lang === "ar"
      ? settings?.mission_ar ||
        "تمكين أصحاب الأعمال والرؤى المستقبلية عبر إدارة إبداعية وتسويقية متكاملة 360 درجة، تنهي تشتت العمل مع جهات متعددة وتمنح العلامة حضوراً لا يُنسى."
      : settings?.mission_en ||
        "To empower visionary businesses with end-to-end creative mastery, eliminating agency fragmentation and delivering cohesive, unforgettable brand authority.";

  const statsList = stats && stats.length > 0 ? stats : [
    { id: "s1", val: "2011", lbl_en: "Founded In Cairo", lbl_ar: "تأسست في القاهرة" },
    { id: "s2", val: "1,000+", lbl_en: "Projects Mastered", lbl_ar: "مشروع منجز باحترافية" },
    { id: "s3", val: "16+", lbl_en: "Years Combined Mastery", lbl_ar: "عاماً من الخبرة المتراكمة" },
    { id: "s4", val: "98%", lbl_en: "Client Retention & Growth", lbl_ar: "نسبة استبقاء ونمو العملاء" }
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Index & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#FFD400]">
            {t.badge}
          </span>
          <div className="w-12 h-[1px] bg-white/20" />
        </motion.div>

        {/* Section Main Grid with Visual Agency Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              {headline}
            </h2>
            <p className="font-sans text-base sm:text-lg text-white/70 leading-relaxed font-light mb-8 max-w-2xl">
              {desc}
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#FFD400]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400] animate-ping" />
              <span>Full-Service Agency Ecosystem • Cairo, 6th of October</span>
            </div>
          </motion.div>

          {/* Visual Agency Editorial Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative aspect-[16/11] rounded-lg overflow-hidden border border-white/10 group-hover:border-[#FFD400]/40 transition-colors shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
                alt="Egypt Creative Agency Production & Direction"
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="text-white/90 font-bold tracking-wider uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFD400]" />
                  Creative Mastery
                </span>
                <span className="text-[#FFD400] text-[10px] uppercase tracking-widest">
                  EST. 2011 // CAIRO
                </span>
              </div>
            </div>
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD400]/20 to-transparent blur-xl opacity-30 group-hover:opacity-60 transition-opacity -z-10" />
          </motion.div>
        </div>

        {/* Editorial 50/50 Split: Vision & Mission with Rich Ambient Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          {/* Vision Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="p-8 sm:p-12 border border-white/[0.08] hover:border-[#FFD400]/50 transition-colors duration-400 rounded-lg group relative overflow-hidden shadow-2xl"
          >
            {/* Background Photographic Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="Egypt Creative Vision"
                className="w-full h-full object-cover filter brightness-[0.52] contrast-[1.08] group-hover:scale-105 group-hover:brightness-[0.62] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-[#080808]/30" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono tracking-widest uppercase text-[#FFD400] drop-shadow-md">
                  VISION // الرؤية
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FFD400] transition-colors shadow-lg shadow-[#FFD400]/50" />
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-4 tracking-tight drop-shadow-md">
                {t.visionTitle}
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal drop-shadow-sm">
                {vision}
              </p>
            </div>
          </motion.div>

          {/* Mission Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="p-8 sm:p-12 border border-white/[0.08] hover:border-[#FFD400]/50 transition-colors duration-400 rounded-lg group relative overflow-hidden shadow-2xl"
          >
            {/* Background Photographic Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80"
                alt="Egypt Creative Mission"
                className="w-full h-full object-cover filter brightness-[0.52] contrast-[1.08] group-hover:scale-105 group-hover:brightness-[0.62] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-[#080808]/30" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono tracking-widest uppercase text-[#FFD400] drop-shadow-md">
                  MISSION // الرسالة
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FFD400] transition-colors shadow-lg shadow-[#FFD400]/50" />
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-4 tracking-tight drop-shadow-md">
                {t.missionTitle}
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal drop-shadow-sm">
                {mission}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Live Dynamic Stats with Background Photography & Removed 1,2,3,4 Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statsList.map((stat, i) => {
            const statBgImages = [
              "https://images.unsplash.com/photo-1542744094-3a3172720a42?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80"
            ];

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 sm:p-8 border border-white/[0.08] hover:border-[#FFD400]/50 transition-all rounded-lg flex flex-col justify-between group cursor-default relative overflow-hidden shadow-lg"
              >
                {/* Background Photography Layer for Each Stat */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={statBgImages[i % statBgImages.length]}
                    alt={stat.lbl_en}
                    className="w-full h-full object-cover filter brightness-[0.48] contrast-[1.12] group-hover:scale-110 group-hover:brightness-[0.58] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/65 to-[#080808]/35" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#FFD400] group-hover:scale-125 transition-transform shadow-md shadow-[#FFD400]/40" />
                  </div>
                  <span className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight mb-2 group-hover:text-[#FFD400] transition-colors drop-shadow-md">
                    {stat.val}
                  </span>
                  <span className="text-xs font-sans uppercase tracking-widest text-white/90 leading-relaxed font-semibold drop-shadow-sm">
                    {lang === "ar" ? stat.lbl_ar : stat.lbl_en}
                  </span>
                </div>
                {/* Subtle yellow bottom line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#FFD400] transition-colors" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
