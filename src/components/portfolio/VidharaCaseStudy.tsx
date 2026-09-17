"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers, Eye } from "lucide-react";
import {
  VIDHARA_CREATIVES,
  VIDHARA_CASE_STUDY_META,
  VidharaCreativeItem,
} from "@/data/vidharaData";
import VidharaLightbox from "./VidharaLightbox";

export default function VidharaCaseStudy() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["ALL", "CAMPAIGN", "SOCIAL", "BRAND", "CULTURAL"];

  const filteredCreatives =
    selectedCategory === "ALL"
      ? VIDHARA_CREATIVES
      : VIDHARA_CREATIVES.filter(
          (c) => c.category.toUpperCase() === selectedCategory
        );

  const handleOpenLightbox = (creativeId: number) => {
    const index = VIDHARA_CREATIVES.findIndex((c) => c.id === creativeId);
    if (index !== -1) setLightboxIndex(index);
  };

  // Featured Creative (Creative #1 or configurable)
  const featuredCreative = VIDHARA_CREATIVES[0];

  return (
    <section
      id="vidhara-case-study"
      className="relative w-full py-24 px-4 sm:px-8 lg:px-16 bg-[#F7F7F3] text-[#111111] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* =========================================================
            01 / SOPHISTICATED EDITORIAL CASE STUDY HERO HEADER
           ========================================================= */}
        <div className="space-y-6 pb-10 border-b border-[#E5E5E0]">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] text-[#FFB800] text-[11px] font-mono-meta tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            {VIDHARA_CASE_STUDY_META.title}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#111111] tracking-tight">
                {VIDHARA_CASE_STUDY_META.heading}
              </h2>
              <p className="text-base sm:text-lg text-[#707070] font-sans leading-relaxed max-w-2xl">
                {VIDHARA_CASE_STUDY_META.supportingText}
              </p>
            </div>

            {/* MINIMAL METADATA ROW */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-[#E5E5E0] shadow-sm">
              <div>
                <span className="block text-[10px] font-mono-meta uppercase tracking-wider text-[#707070]">
                  ROLE
                </span>
                <span className="text-xs font-semibold text-[#111111] font-mono-meta">
                  {VIDHARA_CASE_STUDY_META.role}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono-meta uppercase tracking-wider text-[#707070]">
                  CATEGORY
                </span>
                <span className="text-xs font-semibold text-[#111111] font-mono-meta">
                  {VIDHARA_CASE_STUDY_META.category}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono-meta uppercase tracking-wider text-[#707070]">
                  DELIVERABLES
                </span>
                <span className="text-[11px] font-semibold text-[#FF6B35] font-mono-meta truncate block">
                  Instagram & Brand
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            02 / MINIMAL CATEGORY FILTER BAR
           ========================================================= */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-cursor="pointer"
                className={`px-4 py-1.5 rounded-full text-xs font-mono-meta transition-all ${
                  selectedCategory === cat
                    ? "bg-[#111111] text-[#FFB800] shadow-sm"
                    : "bg-white text-[#707070] border border-[#E5E5E0] hover:text-[#111111] hover:border-[#111111]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono-meta text-[#707070]">
            Showing {filteredCreatives.length} of {VIDHARA_CREATIVES.length} Creatives
          </div>
        </div>

        {/* =========================================================
            03 / CURATED EDITORIAL CREATIVE GALLERY
           ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCreatives.map((creative, index) => {
              // Asymmetric grid spanning logic for desktop editorial feel
              const isLargeCard = index === 0;

              return (
                <motion.div
                  key={creative.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleOpenLightbox(creative.id)}
                  data-cursor="pointer"
                  className={`group relative rounded-2xl overflow-hidden bg-white border border-[#E5E5E0] shadow-sm transition-all duration-500 cursor-pointer ${
                    isLargeCard ? "sm:col-span-2 lg:col-span-2" : "col-span-1"
                  } hover:-translate-y-1.5 hover:shadow-xl hover:border-[#FFB800]/60`}
                >
                  {/* CARD IMAGE CONTAINER PRESERVING 4:5 ASPECT RATIO */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#FAF9F6]">
                    <Image
                      src={creative.image}
                      alt={creative.title}
                      fill
                      priority={index < 3}
                      className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* SUBTLE OVERLAY & NUMBER BADGE ON HOVER */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none p-6 flex flex-col justify-between">
                      {/* TOP BADGE */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded bg-[#FFB800] text-[#111111] text-[10px] font-mono-meta font-bold">
                          {creative.numberTag}
                        </span>
                        <span className="text-white text-[11px] font-mono-meta tracking-wider uppercase">
                          {creative.category}
                        </span>
                      </div>

                      {/* BOTTOM CTA REVEAL */}
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <span className="block text-xs font-mono-meta text-[#FFB800]">
                            SOCIAL CREATIVE
                          </span>
                          <span className="text-sm font-bold font-display text-white">
                            {creative.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-mono-meta text-[#FFB800]">
                          <span>View</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STATIC MINIMAL FOOTER CAPTION */}
                  <div className="p-4 flex items-center justify-between border-t border-[#E5E5E0] bg-white">
                    <div>
                      <span className="text-[10px] font-mono-meta uppercase tracking-wider text-[#707070]">
                        {creative.numberTag} / {creative.category}
                      </span>
                      <h4 className="text-xs font-bold font-mono-meta text-[#111111] truncate max-w-[200px]">
                        {creative.title}
                      </h4>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-[#FFB800] transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* =========================================================
            04 / CASE STUDY STORY — VISUAL DIRECTION
           ========================================================= */}
        <div className="pt-12 border-t border-[#E5E5E0] space-y-8">
          <div className="max-w-2xl space-y-3">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#111111]">
              {VIDHARA_CASE_STUDY_META.visualDirection.heading}
            </h3>
            <p className="text-sm sm:text-base text-[#707070] font-sans leading-relaxed">
              {VIDHARA_CASE_STUDY_META.visualDirection.body}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDHARA_CASE_STUDY_META.visualDirection.points.map((point) => (
              <div
                key={point.number}
                className="p-6 rounded-2xl bg-white border border-[#E5E5E0] shadow-sm space-y-3"
              >
                <div className="text-xs font-mono-meta text-[#FF6B35] font-bold">
                  {point.number}
                </div>
                <h4 className="text-sm font-bold font-mono-meta text-[#111111]">
                  {point.title}
                </h4>
                <p className="text-xs text-[#707070] font-sans leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            05 / SELECTED CREATIVE FEATURE SPOTLIGHT
           ========================================================= */}
        <div className="pt-8">
          <div className="p-8 md:p-12 rounded-3xl bg-white border border-[#E5E5E0] shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5E0] pb-6">
              <div>
                <span className="text-[11px] font-mono-meta text-[#FF6B35] uppercase tracking-widest">
                  SPOTLIGHT FEATURE
                </span>
                <h3 className="text-2xl font-display font-bold text-[#111111]">
                  Selected Work
                </h3>
              </div>
              <button
                onClick={() => handleOpenLightbox(featuredCreative.id)}
                data-cursor="pointer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] text-[#FFB800] text-xs font-mono-meta font-bold hover:bg-[#FFB800] hover:text-[#111111] transition-all"
              >
                <span>Inspect Spotlight Item</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* LARGE FEATURED CREATIVE FRAME */}
              <div
                onClick={() => handleOpenLightbox(featuredCreative.id)}
                data-cursor="pointer"
                className="lg:col-span-6 relative aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden bg-[#FAF9F5] border border-[#E5E5E0] shadow-lg group cursor-pointer"
              >
                <Image
                  src={featuredCreative.image}
                  alt={featuredCreative.title}
                  fill
                  className="object-contain p-2 group-hover:scale-102 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <span className="px-4 py-2 rounded-full bg-[#111111]/90 text-[#FFB800] font-mono-meta text-xs">
                    Click to Open Fullscreen →
                  </span>
                </div>
              </div>

              {/* SPOTLIGHT DETAILS */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="space-y-2">
                  <span className="text-xs font-mono-meta text-[#707070] uppercase">
                    Vidhara · Social Media Creative
                  </span>
                  <h4 className="text-2xl font-display font-bold text-[#111111]">
                    {featuredCreative.title}
                  </h4>
                  <p className="text-sm text-[#707070] leading-relaxed font-sans">
                    {featuredCreative.description} Designed for high-impact social media feeds with strong typographical rhythm and artistic framing.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#E5E5E0]">
                  <div className="flex items-center justify-between text-xs font-mono-meta">
                    <span className="text-[#707070]">Aspect Ratio</span>
                    <span className="font-bold text-[#111111]">4:5 (1080 × 1350 px)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono-meta">
                    <span className="text-[#707070]">Format</span>
                    <span className="font-bold text-[#111111]">WebP High Definition</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono-meta">
                    <span className="text-[#707070]">Platform Target</span>
                    <span className="font-bold text-[#FF6B35]">Instagram / Digital Campaign</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX COMPONENT */}
      {lightboxIndex !== null && (
        <VidharaLightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          creatives={VIDHARA_CREATIVES}
          currentIndex={lightboxIndex}
          onSelectIndex={(index) => setLightboxIndex(index)}
        />
      )}
    </section>
  );
}
