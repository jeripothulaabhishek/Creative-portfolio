"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import Image from "next/image";

interface MenuBookFullscreenProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  totalPages: number;
  isTwoPageSpread: boolean;
  onPrev: () => void;
  onNext: () => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export default function MenuBookFullscreen({
  isOpen,
  onClose,
  currentPage,
  totalPages,
  isTwoPageSpread,
  onPrev,
  onNext,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: MenuBookFullscreenProps) {
  // Key bindings for keyboard navigation inside fullscreen
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  const isCover = currentPage === 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999990] bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8 select-none overflow-hidden"
      >
        {/* TOP BAR */}
        <div className="w-full flex items-center justify-between z-10 py-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
            <span className="text-white text-xs font-mono-meta tracking-wider uppercase">
              SWAPNA CATERING — MENU BOOK (FULLSCREEN MODE)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs font-mono-meta text-white/70 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              {isCover
                ? "Cover (Page 1)"
                : isTwoPageSpread
                ? currentPage <= 3
                  ? "Pages 2 – 3 of 5"
                  : "Pages 4 – 5 of 5"
                : `Page ${currentPage} of ${totalPages}`}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              data-cursor="pointer"
              aria-label="Exit Fullscreen"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFB800] text-[#111111] font-mono-meta text-xs font-semibold hover:bg-white transition-all"
            >
              <X className="w-4 h-4" />
              <span>Close (ESC)</span>
            </button>
          </div>
        </div>

        {/* CENTER MAIN MENU SPREAD DISPLAY */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center py-6 px-4 overflow-auto">
          {/* LEFT / RIGHT NAV OVERLAY ARROWS */}
          <button
            onClick={onPrev}
            disabled={currentPage === 1}
            data-cursor="pointer"
            aria-label="Previous Page"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-[#FFB800] hover:text-[#111111] disabled:opacity-20 transition-all backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={onNext}
            disabled={isTwoPageSpread ? currentPage >= 4 : currentPage === totalPages}
            data-cursor="pointer"
            aria-label="Next Page"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-[#FFB800] hover:text-[#111111] disabled:opacity-20 transition-all backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* SPREAD CONTAINER WITH ZOOM TRANSFORM */}
          <div
            className="relative flex items-center justify-center transition-transform duration-300 max-w-full max-h-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {isCover ? (
              /* COVER SINGLE PAGE */
              <div className="relative w-[340px] h-[480px] sm:w-[440px] sm:h-[620px] md:w-[520px] md:h-[730px] rounded-r-lg rounded-l-sm overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/catering-menu/page-1.webp"
                  alt="Swapna Catering Menu Cover"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
            ) : isTwoPageSpread ? (
              /* TWO PAGE SPREAD */
              <div className="relative flex items-center shadow-2xl rounded-lg overflow-hidden border border-white/10 bg-[#161616]">
                {/* LEFT PAGE */}
                <div className="relative w-[280px] h-[400px] sm:w-[380px] sm:h-[540px] md:w-[480px] md:h-[680px] bg-[#FAF9F5] border-r border-black/20">
                  <Image
                    src={`/catering-menu/page-${currentPage <= 3 ? 2 : 4}.webp`}
                    alt={`Menu Page ${currentPage <= 3 ? 2 : 4}`}
                    fill
                    priority
                    className="object-contain"
                    sizes="480px"
                  />
                  {/* Spine Shadow Effect */}
                  <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black/25 via-black/10 to-transparent pointer-events-none" />
                </div>

                {/* RIGHT PAGE */}
                <div className="relative w-[280px] h-[400px] sm:w-[380px] sm:h-[540px] md:w-[480px] md:h-[680px] bg-[#FAF9F5]">
                  <Image
                    src={`/catering-menu/page-${currentPage <= 3 ? 3 : 5}.webp`}
                    alt={`Menu Page ${currentPage <= 3 ? 3 : 5}`}
                    fill
                    priority
                    className="object-contain"
                    sizes="480px"
                  />
                  {/* Spine Shadow Effect */}
                  <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />
                </div>
              </div>
            ) : (
              /* SINGLE PAGE (MOBILE FALLBACK) */
              <div className="relative w-[320px] h-[460px] sm:w-[420px] sm:h-[600px] rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={`/catering-menu/page-${currentPage}.webp`}
                  alt={`Menu Page ${currentPage}`}
                  fill
                  priority
                  className="object-contain"
                  sizes="420px"
                />
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM FULLSCREEN FOOTER */}
        <div className="w-full flex items-center justify-between z-10 pt-2 border-t border-white/10 text-white/60 text-xs font-mono-meta">
          <span>Use Arrow Keys ← / → to navigate</span>

          {/* ZOOM CONTROLS IN FULLSCREEN */}
          <div className="flex items-center gap-2 bg-white/10 p-1 rounded-full px-3 border border-white/10">
            <button
              onClick={onZoomOut}
              disabled={zoomLevel <= 1}
              data-cursor="pointer"
              aria-label="Zoom Out"
              className="hover:text-white disabled:opacity-30"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-white text-[11px] font-mono-meta min-w-[36px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={onZoomIn}
              disabled={zoomLevel >= 2.2}
              data-cursor="pointer"
              aria-label="Zoom In"
              className="hover:text-white disabled:opacity-30"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={onResetZoom}
                data-cursor="pointer"
                aria-label="Reset Zoom"
                className="text-[#FF6B35] hover:text-white ml-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
