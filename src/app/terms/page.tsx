import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Egypt Creative",
  description: "Terms and conditions of engagement for Egypt Creative Agency."
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#F4F4F1] py-24 sm:py-32">
      <div className="max-w-[960px] mx-auto px-6 sm:px-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FFD400] hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Egypt Creative</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FFD400]">
              TERMS OF AGENCY ENGAGEMENT
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            TERMS & CONDITIONS
          </h1>
          <p className="font-mono text-xs text-white/50 tracking-wider">
            Egypt Creative Agency • Commercial Scope & Service Standards
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-sm sm:text-base text-white/70 leading-relaxed font-light">
          <section className="p-8 bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4 text-white">
              <FileText className="w-5 h-5 text-[#FFD400]" />
              <h2 className="font-heading font-bold text-xl text-white">
                1. Scope of Creative Services
              </h2>
            </div>
            <p>
              Egypt Creative delivers full-service marketing, branding, cinematic video production, performance media buying, and web engineering. Every project engagement is governed by an executed Statement of Work (SOW) or official commercial contract detailing milestones, deliverables, and timelines.
            </p>
          </section>

          <section className="p-8 bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4 text-white">
              <CheckCircle2 className="w-5 h-5 text-[#FFD400]" />
              <h2 className="font-heading font-bold text-xl text-white">
                2. Intellectual Property Rights
              </h2>
            </div>
            <p>
              Upon complete settlement of agreed contractual invoices, all final visual identities, campaign films, high-resolution source designs, and custom web assets created specifically for the client are transferred in full ownership to the client. Egypt Creative retains the right to display completed works in its portfolio and case studies.
            </p>
          </section>

          <section className="p-8 bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4 text-white">
              <ShieldAlert className="w-5 h-5 text-[#FFD400]" />
              <h2 className="font-heading font-bold text-xl text-white">
                3. Confidentiality & Security
              </h2>
            </div>
            <p>
              Both parties agree to treat all business plans, financial projections, media budgets, and proprietary trade secrets with strictest confidence.
            </p>
          </section>

          <div className="pt-8 border-t border-white/10 text-xs font-mono text-white/50">
            <p>© 2026 Egypt Creative. All Rights Reserved. Greek Campus West, Mall of Arabia, 6th of October, Egypt.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
