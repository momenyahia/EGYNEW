"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Sun, Moon, Globe } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenProjectForm: () => void;
}

export default function Header({
  lang,
  onToggleLang,
  onOpenProjectForm
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.about, href: "#about" },
    { label: t.work, href: "#work" },
    { label: t.services, href: "#services" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          scrolled
            ? "py-3.5 glass-panel shadow-2xl shadow-black/40 border-b border-white/[0.06]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* Official Agency Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 outline-none select-none"
            data-cursor="EC"
          >
            <img
              src="/logo-dark.png"
              alt="Egypt Creative Marketing Agency"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold tracking-wider uppercase text-white/70">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFD400] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-6">
            {/* Language Switch */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-[#FFD400] transition-colors px-2.5 py-1 rounded border border-white/10 hover:border-[#FFD400]/40"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.switchLang}</span>
            </button>

            {/* START A PROJECT CTA (Text + Arrow based per roadmap section 05) */}
            <button
              onClick={onOpenProjectForm}
              data-cursor="START →"
              className="group flex items-center gap-2 text-xs font-heading font-extrabold tracking-widest uppercase text-white hover:text-[#FFD400] transition-colors py-2 px-1 relative"
            >
              <span>{t.contact}</span>
              <ArrowUpRight className="w-4 h-4 text-[#FFD400] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-[#FFD400] transition-colors" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={onToggleLang}
              className="text-xs font-bold text-[#FFD400] px-2 py-1 border border-[#FFD400]/30 rounded"
            >
              {t.switchLang}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#FFD400] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <img
              src="/logo-dark.png"
              alt="Egypt Creative Marketing Agency"
              className="h-9 w-auto object-contain"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 py-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading font-bold text-2xl text-white hover:text-[#FFD400] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectForm();
              }}
              className="w-full py-4 bg-[#FFD400] text-black font-heading font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <span>{t.contact}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
