import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import ContactFooter from "@/components/portfolio/ContactFooter";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] bg-swiss-grid text-[#111111] flex flex-col justify-between">
      <Navbar />

      <section className="pt-40 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto text-center flex flex-col items-center justify-center my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E5E0] shadow-xs mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
          <span className="font-mono-meta text-xs font-bold text-[#111111] tracking-widest uppercase">
            404 / PAGE NOT FOUND
          </span>
        </div>

        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-extrabold text-[#111111] tracking-tight uppercase mb-6 leading-none">
          LOST IN THE <br />
          <span className="relative inline-block text-[#111111]">
            GRID.
            <span className="absolute bottom-2 left-0 w-full h-4 bg-[#FFB800] -z-10 rounded-sm" />
          </span>
        </h1>

        <p className="text-[#707070] text-lg sm:text-xl leading-relaxed max-w-xl mb-10 font-normal">
          The project or page you are looking for has been moved, renamed, or filed in another archive folder.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center justify-center gap-2.5 bg-[#FFB800] text-[#111111] hover:bg-[#111111] hover:text-[#FFB800] font-display font-bold text-sm px-8 py-4 rounded-xl shadow-md transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO PORTFOLIO WORK</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2.5 bg-[#111111] text-white hover:bg-[#FFB800] hover:text-[#111111] font-display font-bold text-sm px-8 py-4 rounded-xl shadow-md transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            <span>RETURN HOME</span>
          </Link>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
