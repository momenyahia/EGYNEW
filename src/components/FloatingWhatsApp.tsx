"use client";

import { MessageCircle } from "lucide-react";
import { Language } from "@/lib/translations";
import { SiteSettings } from "@/types";

interface FloatingWhatsAppProps {
  lang: Language;
  settings?: SiteSettings;
}

export default function FloatingWhatsApp({
  lang,
  settings
}: FloatingWhatsAppProps) {
  const whatsappNumber = settings?.whatsapp || "201044107134";
  const whatsappMsg = encodeURIComponent(
    lang === "ar"
      ? settings?.whatsapp_prefilled_ar || "مرحباً إيجيبت كرييتف، أرغب بمناقشة مشروع خاص بعلامتي التجارية."
      : settings?.whatsapp_prefilled_en || "Hello Egypt Creative, I would like to discuss a project for my brand."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="WHATSAPP"
      aria-label="Direct WhatsApp Consultation"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-2xl shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all duration-300"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 fill-white stroke-none" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
      </div>
      <span className="font-heading font-bold text-xs uppercase tracking-wider hidden sm:inline-block">
        {lang === "ar" ? "مراسلة فورية" : "WhatsApp"}
      </span>
    </a>
  );
}
