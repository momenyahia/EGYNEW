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

        {/* Section Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1]">
              {headline}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="font-sans text-base sm:text-lg text-white/70 leading-relaxed font-light mb-8">
              {desc}
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#FFD400]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
              <span>Full-Service Agency Ecosystem</span>
            </div>
          </motion.div>
        </div>

        {/* Editorial 50/50 Split: Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          {/* Vision Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="p-8 sm:p-12 bg-white/[0.02] border border-white/[0.08] hover:border-[#FFD400]/40 transition-colors duration-300 group"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono tracking-widest uppercase text-[#FFD400]">
                01.01
              </span>
              <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#FFD400] transition-colors" />
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-4 tracking-tight">
              {t.visionTitle}
            </h3>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
              {vision}
            </p>
          </motion.div>

          {/* Mission Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="p-8 sm:p-12 bg-white/[0.02] border border-white/[0.08] hover:border-[#FFD400]/40 transition-colors duration-300 group"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono tracking-widest uppercase text-[#FFD400]">
                01.02
              </span>
              <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#FFD400] transition-colors" />
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-4 tracking-tight">
              {t.missionTitle}
            </h3>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
              {mission}
            </p>
          </motion.div>
        </div>

        {/* Live Dynamic Stats (CMS Controlled) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="pt-12 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10"
        >
          {statsList.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col group cursor-default"
            >
              <span className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-2 group-hover:text-[#FFD400] transition-colors">
                {stat.val}
              </span>
              <span className="text-xs sm:text-sm font-sans uppercase tracking-widest text-white/50">
                {lang === "ar" ? stat.lbl_ar : stat.lbl_en}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
