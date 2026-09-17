"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, X, ArrowUpRight, Layers, Eye, Maximize2, Film } from "lucide-react";
import { PORTFOLIO_CATEGORIES, ProjectItem } from "@/data/projects";

interface ArchiveFolderItem {
  id: string;
  name: string;
  category: string;
  year: string;
  count: number;
  color: string;
  tabColor: string;
  badge: string;
  projects: ProjectItem[];
}

export default function VisualArchive() {
  const [selectedFolder, setSelectedFolder] = useState<ArchiveFolderItem | null>(null);
  const [activePosterLightbox, setActivePosterLightbox] = useState<ProjectItem | null>(null);

  // Map portfolio data into manufactured 3D archive folders
  const brandingProjects = PORTFOLIO_CATEGORIES.find((c) => c.id === "branding")?.projects || [];
  const socialProjects = PORTFOLIO_CATEGORIES.find((c) => c.id === "social")?.projects || [];

  const FOLDERS: ArchiveFolderItem[] = [
    {
      id: "filimy-posters",
      name: "FILMY POSTERS",
      category: "CINEMA FAN ART & KEY VISUALS",
      year: "2026",
      count: PORTFOLIO_CATEGORIES.find((c) => c.id === "filimy-posters")?.projects.length || 10,
      color: "bg-[#111111] text-white border-[#333333]",
      tabColor: "bg-[#E50914] text-white",
      badge: "FAN ARTS",
      projects: PORTFOLIO_CATEGORIES.find((c) => c.id === "filimy-posters")?.projects || [],
    },
    {
      id: "tedx-ace-2026",
      name: "TEDx ACE 2026",
      category: "EVENT BRAND ECOSYSTEM",
      year: "2026",
      count: 7,
      color: "bg-white text-[#111111] border-[#E5E5E0]",
      tabColor: "bg-[#FFB800] text-[#111111]",
      badge: "FLAGSHIP",
      projects: PORTFOLIO_CATEGORIES.find((c) => c.id === "tedx-ace-2026")?.projects || [],
    },
    {
      id: "branding-social",
      name: "BRANDING & SOCIAL CAMPAIGN",
      category: "RISE MEDIA & VIDHARA CREATIVES",
      year: "2026",
      count: brandingProjects.length + socialProjects.length + 6,
      color: "bg-white text-[#111111] border-[#E5E5E0]",
      tabColor: "bg-[#19C8D8] text-white",
      badge: "CAMPAIGNS",
      projects: [...brandingProjects, ...socialProjects],
    },
    {
      id: "web",
      name: "WEB & DIGITAL EXPERIENCES",
      category: "RESPONSIVE WEBSITES & UI/UX",
      year: "2025",
      count: PORTFOLIO_CATEGORIES.find((c) => c.id === "web-showcase")?.projects.length || 3,
      color: "bg-white text-[#111111] border-[#E5E5E0]",
      tabColor: "bg-[#FFB800] text-[#111111]",
      badge: "LIVE WEBSITES",
      projects: PORTFOLIO_CATEGORIES.find((c) => c.id === "web-showcase")?.projects || [],
    },
    {
      id: "event-flyers",
      name: "EVENT FLYERS & INVITATION DESIGN",
      category: "EVENT FLYERS, POSTERS & INVITATIONS",
      year: "2026",
      count: 5,
      color: "bg-white text-[#111111] border-[#E5E5E0]",
      tabColor: "bg-[#FF6B35] text-white",
      badge: "EVENTS",
      projects: PORTFOLIO_CATEGORIES.find((c) => c.id === "ai-creative")?.projects || [],
    },
  ];

  return (
    <section id="archive" className="py-24 bg-[#F7F7F3] bg-swiss-grid border-b border-[#E5E5E0]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E5E0] shadow-xs mb-4">
            <span className="font-mono-meta text-xs font-semibold text-[#FFB800] tracking-widest uppercase">
              04 / VISUAL ARCHIVE
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
            IDEAS, FILED FOR LATER.
          </h2>
          <p className="text-[#707070] text-base max-w-xl mt-3">
            A visual archive system. Click any archive folder to pull out Filmy Posters, Fan Arts, branding assets, and web case studies.
          </p>
        </div>

        {/* 3D MANUFACTURED FOLDER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FOLDERS.map((folder, index) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setSelectedFolder(folder)}
              data-cursor="zoom"
              className="group cursor-pointer relative"
            >
              {/* Physical Cardboard Folder Container */}
              <div
                className={`relative rounded-2xl p-6 border shadow-card group-hover:shadow-lift transition-all duration-300 transform group-hover:-translate-y-2 ${folder.color}`}
              >
                {/* Folder Top Tab */}
                <div
                  className={`absolute -top-3.5 left-6 px-4 py-1 rounded-t-lg font-mono-meta text-[10px] font-bold tracking-widest uppercase shadow-xs ${folder.tabColor}`}
                >
                  {folder.badge}
                </div>

                {/* Folder Content Header */}
                <div className="flex justify-between items-start pt-2 mb-6">
                  <div>
                    <span className="font-mono-meta text-xs text-[#707070] block mb-1">
                      {folder.year} • ARCHIVE FOLDER 0{index + 1}
                    </span>
                    <h3 className="font-display text-2xl font-black tracking-tight uppercase group-hover:text-[#FFB800] transition-colors">
                      {folder.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] flex items-center justify-center text-[#111111] group-hover:bg-[#FFB800] transition-colors">
                    {folder.id === "filimy-posters" ? (
                      <Film className="w-5 h-5 text-[#E50914]" />
                    ) : (
                      <Folder className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {/* Simulated Paper Sheets inside Folder */}
                <div className="relative h-28 w-full bg-[#F7F7F3] rounded-xl border border-[#E5E5E0] p-3 overflow-hidden flex flex-col justify-between">
                  {/* Paper sheet peek */}
                  <div className="absolute -top-2 left-3 right-3 h-4 bg-white rounded-t-md border border-[#E5E5E0] opacity-80" />
                  <div className="flex justify-between items-center z-10">
                    <span className="font-mono-meta text-[11px] text-[#707070] uppercase">
                      {folder.category}
                    </span>
                    <span className="font-mono-meta text-xs font-bold px-2 py-0.5 rounded bg-white border border-[#E5E5E0] text-[#111111]">
                      {folder.count} FILES
                    </span>
                  </div>

                  <div className="flex items-center justify-between z-10 pt-4 border-t border-[#E5E5E0]">
                    <span className="font-mono-meta text-[10px] text-[#707070]">CLICK TO UNZIP</span>
                    <span className="font-mono-meta text-xs font-bold text-[#111111] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      PULL FILES <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* INTERACTIVE FOLDER ARCHIVE MODAL DRAWER */}
        <AnimatePresence>
          {selectedFolder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
              onClick={() => setSelectedFolder(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl bg-white border border-[#E5E5E0] rounded-3xl p-6 sm:p-10 shadow-2xl max-h-[85vh] overflow-y-auto my-auto"
              >
                {/* MODAL HEADER */}
                <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-xl shadow-xs ${
                      selectedFolder.id === "filimy-posters" ? "bg-[#E50914] text-white" : "bg-[#FFB800] text-[#111111]"
                    }`}>
                      0{FOLDERS.findIndex((f) => f.id === selectedFolder.id) + 1}
                    </div>
                    <div>
                      <span className="font-mono-meta text-xs text-[#707070] uppercase">
                        ARCHIVE FOLDER • {selectedFolder.year}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111111] uppercase">
                        {selectedFolder.name}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedFolder(null)}
                    className="w-10 h-10 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* ADAPTIVE POSTER / PROJECT GRID WITH NATURAL ASPECT RATIO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedFolder.projects.map((project) => {
                    const isWebProject = selectedFolder.id === "web" || Boolean(project.externalUrl);

                    return (
                      <div
                        key={project.id}
                        className="group bg-[#F7F7F3] border border-[#E5E5E0] rounded-2xl overflow-hidden hover:border-[#111111] transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* ADAPTIVE ASPECT RATIO CONTAINER - 16:9 FOR WEBSITES, 2:3 FOR POSTERS */}
                        <div className={`relative w-full ${isWebProject ? "aspect-[16/9]" : "aspect-[2/3]"} bg-[#0E0E0E] flex items-center justify-center overflow-hidden group ${isWebProject ? "" : "p-2"}`}>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            quality={95}
                            sizes="(max-width: 768px) 100vw, 400px"
                            className={`${isWebProject ? "object-cover object-top" : "object-contain filter drop-shadow-lg"} group-hover:scale-103 transition-transform duration-500`}
                          />

                          {/* FULLSCREEN LIGHTBOX / LIVE LINK OVERLAY TRIGGER */}
                          <div className="absolute inset-0 bg-[#111111]/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-3">
                            {project.externalUrl ? (
                              <a
                                href={project.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-full bg-white text-[#111111] font-mono-meta text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-[#FFB800] transition-colors"
                              >
                                <span>OPEN LIVE WEBSITE ↗</span>
                              </a>
                            ) : (
                              <button
                                onClick={() => setActivePosterLightbox(project)}
                                className="px-4 py-2 rounded-full bg-white text-[#111111] font-mono-meta text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-[#FFB800] transition-colors"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>FULL HIGH-RES VIEW</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* POSTER / WEBSITE CARD DETAILS */}
                        <div className="p-4 flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex justify-between items-center font-mono-meta text-[11px] text-[#707070] mb-1">
                              <span className="text-[#FFB800] font-bold uppercase">{project.category}</span>
                              <span>{project.year}</span>
                            </div>
                            <h4 className="font-display text-base font-bold text-[#111111] mb-1.5 line-clamp-1">
                              {project.title}
                            </h4>
                            <p className="text-[#707070] text-xs line-clamp-2 mb-3">
                              {project.subtitle || project.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#E5E5E0] flex items-center justify-between">
                            {project.externalUrl ? (
                              <a
                                href={project.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono-meta text-xs font-bold text-[#111111] hover:text-[#19C8D8] flex items-center gap-1 transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>VISIT LIVE SITE ↗</span>
                              </a>
                            ) : (
                              <button
                                onClick={() => setActivePosterLightbox(project)}
                                className="font-mono-meta text-xs font-bold text-[#111111] hover:text-[#FFB800] flex items-center gap-1 transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>ZOOM POSTER</span>
                              </button>
                            )}
                            <Link
                              href={`/work/${project.slug}`}
                              onClick={() => setSelectedFolder(null)}
                              className="w-7 h-7 rounded-full bg-white border border-[#E5E5E0] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FULL HIGH-RESOLUTION LIGHTBOX MODAL */}
        <AnimatePresence>
          {activePosterLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#090909]/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8"
              onClick={() => setActivePosterLightbox(null)}
            >
              {/* LIGHTBOX TOP HEADER */}
              <div className="w-full max-w-6xl flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#E50914] animate-pulse" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-white uppercase">
                      {activePosterLightbox.title}
                    </h3>
                    <span className="font-mono-meta text-xs text-zinc-400">
                      {activePosterLightbox.category} • 100% HIGH QUALITY ARTWORK
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActivePosterLightbox(null)}
                  className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#FFB800] hover:text-[#111111] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* LIGHTBOX FULL IMAGE CONTAINER - PRESERVES NATURAL ASPECT RATIO AT MAX QUALITY */}
              <div
                className="relative w-full max-w-5xl h-[72vh] my-auto flex items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={activePosterLightbox.image}
                  alt={activePosterLightbox.title}
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
                  {activePosterLightbox.description}
                </p>
                <Link
                  href={`/work/${activePosterLightbox.slug}`}
                  onClick={() => {
                    setActivePosterLightbox(null);
                    setSelectedFolder(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#FFB800] text-[#111111] font-display font-bold text-xs uppercase flex items-center gap-1.5 shadow-md hover:bg-white transition-colors shrink-0"
                >
                  <span>VIEW FULL DETAILS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
