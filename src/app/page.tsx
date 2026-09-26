"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTASection from "@/components/FinalCTASection";
import ProjectFormOverlay from "@/components/ProjectFormOverlay";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

import { Language } from "@/lib/translations";
import { initialData } from "@/lib/initialData";
import { HeroMediaItem, Project, ServiceItem, SiteSettings, StatItem } from "@/types";

export default function HomePage() {
  const [lang, setLang] = useState<Language>("en");

  // Data states initialized from rich static baseline
  const [settings, setSettings] = useState<SiteSettings>(initialData.settings);
  const [stats, setStats] = useState<StatItem[]>(initialData.stats);
  const [services, setServices] = useState<ServiceItem[]>(initialData.services);
  const [projects, setProjects] = useState<Project[]>(initialData.projects);
  const [heroMedia, setHeroMedia] = useState<HeroMediaItem[]>(initialData.hero_media || []);

  // Modal / Interaction states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>("");

  // Sync HTML dir, lang, and enforce dark theme
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.classList.add("dark");
  }, [lang]);

  // Fetch live updates from API if available
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, projRes, srvRes, heroRes] = await Promise.all([
          fetch("/api/content"),
          fetch("/api/projects"),
          fetch("/api/services"),
          fetch("/api/hero-media")
        ]);

        if (contentRes.ok) {
          const cData = await contentRes.json();
          if (cData.settings) setSettings(cData.settings);
          if (cData.stats) setStats(cData.stats);
        }

        if (projRes.ok) {
          const pData = await projRes.json();
          if (pData.projects && pData.projects.length > 0) {
            setProjects(pData.projects);
          }
        }

        if (srvRes.ok) {
          const sData = await srvRes.json();
          if (sData.services && sData.services.length > 0) {
            setServices(sData.services);
          }
        }

        if (heroRes.ok) {
          const hData = await heroRes.json();
          if (hData.hero_media && hData.hero_media.length > 0) {
            setHeroMedia(hData.hero_media);
          }
        }
      } catch (err) {
        console.warn("Using offline fallback data:", err);
      }
    };

    fetchData();
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const handleOpenFormWithService = (serviceName: string) => {
    setPreselectedService(serviceName);
    setIsFormOpen(true);
  };

  return (
    <div
      suppressHydrationWarning
      className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden"
    >
      {/* 17 — Magnetic Cursor on Desktop */}
      <CustomCursor />

      {/* 05 — Header & Navigation */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenProjectForm={() => {
          setPreselectedService("");
          setIsFormOpen(true);
        }}
      />

      <main suppressHydrationWarning>
        {/* 04 — Hero Section */}
        <HeroSection
          lang={lang}
          headline={lang === "ar" ? settings.hero_headline_ar : settings.hero_headline_en}
          subheadline={lang === "ar" ? settings.hero_subheadline_ar : settings.hero_subheadline_en}
          heroMedia={heroMedia}
          onOpenProjectForm={() => setIsFormOpen(true)}
        />

        {/* 06 — Who We Are */}
        <WhoWeAreSection
          lang={lang}
          settings={settings}
          stats={stats}
        />

        {/* 07 — Selected Work */}
        <SelectedWorkSection
          lang={lang}
          projects={projects}
          settings={settings}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* 10 — Services Section */}
        <ServicesSection
          lang={lang}
          services={services}
          settings={settings}
          onSelectService={handleOpenFormWithService}
        />

        {/* 10.5 — Verified Executive Testimonials */}
        <TestimonialsSection lang={lang} />

        {/* 11 — Final CTA */}
        <FinalCTASection
          lang={lang}
          settings={settings}
          onOpenProjectForm={() => setIsFormOpen(true)}
        />
      </main>

      {/* 13 — Footer */}
      <Footer lang={lang} settings={settings} />

      {/* 12 — Floating WhatsApp */}
      <FloatingWhatsApp lang={lang} settings={settings} />

      {/* 08/09 — Shared-Element Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
        onOpenProjectForm={() => setIsFormOpen(true)}
      />

      {/* 11 — Full-screen Project Form Overlay */}
      <ProjectFormOverlay
        isOpen={isFormOpen}
        lang={lang}
        onClose={() => setIsFormOpen(false)}
        preselectedService={preselectedService}
      />
    </div>
  );
}
