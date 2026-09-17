"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Utensils, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import MenuBookViewer from "./MenuBookViewer";
import MenuBookControls from "./MenuBookControls";
import MenuBookThumbnails from "./MenuBookThumbnails";
import MenuBookFullscreen from "./MenuBookFullscreen";

const PAGE_LABELS = [
  "Cover / Main",
  "Menu Page 2",
  "Menu Page 3",
  "Menu Page 4",
  "Thank You",
];

export default function MenuBookSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTwoPageSpread, setIsTwoPageSpread] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Monitor viewport width to switch between desktop two-page spread & mobile single-page
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsTwoPageSpread(window.innerWidth >= 1024);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = 5;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrev = () => {
    if (currentPage === 1) return;
    if (isTwoPageSpread) {
      if (currentPage >= 4) setCurrentPage(2);
      else if (currentPage <= 3) setCurrentPage(1);
    } else {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  const handleNext = () => {
    if (currentPage === 1) {
      setCurrentPage(2);
    } else if (isTwoPageSpread) {
      if (currentPage <= 3) setCurrentPage(4);
    } else {
      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(2.2, prev + 0.3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(1, prev - 0.3));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <section
      id="swapna-catering-menu"
      className="relative w-full py-20 px-4 sm:px-8 lg:px-16 bg-[#F7F7F3] text-[#111111] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* =========================================================
            01 / SECTION HEADER & EDITORIAL METADATA
           ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E5E5E0]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] text-[#FFB800] text-[11px] font-mono-meta tracking-wider uppercase">
              <Utensils className="w-3.5 h-3.5 text-[#FFB800]" />
              FEATURED PRINT & BRANDING SHOWCASE
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#111111] tracking-tight">
              SWAPNA CATERING
            </h2>

            <p className="text-base sm:text-lg text-[#707070] font-sans leading-relaxed">
              Traditional Indian catering presented as a premium, immersive digital menu book.
              Preserving original artwork fidelity with interactive 3D publication physics.
            </p>
          </div>

          {/* PROJECT METADATA GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-[#E5E5E0] shadow-sm text-left">
            <div>
              <span className="block text-[10px] font-mono-meta uppercase tracking-wider text-[#707070]">
                PROJECT
              </span>
              <span className="text-xs font-semibold text-[#111111] font-mono-meta">
                Menu Design
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-mono-meta uppercase tracking-wider text-[#707070]">
                CATEGORY
              </span>
              <span className="text-xs font-semibold text-[#111111] font-mono-meta">
                Brand / Editorial
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-mono-meta uppercase tracking-wider text-[#707070]">
                FORMAT
              </span>
              <span className="text-xs font-semibold text-[#111111] font-mono-meta">
                Digital Menu Book
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-mono-meta uppercase tracking-wider text-[#707070]">
                ARTWORK
              </span>
              <span className="text-xs font-semibold text-[#FF6B35] font-mono-meta">
                5 Pages (100% Original)
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            02 / MAIN INTERACTIVE BOOK VIEWER CONTAINER
           ========================================================= */}
        <div className="space-y-4">
          <MenuBookViewer
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isTwoPageSpread={isTwoPageSpread}
            zoomLevel={zoomLevel}
          />

          {/* MINIMAL EDITORIAL BOOK CONTROLS */}
          <MenuBookControls
            currentPage={currentPage}
            totalPages={totalPages}
            isTwoPageSpread={isTwoPageSpread}
            onPrev={handlePrev}
            onNext={handleNext}
            onToggleFullscreen={() => setIsFullscreen(true)}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
            zoomLevel={zoomLevel}
            showThumbnails={showThumbnails}
            onToggleThumbnails={() => setShowThumbnails((prev) => !prev)}
          />

          {/* OPTIONAL THUMBNAIL STRIP */}
          <AnimatePresence>
            {showThumbnails && (
              <MenuBookThumbnails
                totalPages={totalPages}
                currentPage={currentPage}
                onSelectPage={handlePageChange}
                pageLabels={PAGE_LABELS}
              />
            )}
          </AnimatePresence>
        </div>

        {/* =========================================================
            03 / CASE STUDY OVERVIEW & DESIGN CONCEPT
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10 border-t border-[#E5E5E0]">
          {/* COLUMN 1 & 2: CASE STUDY CONTENT */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-display font-bold text-[#111111]">
              Menu Design & Art Direction
            </h3>
            <p className="text-sm sm:text-base text-[#707070] leading-relaxed">
              The Swapna Catering menu design blends rich Indian visual heritage with a structured, modern editorial hierarchy.
              Deep crimson reds, warm ivory backgrounds, elegant gold filigree borders, and crisp food photography create an authentic culinary presentation for weddings, private banquets, and grand celebrations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white border border-[#E5E5E0] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold font-mono-meta text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-[#FFB800]" />
                  Visual Heritage
                </div>
                <p className="text-xs text-[#707070] leading-normal">
                  Traditional motifs paired with balanced margins and high-contrast typography.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E5E5E0] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold font-mono-meta text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-[#FFB800]" />
                  Content Hierarchy
                </div>
                <p className="text-xs text-[#707070] leading-normal">
                  Categorized courses from welcome drinks to main banquet dishes and authentic desserts.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 3: HIGHLIGHTS BADGE CARD */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E5E0] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono-meta uppercase tracking-wider text-[#FF6B35]">
                PRESENTATION HIGHLIGHTS
              </div>
              <h4 className="text-base font-bold font-display text-[#111111]">
                Award-Quality Digital Publication
              </h4>
              <ul className="space-y-2 text-xs text-[#707070] font-mono-meta">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  Exact 300 DPI Artwork Fidelity
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  Realistic 3D Page Turn & Shadows
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  Touch Swipe & Mobile Responsive
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  Distraction-Free Dark Fullscreen
                </li>
              </ul>
            </div>

            <button
              onClick={() => setIsFullscreen(true)}
              data-cursor="pointer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#111111] text-[#FFB800] text-xs font-mono-meta font-bold tracking-wide hover:bg-[#FFB800] hover:text-[#111111] transition-all"
            >
              Open Fullscreen Reader →
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODAL OVERLAY */}
      <MenuBookFullscreen
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        currentPage={currentPage}
        totalPages={totalPages}
        isTwoPageSpread={isTwoPageSpread}
        onPrev={handlePrev}
        onNext={handleNext}
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
      />
    </section>
  );
}
