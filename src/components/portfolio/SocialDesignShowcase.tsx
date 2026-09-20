"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ChevronLeft, ChevronRight, Maximize2, X, ArrowUpRight } from "lucide-react";
import Sparkle3D from "@/components/ui/Sparkle3D";
import { PORTFOLIO_CATEGORIES, ProjectItem } from "@/data/projects";

const FILTER_TAGS = ["ALL", "CAROUSELS", "AD POSTS", "CAMPAIGNS"] as const;

export default function SocialDesignShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<(typeof FILTER_TAGS)[number]>("ALL");
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const projects = useMemo(
    () => PORTFOLIO_CATEGORIES.find((c) => c.id === "social")?.projects || [],
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return projects;
    const keyMap = { CAROUSELS: "carousel", "AD POSTS": "ad", CAMPAIGNS: "campaign" };
    const query = keyMap[activeFilter as keyof typeof keyMap];
    return projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes(query)));
  }, [projects, activeFilter]);

  // ponytail: native scrollBy replaces manual offset calculation
  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = el.clientWidth * 0.75;
    el.scrollBy({ left: direction === "left" ? -delta : delta, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollProgress(maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0);
  };

  return (
    <section id="social-showcase" className="py-24 bg-[#F7F7F3] border-b border-[#E5E5E0] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E5E0] shadow-xs mb-4">
              <Instagram className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="font-mono-meta text-xs font-semibold text-[#FF6B35] tracking-widest uppercase">
                05 / SOCIAL DESIGN & CAMPAIGNS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
              DESIGN THAT LIVES IN THE FEED.
            </h2>
          </div>

          {/* FILTER PILLS & SMOOTH NAV BUTTONS */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#E5E5E0] shadow-xs">
              {FILTER_TAGS.map((tag) => {
                const isActive = activeFilter === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-3.5 py-1.5 rounded-full font-mono-meta text-[11px] font-bold tracking-wider transition-all duration-200 ${
                      isActive
                        ? "bg-[#FF6B35] text-white shadow-xs"
                        : "text-[#707070] hover:text-[#111111] hover:bg-[#F7F7F3]"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Smooth Left / Right Scroll Controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll Left"
                className="w-11 h-11 rounded-full bg-white border border-[#E5E5E0] shadow-xs flex items-center justify-center text-[#111111] hover:bg-[#FF6B35] hover:text-white transition-all transform active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll Right"
                className="w-11 h-11 rounded-full bg-white border border-[#E5E5E0] shadow-xs flex items-center justify-center text-[#111111] hover:bg-[#FF6B35] hover:text-white transition-all transform active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* SMOOTH SCROLLING GALLERY CONTAINER */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          data-cursor="move"
          className="flex gap-6 overflow-x-auto pb-6 pt-3 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        >
          {filteredProjects.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="snap-start shrink-0 w-[290px] sm:w-[350px] md:w-[390px] bg-white border border-[#E5E5E0] rounded-3xl p-4 shadow-card hover:shadow-lift transition-all duration-300 group flex flex-col justify-between"
            >
              {/* IMAGE ASPECT RATIO CONTAINER */}
              <div className="relative w-full h-[390px] sm:h-[460px] rounded-2xl overflow-hidden bg-[#0A0A0C] mb-4 flex items-center justify-center p-2">
                
                {/* AMBIENT BACKGROUND GLOW DERIVED FROM IMAGE */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover blur-3xl opacity-40 scale-125 brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/80 via-transparent to-[#0A0A0C]/40" />
                </div>

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 420px"
                  className={`relative z-10 ${
                    item.image.includes("logo") || item.image.includes("ad-design")
                      ? "object-contain p-4 filter drop-shadow-xl"
                      : "object-cover"
                  } group-hover:scale-105 transition-transform duration-700 ease-out`}
                />

                {/* Aspect Ratio Badge */}
                <div className="absolute top-3 right-3 bg-[#111111]/85 backdrop-blur-md px-3 py-1 rounded-full font-mono-meta text-[10px] font-bold text-white tracking-wider border border-white/10 shadow-sm">
                  {item.image.includes("logo")
                    ? "LOGO & BRAND MARK"
                    : item.image.includes("ad-design")
                    ? "PROMOTIONAL AD DESIGN"
                    : idx % 2 === 0
                    ? "4:5 INSTAGRAM CAROUSEL"
                    : "1:1 AD POST"}
                </div>

                {/* HOVER OVERLAY LIGHTBOX TRIGGER */}
                <div className="absolute inset-0 bg-[#111111]/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <button
                    onClick={() => setLightboxProject(item)}
                    className="px-4 py-2.5 rounded-full bg-white text-[#111111] font-mono-meta text-xs font-bold flex items-center gap-2 shadow-xl hover:bg-[#FF6B35] hover:text-white transition-colors transform group-hover:scale-105"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>ZOOM HIGH-RES CREATIVE</span>
                  </button>
                </div>
              </div>

              {/* CARD FOOTER INFO */}
              <div className="px-1 pb-1">
                <div className="flex justify-between items-center font-mono-meta text-xs text-[#707070] mb-1.5">
                  <span className="uppercase tracking-wider font-bold text-[#FF6B35]">
                    {item.client || "CAMPAIGN DESIGN"}
                  </span>
                  <span>{item.year}</span>
                </div>

                <h3 className="font-display text-lg font-extrabold text-[#111111] group-hover:text-[#FF6B35] transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <Link
                    href={`/work/${item.slug}`}
                    className="w-7 h-7 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] flex items-center justify-center text-[#111111] group-hover:bg-[#FF6B35] group-hover:text-white transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* INTERACTIVE SMOOTH SCROLL PROGRESS BAR */}
        <div className="mt-4 w-full flex items-center justify-between gap-4 pt-4 border-t border-[#E5E5E0]">
          <span className="font-mono-meta text-[11px] text-[#707070] uppercase tracking-wider">
            SWIPE OR USE ARROWS TO NAVIGATE
          </span>

          <div className="flex-1 max-w-xs h-1.5 bg-[#E5E5E0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF6B35] transition-all duration-150 rounded-full"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>

          <div className="font-mono-meta text-xs font-bold text-[#111111]">
            {filteredProjects.length} CREATIVES
          </div>
        </div>

      </div>

      {/* FULL HIGH-RESOLUTION LIGHTBOX MODAL FOR SOCIAL CREATIVES */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#090909]/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8"
            onClick={() => setLightboxProject(null)}
          >
            {/* LIGHTBOX TOP BAR */}
            <div className="w-full max-w-6xl flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <Sparkle3D className="w-5 h-5" />
                <div>
                  <h3 className="font-display text-lg font-bold text-white uppercase">
                    {lightboxProject.title}
                  </h3>
                  <span className="font-mono-meta text-xs text-zinc-400">
                    {lightboxProject.category} • HIGH RESOLUTION CREATIVE
                  </span>
                </div>
              </div>

              <button
                onClick={() => setLightboxProject(null)}
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* LIGHTBOX MAIN PHOTO DISPLAY */}
            <div
              className="relative w-full max-w-4xl h-[70vh] my-auto flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxProject.image}
                alt={lightboxProject.title}
                fill
                quality={100}
                unoptimized
                sizes="100vw"
                className="object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* LIGHTBOX FOOTER CAPTION */}
            <div className="w-full max-w-4xl bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
              <p className="font-mono-meta text-xs text-zinc-300">
                {lightboxProject.description}
              </p>
              <Link
                href={`/work/${lightboxProject.slug}`}
                onClick={() => setLightboxProject(null)}
                className="px-5 py-2.5 rounded-xl bg-[#FF6B35] text-white font-display font-bold text-xs uppercase flex items-center gap-1.5 shadow-md hover:bg-white hover:text-[#111111] transition-colors shrink-0"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
