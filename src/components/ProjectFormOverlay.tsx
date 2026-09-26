"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface ProjectFormOverlayProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  preselectedService?: string;
}

export default function ProjectFormOverlay({
  isOpen,
  lang,
  onClose,
  preselectedService
}: ProjectFormOverlayProps) {
  const t = translations[lang].form;

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState(
    preselectedService || ""
  );
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("Website Direct");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get("utm_source");
      const utmCampaign = params.get("utm_campaign");
      const ref = document.referrer;

      if (utmSource) {
        setSource(`${utmSource.toUpperCase()}${utmCampaign ? ` / ${utmCampaign}` : ""}`);
      } else if (ref) {
        try {
          const refHost = new URL(ref).hostname;
          if (refHost.includes("instagram")) setSource("Instagram");
          else if (refHost.includes("linkedin")) setSource("LinkedIn");
          else if (refHost.includes("google")) setSource("Google");
          else setSource(`Referral (${refHost})`);
        } catch {
          setSource("Referral");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSuccess(false);
      setErrorMessage("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName || !company || !email || !phone) {
      setErrorMessage(t.requiredAlert);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          company,
          email,
          phone,
          serviceNeeded: selectedService,
          message,
          source
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFullName("");
        setCompany("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setErrorMessage(data.error || "Failed to submit. Please try again.");
      }
    } catch {
      setErrorMessage("Network connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="form-overlay"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99990] overflow-y-auto bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:p-16"
        >
          {/* Top Bar with Brand & Close */}
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-white/[0.08] pb-6 mb-12">
            <img
              src="/logo-dark.png"
              alt="Egypt Creative Marketing Agency"
              className="h-9 sm:h-11 w-auto object-contain dark-only-logo"
            />
            <img
              src="/logo.png"
              alt="Egypt Creative Marketing Agency"
              className="h-9 sm:h-11 w-auto object-contain light-only-logo"
            />

            <button
              onClick={onClose}
              data-cursor="CLOSE"
              className="p-2.5 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-[#FFD400] transition-colors"
              aria-label={t.closeOverlay}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Form Container */}
          <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center">
            {success ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12 flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#FFD400]/10 border border-[#FFD400]/40 flex items-center justify-center text-[#FFD400] mb-8">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-4 tracking-tight">
                  {t.successTitle}
                </h2>

                <p className="text-lg text-white/70 font-light max-w-xl leading-relaxed mb-10">
                  {t.successDesc}
                </p>

                <button
                  onClick={onClose}
                  className="px-10 py-4 bg-[#FFD400] text-black font-heading font-extrabold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                >
                  {t.closeOverlay}
                </button>
              </motion.div>
            ) : (
              <div>
                <div className="mb-12">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FFD400] block mb-3">
                    // START A PROJECT
                  </span>
                  <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
                    {t.title}
                  </h2>
                  <p className="text-base sm:text-lg text-white/60 font-light">
                    {t.subtitle}
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-8 p-4 bg-red-950/40 border border-red-500/40 text-red-200 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                  {/* Row 1: Name & Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                        {t.fullName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.fullNamePlaceholder}
                        className="editorial-input"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                        {t.company} *
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t.companyPlaceholder}
                        className="editorial-input"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                        {t.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="editorial-input"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                        {t.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="editorial-input"
                      />
                    </div>
                  </div>

                  {/* Row 3: What do you need / Service Needed (Clean text input per user instruction) */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                      {lang === "ar" ? "ما الذي تحتاجه لعلامتك التجارية؟" : "What does your brand need?"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      placeholder={
                        lang === "ar"
                          ? "اكتب ما تحتاجه هنا (مثال: هوية بصرية، حملة تسويقية، إنتاج فيديو سينمائي، موقع إلكتروني...)"
                          : "Type what you need (e.g. Brand Identity, Film Production, Growth Campaign, Web Platform...)"
                      }
                      className="editorial-input"
                    />
                  </div>

                  {/* Row 6: Brief Message */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                      {t.message}
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.messagePlaceholder}
                      className="editorial-input resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      data-cursor="SUBMIT"
                      className="w-full sm:w-auto px-12 py-5 bg-[#FFD400] text-black font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      <span>{loading ? t.submitting : t.submit}</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </motion.button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Footer in overlay */}
          <div className="max-w-4xl mx-auto w-full pt-8 border-t border-white/[0.08] text-center text-xs text-white/30 uppercase tracking-widest font-mono">
            Egypt Creative • Confidential Client Inquiries
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
