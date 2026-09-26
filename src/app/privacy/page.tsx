import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Notice — Egypt Creative",
  description: "Privacy policy, data collection notice, and lead retention protocols for Egypt Creative Agency."
};

export default function PrivacyPolicyPage() {
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
              LEGAL COMPLIANCE & PRIVACY PROTOCOL
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            PRIVACY POLICY & DATA RETENTION
          </h1>
          <p className="font-mono text-xs text-white/50 tracking-wider">
            Last Updated: September 2026 • Governing Law: Arab Republic of Egypt (Law No. 151 of 2020)
          </p>
        </div>

        {/* Content Modules */}
        <div className="space-y-12 text-sm sm:text-base text-white/70 leading-relaxed font-light">
          {/* Section 1 */}
          <section className="p-8 bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4 text-white">
              <Shield className="w-5 h-5 text-[#FFD400]" />
              <h2 className="font-heading font-bold text-xl text-white">
                1. Information We Collect / جمع البيانات
              </h2>
            </div>
            <p className="mb-4">
              When prospective clients submit inquiries via our project form or direct communication channels, Egypt Creative collects only the necessary business telemetry:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/80 font-mono text-xs pl-2">
              <li>Full Name and Professional Title</li>
              <li>Company / Organization / Brand Name</li>
              <li>Official Email Address & WhatsApp Phone Number</li>
              <li>Project Scope, Deliverable Requirements & Goals</li>
              <li>Marketing Acquisition Source (UTM campaign parameters & referring domain)</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="p-8 bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4 text-white">
              <Lock className="w-5 h-5 text-[#FFD400]" />
              <h2 className="font-heading font-bold text-xl text-white">
                2. Use of Information / استخدام البيانات
              </h2>
            </div>
            <p className="mb-4">
              We exclusively use the submitted information to formulate creative proposals, deliver tailored commercial consultations, and establish enterprise marketing agreements. We do not sell, rent, or trade client telemetry to any third-party brokers.
            </p>
            <p>
              تستخدم إيجيبت كرييتف البيانات فقط لدراسة المشاريع وتقديم العروض الفنية والمالية ولا يتم مشاركة أي معلومات تجارية مع أي أطراف خارجية.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-8 bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4 text-white">
              <Clock className="w-5 h-5 text-[#FFD400]" />
              <h2 className="font-heading font-bold text-xl text-white">
                3. Lead Retention & Deletion Policy / سياسة الاحتفاظ بالبيانات
              </h2>
            </div>
            <p className="mb-4">
              Under Section 29 of the Egypt Creative Master Architecture:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/80 font-mono text-xs pl-2">
              <li>Active Leads are retained in our encrypted CRM for the duration of the evaluation cycle.</li>
              <li>Unqualified inquiries or closed records are archived after 180 days.</li>
              <li>Clients may request permanent deletion of their business record at any moment by contacting privacy@egyptcreative.com.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="p-8 bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4 text-white">
              <Eye className="w-5 h-5 text-[#FFD400]" />
              <h2 className="font-heading font-bold text-xl text-white">
                4. Confidentiality & Non-Disclosure / السرية وحماية الأفكار
              </h2>
            </div>
            <p>
              All concepts, pitch requests, brand decks, and commercial strategies shared with Egypt Creative are protected under mutual strict NDA ethics. We uphold the highest enterprise standards of intellectual property security.
            </p>
          </section>

          {/* Contact Details */}
          <div className="pt-8 border-t border-white/10 text-xs font-mono text-white/50">
            <p>Direct Inquiries: legal@egyptcreative.com • Headquarters: The Greek Campus West, Mall of Arabia, 6th of October, Giza, Egypt</p>
          </div>
        </div>
      </div>
    </main>
  );
}
