"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, MoveHorizontal, Sparkles, ZoomIn } from "lucide-react";

interface MenuBookViewerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isTwoPageSpread: boolean;
  zoomLevel: number;
}

export default function MenuBookViewer({
  currentPage,
  totalPages,
  onPageChange,
  isTwoPageSpread,
  zoomLevel,
}: MenuBookViewerProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Reset pan when page changes or zoom resets
  useEffect(() => {
    setPanOffset({ x: 0, y: 0 });
  }, [currentPage, zoomLevel]);

  // Handle Cover Click (Open book to page 2)
  const handleCoverClick = () => {
    if (currentPage === 1 && !isFlipping) {
      triggerFlip("next", 2);
    }
  };

  // Trigger smooth 3D page flip
  const triggerFlip = (direction: "next" | "prev", targetPage: number) => {
    if (isFlipping || targetPage === currentPage) return;
    setIsFlipping(true);
    setFlipDirection(direction);

    setTimeout(() => {
      onPageChange(targetPage);
      setIsFlipping(false);
    }, 600);
  };

  const handleNext = () => {
    if (currentPage === 1) {
      triggerFlip("next", 2);
    } else if (isTwoPageSpread) {
      if (currentPage <= 3) triggerFlip("next", 4);
    } else {
      if (currentPage < totalPages) triggerFlip("next", currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (isTwoPageSpread) {
      if (currentPage >= 4) triggerFlip("prev", 2);
      else if (currentPage <= 3) triggerFlip("prev", 1);
    } else {
      if (currentPage > 1) triggerFlip("prev", currentPage - 1);
    }
  };

  // Drag pan handlers when zoomed in
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Swipe Gesture logic for mobile
  const touchStartRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    // Minimum swipe threshold 50px
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }

    touchStartRef.current = null;
  };

  const isCover = currentPage === 1;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full min-h-[520px] md:min-h-[680px] lg:min-h-[760px] flex flex-col items-center justify-center p-2 sm:p-6 md:p-10 select-none overflow-hidden rounded-3xl bg-[#F6F5EE] border border-[#E8E6DC] shadow-[inset_0_2px_12px_rgba(0,0,0,0.03)]"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(246,245,238,0.9) 100%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23111111' fill-opacity='0.015' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {/* BACKGROUND DECORATIVE PAPER EMBOSSING / SHADOW */}
      <div className="absolute inset-0 pointer-events-none bg-swiss-grid opacity-30" />

      {/* ZOOM CONTAINER */}
      <div
        className="relative transition-transform duration-300 ease-out flex items-center justify-center"
        style={{
          transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${
            panOffset.y / zoomLevel
          }px)`,
          cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
        }}
      >
        {/* =========================================================
            STATE A: FRONT COVER EXPERIENCE (CLOSED BOOK)
           ========================================================= */}
        {isCover && (
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center cursor-pointer group"
            onClick={handleCoverClick}
            data-cursor="pointer"
          >
            {/* FRONT COVER BOOK CONTAINER */}
            <div className="relative w-[320px] h-[460px] sm:w-[420px] sm:h-[600px] md:w-[480px] md:h-[680px] rounded-r-2xl rounded-l-md bg-white shadow-[0_25px_60px_-15px_rgba(40,20,0,0.22)] border border-[#E0DBD0] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_35px_70px_-15px_rgba(40,20,0,0.28)] overflow-hidden">
              {/* Spine Elevation Shadow (Left edge) */}
              <div className="absolute top-0 left-0 bottom-0 w-6 z-20 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none rounded-l-md" />
              <div className="absolute top-0 left-6 bottom-0 w-[1px] z-20 bg-black/15 pointer-events-none" />

              {/* COVER ARTWORK IMAGE */}
              <div className="relative w-full h-full">
                <Image
                  src="/catering-menu/page-1.webp"
                  alt="Swapna Catering Menu Cover"
                  fill
                  priority
                  className="object-contain p-1"
                  sizes="(max-width: 768px) 320px, 480px"
                />
              </div>

              {/* Subtle Paper Texture Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10 pointer-events-none" />

              {/* Interactive Cover Badge Overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111]/90 text-white backdrop-blur-md border border-[#FFB800]/40 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:bg-[#111111]">
                <BookOpen className="w-4 h-4 text-[#FFB800] animate-bounce" />
                <span className="text-xs font-mono-meta tracking-wider uppercase text-[#FFF9C4]">
                  Click Cover to Open Menu →
                </span>
              </div>
            </div>

            {/* Instruction Below Cover */}
            <div className="mt-6 flex items-center gap-2 text-xs font-mono-meta text-[#707070] tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Click or tap the cover artwork to flip open</span>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            STATE B: TWO-PAGE SPREAD EXPERIENCE (DESKTOP)
           ========================================================= */}
        {!isCover && isTwoPageSpread && (
          <div className="relative flex items-center justify-center [perspective:2200px]">
            {/* PHYSICAL BOOK BOUND SPREAD CONTAINER */}
            <div className="relative flex items-center bg-[#FAF9F4] rounded-2xl shadow-[0_30px_70px_-20px_rgba(20,10,0,0.22)] border border-[#E3DFD5] overflow-hidden">
              {/* CENTRAL BOOK SPINE CREASE SHADOW */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 z-30 pointer-events-none bg-gradient-to-r from-transparent via-black/20 to-transparent" />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] z-30 pointer-events-none bg-black/20" />

              {/* LEFT PAGE (PAGE 2 OR PAGE 4) */}
              <div
                onClick={handlePrev}
                data-cursor="pointer"
                title="Click left page to go back"
                className="relative w-[300px] h-[430px] sm:w-[400px] sm:h-[570px] md:w-[480px] md:h-[680px] bg-[#FAF9F5] cursor-pointer group border-r border-[#E8E4D8] overflow-hidden"
              >
                <Image
                  src={`/catering-menu/page-${currentPage <= 3 ? 2 : 4}.webp`}
                  alt={`Menu Page ${currentPage <= 3 ? 2 : 4}`}
                  fill
                  priority
                  className="object-contain p-1"
                  sizes="480px"
                />
                {/* Left Page Hover Edge Glow */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#FFB800]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* RIGHT PAGE (PAGE 3 OR PAGE 5) */}
              <div
                onClick={handleNext}
                data-cursor="pointer"
                title="Click right page to turn next"
                className="relative w-[300px] h-[430px] sm:w-[400px] sm:h-[570px] md:w-[480px] md:h-[680px] bg-[#FAF9F5] cursor-pointer group overflow-hidden"
              >
                <Image
                  src={`/catering-menu/page-${currentPage <= 3 ? 3 : 5}.webp`}
                  alt={`Menu Page ${currentPage <= 3 ? 3 : 5}`}
                  fill
                  priority
                  className="object-contain p-1"
                  sizes="480px"
                />
                {/* Right Page Hover Edge Glow */}
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#FFB800]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* 3D PAGE FLIP ANIMATION OVERLAY LAYER */}
              {isFlipping && (
                <motion.div
                  initial={{ rotateY: flipDirection === "next" ? 0 : -180 }}
                  animate={{ rotateY: flipDirection === "next" ? -180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
                  className="absolute top-0 bottom-0 left-1/2 w-1/2 z-40 bg-[#F5F3EB] shadow-2xl origin-left [transform-style:preserve-3d] border-l border-black/10 overflow-hidden"
                >
                  {/* Front Side of Turning Page */}
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <Image
                      src={`/catering-menu/page-${
                        flipDirection === "next"
                          ? currentPage <= 3
                            ? 3
                            : 5
                          : currentPage <= 3
                          ? 2
                          : 4
                      }.webp`}
                      alt="Flipping page"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/10 pointer-events-none" />
                  </div>

                  {/* Back Side of Turning Page */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <Image
                      src={`/catering-menu/page-${
                        flipDirection === "next" ? 4 : 3
                      }.webp`}
                      alt="Flipping page back"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 pointer-events-none" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            STATE C: SINGLE-PAGE MOBILE / TABLET VIEW (<1024px)
           ========================================================= */}
        {!isCover && !isTwoPageSpread && (
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative w-[310px] h-[450px] sm:w-[380px] sm:h-[540px] bg-[#FAF9F5] rounded-xl shadow-[0_20px_50px_-10px_rgba(20,10,0,0.18)] border border-[#E3DFD5] overflow-hidden">
              <Image
                src={`/catering-menu/page-${currentPage}.webp`}
                alt={`Menu Page ${currentPage}`}
                fill
                priority
                className="object-contain p-1"
                sizes="380px"
              />

              {/* Edge Click Hotspots */}
              <div
                onClick={handlePrev}
                className="absolute left-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer"
                aria-label="Previous Page"
              />
              <div
                onClick={handleNext}
                className="absolute right-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer"
                aria-label="Next Page"
              />
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono-meta text-[#707070]">
              <MoveHorizontal className="w-3.5 h-3.5" />
              <span>Swipe or tap left/right edge to turn pages</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
