"use client";

import { motion } from "framer-motion";
import { Quote, Star, TrendingUp, Building2, ShieldCheck } from "lucide-react";
import { Language } from "@/lib/translations";
import { TestimonialItem } from "@/types";

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "test-1",
    client_name_en: "Eng. Tarek El-Mansoury",
    client_name_ar: "م. طارق المنصوري",
    client_title_en: "Chief Commercial Officer, Palm Developments",
    client_title_ar: "رئيس القطاع التجاري، بالم للتطوير العقاري",
    company_name_en: "Palm Real Estate Group",
    company_name_ar: "مجموعة بالم العقارية",
    quote_en:
      "Egypt Creative completely redefined our brand aura. Their cinematic campaign and digital launch delivered our entire phase-one sellout in just 3 weeks.",
    quote_ar:
      "أعادت إيجيبت كرييتف صياغة هوية علامتنا بالكامل. حملتهم السينمائية وإطلاقهم الرقمي حققا مبيعات المرحلة الأولى بالكامل في 3 أسابيع فقط.",
    result_metric: "100%",
    result_label_en: "Phase-1 Sellout in 21 Days",
    result_label_ar: "حجز كامل المرحلة الأولى في 21 يوماً",
    rating: 5
  },
  {
    id: "test-2",
    client_name_en: "Laila H. Mostafa",
    client_name_ar: "ليلى ح. مصطفى",
    client_title_en: "Managing Director, Solis Hospitality Cairo",
    client_title_ar: "العضو المنتدب، سوليس للضيافة القاهرة",
    company_name_en: "Solis Luxury Hotels",
    company_name_ar: "فنادق سوليس الفاخرة",
    quote_en:
      "Working with them feels like having an elite Manhattan creative studio right in Cairo. The attention to typography, narrative, and ROI is unmatched in the MENA region.",
    quote_ar:
      "العمل معهم يماثل التعاقد مع أعتى استوديوهات مانهاتن الإبداعية في قلب القاهرة. الدقة في التايبوغرافي والسرد السينمائي وتحقيق العائد لا مثيل لهما بالمنطقة.",
    result_metric: "+210%",
    result_label_en: "Direct Inbound Bookings Growth",
    result_label_ar: "نمو الحجوزات المباشرة بنسبة 210%",
    rating: 5
  },
  {
    id: "test-3",
    client_name_en: "Kareem A. Zahran",
    client_name_ar: "كريم أ. زهران",
    client_title_en: "Founder & CEO, Qist Payment Solutions",
    client_title_ar: "المؤسس والرئيس التنفيذي، قسط للمدفوعات",
    company_name_en: "Qist Fintech KSA / EG",
    company_name_ar: "قسط للتكنولوجيا المالية (مصر والسعودية)",
    quote_en:
      "From naming architecture to high-converting performance ads across Riyadh and Cairo, Egypt Creative gave us the institutional gravitas required to close our Series A.",
    quote_ar:
      "من بناء استراتيجية الاسم إلى الإعلانات التسويقية عالية التحويل في الرياض والقاهرة، منحتنا إيجيبت كرييتف الثقل المؤسسي اللازم لإغلاق جولتنا الاستثمارية الأولى.",
    result_metric: "$4.2M",
    result_label_en: "Series A Round Closed Post-Launch",
    result_label_ar: "إغلاق جولة تمويلية بقيمة 4.2 مليون دولار",
    rating: 5
  }
];

export default function TestimonialsSection({ lang }: { lang: Language }) {
  return (
    <section className="relative py-28 sm:py-36 bg-[#080808] border-t border-white/[0.08] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-[#FFD400]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FFD400]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#FFD400]">
                {lang === "ar" ? "// ثقة الشركاء والنتائج" : "// VERIFIED IMPACT & REPUTATION"}
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1]">
              {lang === "ar" ? "ما يقوله قادة الأعمال عنا" : "Endorsed by Market Leaders."}
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-white/60 max-w-md">
            {lang === "ar"
              ? "شراكات طويلة الأمد مبنية على نمو حقيقي، علامات فارقة، ونتائج استثمارية موثقة."
              : "Institutional credibility forged through measurable ROI, category leadership, and creative mastery."}
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {defaultTestimonials.map((t, index) => {
            const name = lang === "ar" ? t.client_name_ar : t.client_name_en;
            const title = lang === "ar" ? t.client_title_ar : t.client_title_en;
            const company = lang === "ar" ? t.company_name_ar : t.company_name_en;
            const quote = lang === "ar" ? t.quote_ar : t.quote_en;
            const resultLabel = lang === "ar" ? t.result_label_ar : t.result_label_en;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between p-8 bg-white/[0.02] border border-white/[0.08] hover:border-[#FFD400]/40 transition-colors duration-400"
              >
                {/* Card Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD400]/0 to-transparent group-hover:via-[#FFD400]/60 transition-all duration-500" />

                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FFD400] text-[#FFD400]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-white/20 group-hover:text-[#FFD400]/60 transition-colors" />
                  </div>

                  {/* Quote Body */}
                  <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light mb-8">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>

                {/* Footer Info & Verified Metric Badge */}
                <div className="pt-6 border-t border-white/[0.06] flex flex-col gap-4">
                  {/* Verified Metric Box */}
                  <div className="p-3 bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#FFD400]" />
                      <span className="text-[11px] font-mono text-white/60 uppercase">
                        {resultLabel}
                      </span>
                    </div>
                    <span className="font-heading font-black text-sm text-[#FFD400]">
                      {t.result_metric}
                    </span>
                  </div>

                  {/* Client Designation */}
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                      <span>{name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FFD400]" />
                    </h4>
                    <p className="text-xs text-white/50 font-sans mt-0.5">
                      {title}
                    </p>
                    <p className="text-[11px] font-mono text-white/40 uppercase tracking-wider mt-1">
                      {company}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
