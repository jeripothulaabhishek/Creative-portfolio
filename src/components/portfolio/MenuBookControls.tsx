"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  LayoutGrid,
} from "lucide-react";

interface MenuBookControlsProps {
  currentPage: number;
  totalPages: number;
  isTwoPageSpread: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleFullscreen: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  zoomLevel: number;
  showThumbnails: boolean;
  onToggleThumbnails: () => void;
}

export default function MenuBookControls({
  currentPage,
  totalPages,
  isTwoPageSpread,
  onPrev,
  onNext,
  onToggleFullscreen,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  zoomLevel,
  showThumbnails,
  onToggleThumbnails,
}: MenuBookControlsProps) {
  // Format page counter text cleanly
  const getPageCounterText = () => {
    if (currentPage === 1) return "Cover (Page 1 of 5)";
    if (isTwoPageSpread) {
      if (currentPage === 2 || currentPage === 3) return "Pages 2 – 3 of 5";
      if (currentPage === 4 || currentPage === 5) return "Pages 4 – 5 of 5";
    }
    return `Page ${currentPage} of ${totalPages}`;
  };

  const isFirst = currentPage === 1;
  const isLast = isTwoPageSpread
    ? currentPage >= 4
    : currentPage === totalPages;

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-4 md:px-8 border-t border-[#E5E5E0] bg-[#FFFFFF]/70 backdrop-blur-md rounded-2xl shadow-sm select-none">
      {/* LEFT: PREV / NEXT NAVIGATION */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={isFirst}
          data-cursor="pointer"
          aria-label="Previous Page"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-meta transition-all ${
            isFirst
              ? "opacity-30 cursor-not-allowed text-[#707070]"
              : "text-[#111111] hover:bg-[#111111] hover:text-[#FFB800] active:scale-95"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* PAGE COUNTER BADGE */}
        <div className="px-3.5 py-1.5 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] text-[11px] font-mono-meta text-[#111111] font-medium tracking-tight">
          {getPageCounterText()}
        </div>

        <button
          onClick={onNext}
          disabled={isLast}
          data-cursor="pointer"
          aria-label="Next Page"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-meta transition-all ${
            isLast
              ? "opacity-30 cursor-not-allowed text-[#707070]"
              : "text-[#111111] hover:bg-[#111111] hover:text-[#FFB800] active:scale-95"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* RIGHT: SECONDARY CONTROLS (ZOOM, THUMBNAILS, FULLSCREEN) */}
      <div className="flex items-center gap-2">
        {/* ZOOM CONTROLS */}
        <div className="flex items-center gap-1 bg-[#F7F7F3] p-1 rounded-lg border border-[#E5E5E0]">
          <button
            onClick={onZoomOut}
            disabled={zoomLevel <= 1}
            data-cursor="pointer"
            aria-label="Zoom Out"
            title="Zoom Out"
            className="p-1.5 rounded text-[#111111] hover:bg-[#FFFFFF] disabled:opacity-30 transition-all"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono-meta text-[#707070] px-1 min-w-[38px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            onClick={onZoomIn}
            disabled={zoomLevel >= 2.2}
            data-cursor="pointer"
            aria-label="Zoom In"
            title="Zoom In"
            className="p-1.5 rounded text-[#111111] hover:bg-[#FFFFFF] disabled:opacity-30 transition-all"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {zoomLevel > 1 && (
            <button
              onClick={onResetZoom}
              data-cursor="pointer"
              aria-label="Reset Zoom"
              title="Reset Zoom"
              className="p-1.5 rounded text-[#FF6B35] hover:bg-[#FFFFFF] transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* THUMBNAILS TOGGLE */}
        <button
          onClick={onToggleThumbnails}
          data-cursor="pointer"
          aria-label="Toggle Thumbnails"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-meta border transition-all ${
            showThumbnails
              ? "bg-[#111111] text-[#FFB800] border-[#111111]"
              : "bg-white text-[#111111] border-[#E5E5E0] hover:border-[#111111]"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Thumbnails</span>
        </button>

        {/* FULLSCREEN */}
        <button
          onClick={onToggleFullscreen}
          data-cursor="pointer"
          aria-label="Toggle Fullscreen"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-meta bg-white text-[#111111] border border-[#E5E5E0] hover:bg-[#111111] hover:text-[#FFB800] transition-all"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Fullscreen</span>
        </button>
      </div>
    </div>
  );
}
