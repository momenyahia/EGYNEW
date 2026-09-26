"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft, AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors securely without leaking private state
    console.error("Critical Runtime Error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-6 text-center">
      {/* Emblem */}
      <div className="w-16 h-16 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center mb-6 text-red-400">
        <AlertCircle className="w-8 h-8 stroke-[1.5]" />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#FFD400]">
          500 — SYSTEM NOTICE
        </span>
        <div className="w-12 h-[1px] bg-white/20" />
      </div>

      <h1 className="font-heading font-black text-3xl sm:text-5xl text-white mb-4 tracking-tight">
        SOMETHING WENT UNEXPECTED.
      </h1>

      <p className="text-white/60 max-w-lg text-sm sm:text-base font-light mb-8 leading-relaxed">
        An unexpected interruption occurred while rendering this interface. Our technical team has been notified. You can attempt to re-render the view or return to the main showcase.
      </p>

      {error.digest && (
        <p className="font-mono text-[11px] text-white/30 mb-8 border border-white/10 px-3 py-1 bg-white/[0.02]">
          Ref ID: {error.digest}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD400] text-black font-heading font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-heading font-semibold text-xs uppercase tracking-widest hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
