"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
} from "lucide-react";
import { VidharaCreativeItem } from "@/data/vidharaData";

interface VidharaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  creatives: VidharaCreativeItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export default function VidharaLightbox({
  isOpen,
  onClose,
  creatives,
  currentIndex,
  onSelectIndex,
}: VidharaLightboxProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Reset zoom & pan when creative changes or lightbox opens
  useEffect(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, [currentIndex, isOpen]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, creatives.length]);

  if (!isOpen || !creatives[currentIndex]) return null;

  const activeCreative = creatives[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === creatives.length - 1;

  const handlePrev = () => {
    if (!isFirst) onSelectIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (!isLast) onSelectIndex(currentIndex + 1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(2.2, prev + 0.3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(1, prev - 0.3));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
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

  // Touch Swipe Handler for mobile viewports
  const touchStartRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartRef.current = null;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999990] bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8 select-none overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* =========================================================
            TOP HEADER BAR
           ========================================================= */}
        <div className="w-full flex items-center justify-between z-20 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
            <span className="text-white text-xs font-mono-meta tracking-wider uppercase">
              VIDHARA — {activeCreative.numberTag} / {activeCreative.category.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* COUNTER BADGE */}
            <div className="text-xs font-mono-meta text-white/80 bg-white/5 px-3.5 py-1 rounded-full border border-white/10">
              {activeCreative.numberTag} / 0{creatives.length}
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              data-cursor="pointer"
              aria-label="Close Lightbox"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFB800] text-[#111111] font-mono-meta text-xs font-semibold hover:bg-white transition-all"
            >
              <X className="w-4 h-4" />
              <span>Close (ESC)</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            CENTER CREATIVE DISPLAY WITH ZOOM TRANSFORM
           ========================================================= */}
        <div
          className="relative flex-1 w-full h-full flex items-center justify-center py-4 px-2 overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* LEFT NAV ARROW */}
          <button
            onClick={handlePrev}
            disabled={isFirst}
            data-cursor="pointer"
            aria-label="Previous Creative"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 text-white hover:bg-[#FFB800] hover:text-[#111111] disabled:opacity-20 transition-all backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* RIGHT NAV ARROW */}
          <button
            onClick={handleNext}
            disabled={isLast}
            data-cursor="pointer"
            aria-label="Next Creative"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 text-white hover:bg-[#FFB800] hover:text-[#111111] disabled:opacity-20 transition-all backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* MAIN ARTWORK FRAME (PRESERVING 4:5 ASPECT RATIO) */}
          <motion.div
            key={activeCreative.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative flex items-center justify-center transition-transform duration-200"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${
                panOffset.y / zoomLevel
              }px)`,
              cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            }}
          >
            <div className="relative w-[320px] h-[400px] sm:w-[440px] sm:h-[550px] md:w-[520px] md:h-[650px] lg:w-[580px] lg:h-[725px] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#141414]">
              <Image
                src={activeCreative.image}
                alt={activeCreative.title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 580px"
              />
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            BOTTOM CONTROL BAR & THUMBNAILS
           ========================================================= */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 z-20 pt-3 border-t border-white/10">
          {/* CAPTION & TITLE */}
          <div className="text-left space-y-0.5 max-w-sm">
            <span className="text-[11px] font-mono-meta text-[#FFB800] uppercase tracking-wider">
              {activeCreative.caption}
            </span>
            <p className="text-xs text-white/70 font-sans truncate">
              {activeCreative.description}
            </p>
          </div>

          {/* COMPACT THUMBNAIL STRIP */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto max-w-full px-2 py-1">
            {creatives.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectIndex(idx)}
                  data-cursor="pointer"
                  aria-label={`Select ${item.title}`}
                  className={`relative w-10 h-12 rounded overflow-hidden transition-all ${
                    isActive
                      ? "ring-2 ring-[#FFB800] scale-110 opacity-100"
                      : "opacity-50 hover:opacity-100 hover:scale-105 border border-white/10"
                  }`}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-0.5 right-0.5 text-[8px] font-mono-meta text-white px-0.5 bg-black/70 rounded">
                    {item.numberTag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ZOOM CONTROLS IN LIGHTBOX */}
          <div className="flex items-center gap-2 bg-white/10 p-1 rounded-full px-3 border border-white/10">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              data-cursor="pointer"
              aria-label="Zoom Out"
              className="text-white hover:text-[#FFB800] disabled:opacity-30 p-1"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-white text-[10px] font-mono-meta min-w-[34px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2.2}
              data-cursor="pointer"
              aria-label="Zoom In"
              className="text-white hover:text-[#FFB800] disabled:opacity-30 p-1"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={handleResetZoom}
                data-cursor="pointer"
                aria-label="Reset Zoom"
                className="text-[#FF6B35] hover:text-white ml-1 p-1"
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
