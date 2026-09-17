"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface MenuBookThumbnailsProps {
  totalPages: number;
  currentPage: number;
  onSelectPage: (page: number) => void;
  pageLabels: string[];
}

export default function MenuBookThumbnails({
  totalPages,
  currentPage,
  onSelectPage,
  pageLabels,
}: MenuBookThumbnailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="w-full flex flex-col items-center justify-center pt-4 pb-2 select-none"
    >
      <div className="text-[11px] font-mono-meta tracking-wider uppercase text-[#707070] mb-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
        Page Navigation
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-4 overflow-x-auto max-w-full px-4 py-2 no-scrollbar">
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNum = index + 1;
          const isActive =
            currentPage === pageNum ||
            (currentPage > 1 &&
              currentPage % 2 === 0 &&
              (pageNum === currentPage || pageNum === currentPage + 1)) ||
            (currentPage > 1 &&
              currentPage % 2 === 1 &&
              (pageNum === currentPage || pageNum === currentPage - 1));

          return (
            <button
              key={pageNum}
              onClick={() => onSelectPage(pageNum)}
              data-cursor="pointer"
              aria-label={`Jump to ${pageLabels[index] || `Page ${pageNum}`}`}
              className={`group relative flex flex-col items-center focus:outline-none transition-all duration-300 ${
                isActive ? "scale-105" : "opacity-70 hover:opacity-100 hover:scale-102"
              }`}
            >
              {/* Thumbnail Frame */}
              <div
                className={`relative w-14 h-20 md:w-20 md:h-28 rounded-md overflow-hidden bg-white transition-all duration-300 ${
                  isActive
                    ? "ring-2 ring-[#FFB800] ring-offset-2 shadow-lg"
                    : "border border-[#E5E5E0] shadow-sm group-hover:border-[#FFB800]/60"
                }`}
              >
                <Image
                  src={`/catering-menu/page-${pageNum}-thumb.webp`}
                  alt={`Menu Page ${pageNum}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 56px, 80px"
                />

                {/* Number Badge */}
                <div
                  className={`absolute bottom-1 right-1 text-[9px] font-mono-meta px-1 rounded transition-colors ${
                    isActive
                      ? "bg-[#111111] text-[#FFB800]"
                      : "bg-[#111111]/70 text-white group-hover:bg-[#111111]"
                  }`}
                >
                  P.{pageNum}
                </div>
              </div>

              {/* Label */}
              <span
                className={`mt-1.5 text-[10px] font-mono-meta tracking-tight transition-colors ${
                  isActive ? "text-[#111111] font-semibold" : "text-[#707070]"
                }`}
              >
                {pageLabels[index] || `Page ${pageNum}`}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
