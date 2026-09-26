import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6">
        <span className="font-heading font-black text-xl text-[#FFD400]">404</span>
      </div>

      <h1 className="font-heading font-black text-4xl sm:text-6xl text-white mb-4 tracking-tight">
        PAGE NOT FOUND.
      </h1>

      <p className="text-white/60 max-w-md text-sm sm:text-base font-light mb-8">
        The requested creative resource or case study does not exist or has moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD400] text-black font-heading font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
