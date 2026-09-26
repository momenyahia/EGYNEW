"use client";

import Link from "next/link";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { Language, translations } from "@/lib/translations";
import { SiteSettings } from "@/types";

interface FooterProps {
  lang: Language;
  settings?: SiteSettings;
}

export default function Footer({ lang, settings }: FooterProps) {
  const t = translations[lang].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const phone = settings?.phone || "+20 104 4107134";
  const email = settings?.email || "info@egyptcreative.com";
  const address =
    lang === "ar"
      ? settings?.address_ar || t.address
      : settings?.address_en || t.address;
  const instagram = settings?.instagram || "https://www.instagram.com/egypt_creative_agency";
  const linkedin = settings?.linkedin || "https://www.linkedin.com/company/egypt-creative-agency";

  return (
    <footer className="relative bg-[#060606] text-white border-t border-white/[0.08] pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Top Big Branding Banner */}
        <div className="pb-16 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <img
              src="/logo-dark.png"
              alt="Egypt Creative Marketing Agency"
              className="h-14 sm:h-18 w-auto object-contain mb-4"
            />
            <p className="text-sm uppercase tracking-[0.25em] text-white/50 font-mono">
              {t.tagline}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="self-start md:self-auto flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-[#FFD400] transition-colors py-2 px-3 border border-white/10 hover:border-[#FFD400]/40"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Columns Information */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Headquarters */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-4">
              // {t.addressTitle}
            </span>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              {address}
            </p>
          </div>

          {/* Col 2: Direct Contact */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-4">
              // {t.contactTitle}
            </span>
            <div className="flex flex-col gap-2.5 text-sm text-white/70">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FFD400]" />
                <span>{email}</span>
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FFD400]" />
                <span>{phone}</span>
              </a>
            </div>
          </div>

          {/* Col 3: Social Networks */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-4">
              // {t.socialTitle}
            </span>
            <div className="flex items-center gap-4 text-white/70">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/10 hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/10 hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 4: Platform Navigation */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFD400] block mb-4">
              // AGENCY ECOSYSTEM
            </span>
            <div className="flex flex-col gap-2 text-xs font-mono uppercase tracking-wider text-white/50">
              <a href="#about" className="hover:text-white transition-colors">
                About Agency
              </a>
              <a href="#work" className="hover:text-white transition-colors">
                Selected Portfolio
              </a>
              <a href="#services" className="hover:text-white transition-colors">
                Integrated Services
              </a>
              <a href="#work" className="text-[#FFD400] hover:underline">
                Explore All Work →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <span>{t.allRights}</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#FFD400] transition-colors">
              {t.privacy}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#FFD400] transition-colors">
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
