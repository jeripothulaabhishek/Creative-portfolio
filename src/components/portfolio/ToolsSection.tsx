"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Sparkle,
  X,
  Layers,
  CheckCircle2,
  ChevronRight,
  Zap,
  PlayCircle,
  Code2,
  Palette,
  Flame,
  ArrowUpRight,
  Cpu,
  Sparkles,
} from "lucide-react";

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  group: "DESIGN" | "DEV" | "MOTION" | "STRATEGY";
  desc: string;
  details: string;
  proficiency: number;
  experience: string;
  keyProjects: string[];
  iconUrl: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  barGradient: string;
}

const SKILLS: SkillItem[] = [
  {
    id: "capcut",
    name: "CapCut",
    category: "SHORT-FORM MOTION & REELS",
    group: "MOTION",
    desc: "Dynamic short-form video editing, auto-captioning & viral reel pacing.",
    details:
      "Keyframe animation, kinetic text overlays, speed ramping, audio sync, and high-engagement short-form video content creation for Instagram Reels, Shorts & TikTok.",
    proficiency: 100,
    experience: "3+ Years",
    keyProjects: ["TEDx ACE Promo Reels", "Rise Creative Campaign Shorts", "Client Video Ads"],
    iconUrl: "/tools/capcut-3d.jpg",
    accentBg: "bg-[#111111]/10",
    accentBorder: "border-[#111111]/30",
    accentText: "text-[#111111]",
    barGradient: "from-[#111111] to-[#333333]",
  },
  {
    id: "figma",
    name: "Figma",
    category: "UI / UX & DESIGN SYSTEMS",
    group: "DESIGN",
    desc: "Design system architecture, wireframing & interactive prototypes.",
    details:
      "Mastery over design tokens, auto-layout 5.0, component variants, and interactive prototype flows for web & mobile applications.",
    proficiency: 100,
    experience: "4+ Years",
    keyProjects: ["TEDx ACE 2026 Site", "Prime Estates Portal", "This Is It Cafe UI"],
    iconUrl: "/tools/figma-3d.png",
    accentBg: "bg-[#FFB800]/10",
    accentBorder: "border-[#FFB800]/30",
    accentText: "text-[#FFB800]",
    barGradient: "from-[#FFB800] to-[#FF6B35]",
  },
  {
    id: "photoshop",
    name: "Photoshop",
    category: "RASTER & PHOTO ART",
    group: "DESIGN",
    desc: "High-end photo manipulation, retouching & digital poster composition.",
    details:
      "Advanced frequency separation, complex masking, color grading, and hyper-realistic visual synthesis for marketing campaigns.",
    proficiency: 100,
    experience: "5+ Years",
    keyProjects: ["TEDx Speaker Key Visuals", "Kinetix Sportswear Ads", "Rise Creative Posters"],
    iconUrl: "/tools/photoshop-3d.png",
    accentBg: "bg-[#31A8FF]/10",
    accentBorder: "border-[#31A8FF]/30",
    accentText: "text-[#31A8FF]",
    barGradient: "from-[#31A8FF] to-[#0066FF]",
  },
  {
    id: "illustrator",
    name: "Illustrator",
    category: "VECTOR & LOGO MARKS",
    group: "DESIGN",
    desc: "Precision vector logo marks, typography scales & brand guidelines.",
    details:
      "Bezier curve precision, grid-aligned logo construction, brand book generation, and print-ready CMYK vector assets.",
    proficiency: 100,
    experience: "5+ Years",
    keyProjects: ["MGR Constructions Brand Identity", "Swapna Catering Visual System", "Keesari Hospital Identity"],
    iconUrl: "/tools/illustrator-3d.png",
    accentBg: "bg-[#FF6B35]/10",
    accentBorder: "border-[#FF6B35]/30",
    accentText: "text-[#FF6B35]",
    barGradient: "from-[#FF6B35] to-[#FF3B00]",
  },
  {
    id: "canva",
    name: "Canva",
    category: "RAPID SOCIAL ASSETS",
    group: "DESIGN",
    desc: "High-speed social collateral, pitch decks & template distributions.",
    details:
      "Streamlined brand kit maintenance, collaborative team templates, and high-velocity social media output.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["Swapna Catering Daily Content", "TEDx Social Carousels"],
    iconUrl: "/tools/canva-3d.png",
    accentBg: "bg-[#00C4CC]/10",
    accentBorder: "border-[#00C4CC]/30",
    accentText: "text-[#00C4CC]",
    barGradient: "from-[#00C4CC] to-[#7D2AE8]",
  },
  {
    id: "after-effects",
    name: "After Effects",
    category: "MOTION & VISUAL FX",
    group: "MOTION",
    desc: "Logo motion reveals, particle animation & promotional video assets.",
    details:
      "Complex expression scripts, 3D camera tracker integration, Lottie JSON animation exports, and fluid keyframing.",
    proficiency: 90,
    experience: "3+ Years",
    keyProjects: ["TEDx Stage Backdrop Motion", "Logo Ident Animations"],
    iconUrl: "/tools/after-effects-3d.png",
    accentBg: "bg-[#8E2DE2]/10",
    accentBorder: "border-[#8E2DE2]/30",
    accentText: "text-[#8E2DE2]",
    barGradient: "from-[#8E2DE2] to-[#4A00E0]",
  },
  {
    id: "premiere-pro",
    name: "Premiere Pro & Video",
    category: "VIDEO PRODUCTION",
    group: "MOTION",
    desc: "Timeline editing, Lumetri color grading & multi-track sound design.",
    details:
      "Narrative pacing, dialogue cleanup, multi-track audio mastering, and broadcast-ready H.264/HEVC video production.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["TEDx Keynote Recap Video", "Brand Story Documentaries"],
    iconUrl: "/tools/capcut-3d.jpg",
    accentBg: "bg-[#EA384D]/10",
    accentBorder: "border-[#EA384D]/30",
    accentText: "text-[#EA384D]",
    barGradient: "from-[#EA384D] to-[#D31027]",
  },
  {
    id: "html",
    name: "HTML5",
    category: "SEMANTIC STRUCTURE",
    group: "DEV",
    desc: "Accessible HTML5 markup, microdata & SEO structural hierarchy.",
    details:
      "WCAG 2.1 compliance, WAI-ARIA roles, schema.org structured data, and flawless document outline architecture.",
    proficiency: 100,
    experience: "4+ Years",
    keyProjects: ["All Client Web Applications"],
    iconUrl: "/tools/vscode-3d.png",
    accentBg: "bg-[#E34F26]/10",
    accentBorder: "border-[#E34F26]/30",
    accentText: "text-[#E34F26]",
    barGradient: "from-[#E34F26] to-[#F16529]",
  },
  {
    id: "css",
    name: "CSS3 & Tailwind",
    category: "MODERN STYLING",
    group: "DEV",
    desc: "Custom CSS properties, glassmorphism, flexbox & grid design systems.",
    details:
      "Container queries, CSS custom properties, GPU-accelerated keyframes, and Tailwind CSS utility architectures.",
    proficiency: 100,
    experience: "4+ Years",
    keyProjects: ["Portfolio Design Tokens", "Prime Estates UI Theme"],
    iconUrl: "/tools/vscode-3d.png",
    accentBg: "bg-[#1572B6]/10",
    accentBorder: "border-[#1572B6]/30",
    accentText: "text-[#1572B6]",
    barGradient: "from-[#19C8D8] to-[#1572B6]",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "INTERACTIVE LOGIC",
    group: "DEV",
    desc: "DOM animation loops, async data fetching & state management.",
    details:
      "ES6+ syntax, custom event dispatchers, IntersectionObservers, web workers, and smooth math interpolation.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["Dynamic Carousel Engines", "Interactive Canvas Visuals"],
    iconUrl: "/tools/vscode-3d.png",
    accentBg: "bg-[#F7DF1E]/10",
    accentBorder: "border-[#F7DF1E]/30",
    accentText: "text-[#F7DF1E]",
    barGradient: "from-[#F7DF1E] to-[#F0DB4F]",
  },
  {
    id: "react",
    name: "React",
    category: "COMPONENT SYSTEMS",
    group: "DEV",
    desc: "Reusable component libraries, custom hooks & reactive UI state.",
    details:
      "Virtual DOM optimizations, useMemo/useCallback memoization, Context API, and Framer Motion integration.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["Portfolio Web Application", "Client Dashboards"],
    iconUrl: "/tools/react-next-3d.png",
    accentBg: "bg-[#61DAFB]/10",
    accentBorder: "border-[#61DAFB]/30",
    accentText: "text-[#61DAFB]",
    barGradient: "from-[#61DAFB] to-[#00B4D8]",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "FULL-STACK WEB",
    group: "DEV",
    desc: "App Router SSR, static site generation & API route handlers.",
    details:
      "Server Components, dynamic metadata generation, image optimization, dynamic imports, and Vercel edge deployment.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["Graphic Design Portfolio", "Keesari Hospital Portal"],
    iconUrl: "/tools/react-next-3d.png",
    accentBg: "bg-[#111111]/10",
    accentBorder: "border-[#111111]/30",
    accentText: "text-[#111111]",
    barGradient: "from-[#111111] to-[#444444]",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "TYPE SAFETY",
    group: "DEV",
    desc: "Strict type definitions, generics & automated interface validation.",
    details:
      "Strict null checks, complex union generics, discriminated unions, and compile-time error elimination.",
    proficiency: 90,
    experience: "2+ Years",
    keyProjects: ["Portfolio Data Models", "Dynamic Project Routing"],
    iconUrl: "/tools/vscode-3d.png",
    accentBg: "bg-[#3178C6]/10",
    accentBorder: "border-[#3178C6]/30",
    accentText: "text-[#3178C6]",
    barGradient: "from-[#3178C6] to-[#235A97]",
  },
  {
    id: "threejs",
    name: "Three.js & WebGL",
    category: "3D WEB GRAPHICS",
    group: "DEV",
    desc: "3D scene construction, particle physics & custom shaders.",
    details:
      "WebGL canvas rendering, GLTF asset pipelines, directional lighting math, orbit controls, and smooth frame loops.",
    proficiency: 85,
    experience: "2+ Years",
    keyProjects: ["3D Hero Creative Studio Scene", "Interactive Portfolio Objects"],
    iconUrl: "/tools/palette-3d.jpg",
    accentBg: "bg-[#111111]/10",
    accentBorder: "border-[#111111]/30",
    accentText: "text-[#111111]",
    barGradient: "from-[#111111] to-[#FFB800]",
  },
  {
    id: "midjourney",
    name: "Midjourney AI",
    category: "GENERATIVE VISUALS",
    group: "STRATEGY",
    desc: "AI prompt engineering, visual concept ideation & moodboards.",
    details:
      "Advanced prompt parameters, style references (--sref), character consistency, aspect ratio manipulation, and upscale workflow.",
    proficiency: 95,
    experience: "2+ Years",
    keyProjects: ["Concept Poster Ideation", "Futuristic Visual Backgrounds"],
    iconUrl: "/tools/photoshop-3d.png",
    accentBg: "bg-[#FFB800]/10",
    accentBorder: "border-[#FFB800]/30",
    accentText: "text-[#FFB800]",
    barGradient: "from-[#FFB800] to-[#FF6B35]",
  },
  {
    id: "chatgpt-claude",
    name: "ChatGPT & Claude AI",
    category: "CREATIVE STRATEGY",
    group: "STRATEGY",
    desc: "Copywriting, brand story framing & workflow automation.",
    details:
      "Strategic prompt crafting, brand messaging refinement, content structuring, and rapid technical documentation.",
    proficiency: 100,
    experience: "3+ Years",
    keyProjects: ["TEDx Brand Narrative", "Client Case Study Copywriting"],
    iconUrl: "/tools/canva-3d.png",
    accentBg: "bg-[#10A37F]/10",
    accentBorder: "border-[#10A37F]/30",
    accentText: "text-[#10A37F]",
    barGradient: "from-[#10A37F] to-[#19C8D8]",
  },
  {
    id: "branding",
    name: "Branding Strategy",
    category: "VISUAL SYSTEMS",
    group: "STRATEGY",
    desc: "Complete visual identity creation, logo systems & brand guidelines.",
    details:
      "Positioning strategy, color theory architecture, brand tone of voice, and multi-channel asset handoff kits.",
    proficiency: 100,
    experience: "5+ Years",
    keyProjects: ["MGR Constructions", "Swapna Catering", "Rise Creative"],
    iconUrl: "/tools/illustrator-3d.png",
    accentBg: "bg-[#FFB800]/10",
    accentBorder: "border-[#FFB800]/30",
    accentText: "text-[#FFB800]",
    barGradient: "from-[#FFB800] to-[#FF6B35]",
  },
  {
    id: "motion-graphics",
    name: "Motion Direction",
    category: "VISUAL ANIMATION",
    group: "MOTION",
    desc: "Kinetic typography, animated promotional assets & video transitions.",
    details:
      "2D/3D visual rhythm, lower third graphics, social ad intros, and animated campaign teasers.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["TEDx Event Key Visuals", "Rise Creative Reels"],
    iconUrl: "/tools/capcut-3d.jpg",
    accentBg: "bg-[#111111]/10",
    accentBorder: "border-[#111111]/30",
    accentText: "text-[#111111]",
    barGradient: "from-[#111111] to-[#8E2DE2]",
  },
];

const STACK_FILTERS = [
  { id: "ALL", label: "ALL 18 SKILLS", count: 18, icon: Sparkle },
  { id: "DESIGN", label: "UI & DESIGN", count: 5, icon: Palette },
  { id: "DEV", label: "WEB DEV & CODE", count: 6, icon: Code2 },
  { id: "MOTION", label: "MOTION & REELS", count: 4, icon: PlayCircle },
  { id: "STRATEGY", label: "BRAND STRATEGY", count: 3, icon: Flame },
];

export default function ToolsSection() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const filteredSkills = SKILLS.filter((s) => {
    if (activeTab === "ALL") return true;
    return s.group === activeTab;
  });

  return (
    <section
      id="tools"
      className="relative py-28 bg-[#F7F7F3] bg-swiss-grid border-b border-[#E5E5E0] overflow-hidden"
    >
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#FFB800]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* SECTION HEADER & REFINED HORIZONTAL FILTER BAR */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E5E0] shadow-xs mb-4"
            >
              <Wrench className="w-3.5 h-3.5 text-[#111111]" />
              <span className="font-mono-meta text-xs font-bold text-[#111111] tracking-widest uppercase">
                04 / CREATIVE TECH STACK
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight"
            >
              MY CREATIVE STACK.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-[#707070] font-normal leading-relaxed max-w-xl mt-3"
            >
              18 specialized tools & production technologies engineered for visual identity, motion graphics, and responsive web products.
            </motion.p>
          </div>

          {/* ULTRA-SLEEK FILTER TAB PILLS WITH ANIMATED SLIDER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-2 bg-white/90 p-2 rounded-2xl border border-[#E5E5E0] shadow-card backdrop-blur-md self-start lg:self-end max-w-full"
          >
            {STACK_FILTERS.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono-meta text-xs font-bold tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-[#111111]"
                      : "text-[#707070] hover:text-[#111111] hover:bg-[#F7F7F3]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="stackFilterActive"
                      className="absolute inset-0 bg-[#FFB800] rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#111111] text-white"
                          : "bg-[#F7F7F3] text-[#707070]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* FLUID STAGGERED GRID SHOWCASE */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[460px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                onClick={() => setSelectedSkill(skill)}
                className="bg-white border border-[#E5E5E0] rounded-3xl p-6 shadow-card hover:shadow-2xl hover:border-[#111111] transition-all duration-300 group flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* AMBIENT CORNER GLOW ON HOVER */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FFB800]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* TOP HEADER ROW: CATEGORY + 3D GLOSSY APP ICON */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono-meta text-[10px] font-bold text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {skill.category}
                    </span>

                    {/* 3D APP ICON WITH ACCENT BORDER & SHADOW */}
                    <div
                      className={`w-14 h-14 rounded-2xl p-1.5 flex items-center justify-center border shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${skill.accentBg} ${skill.accentBorder}`}
                    >
                      <Image
                        src={skill.iconUrl}
                        alt={`${skill.name} 3D Icon`}
                        width={52}
                        height={52}
                        className="w-full h-full object-contain rounded-xl filter drop-shadow-sm"
                      />
                    </div>
                  </div>

                  {/* TOOL TITLE & DESCRIPTION */}
                  <h3 className="font-display text-xl font-extrabold text-[#111111] mb-2 tracking-tight group-hover:text-[#FFB800] transition-colors flex items-center justify-between">
                    <span>{skill.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#111111] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>

                  <p className="text-[#707070] text-xs leading-relaxed mb-6 line-clamp-2">
                    {skill.desc}
                  </p>
                </div>

                {/* BOTTOM METRICS: PROFICIENCY METER & EXPERIENCE */}
                <div className="pt-4 border-t border-[#E5E5E0] flex flex-col gap-2.5">
                  {/* ANIMATED PROFICIENCY PROGRESS BAR */}
                  <div className="w-full">
                    <div className="flex justify-between items-center text-[10px] font-mono-meta mb-1">
                      <span className="font-bold text-[#111111]">EXP: {skill.experience}</span>
                      <span className="font-bold text-[#111111]">{skill.proficiency}% PROFICIENT</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#F7F7F3] border border-[#E5E5E0] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.barGradient}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* SKILL CONTEXTUAL INSIGHT MODAL DRAWER */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111111]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg bg-white border border-[#E5E5E0] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* MODAL HEADER */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl p-2 flex items-center justify-center border shadow-sm ${selectedSkill.accentBg} ${selectedSkill.accentBorder}`}
                >
                  <Image
                    src={selectedSkill.iconUrl}
                    alt={selectedSkill.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <span className="font-mono-meta text-xs font-bold text-[#FFB800] uppercase tracking-wider block mb-0.5">
                    {selectedSkill.category}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-[#111111]">
                    {selectedSkill.name}
                  </h3>
                  <span className="font-mono-meta text-xs text-[#707070]">
                    Experience: {selectedSkill.experience} • {selectedSkill.proficiency}% Mastered
                  </span>
                </div>
              </div>

              {/* PROFICIENCY BAR IN MODAL */}
              <div className="mb-6">
                <div className="w-full h-2 bg-[#F7F7F3] border border-[#E5E5E0] rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${selectedSkill.barGradient}`}
                    style={{ width: `${selectedSkill.proficiency}%` }}
                  />
                </div>
              </div>

              {/* DETAILED TOOL DESCRIPTION */}
              <div className="mb-6 bg-[#F7F7F3] rounded-2xl p-5 border border-[#E5E5E0]">
                <h4 className="font-mono-meta text-xs font-bold text-[#111111] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>HOW I USE {selectedSkill.name.toUpperCase()}</span>
                </h4>
                <p className="text-sm text-[#707070] leading-relaxed">
                  {selectedSkill.details}
                </p>
              </div>

              {/* KEY PROJECTS BUILT WITH THIS TOOL */}
              <div className="mb-6">
                <h4 className="font-mono-meta text-xs font-bold text-[#111111] uppercase tracking-wider mb-3">
                  FEATURED WORK UTILIZING THIS TOOL
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.keyProjects.map((proj) => (
                    <span
                      key={proj}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#E5E5E0] font-mono-meta text-xs font-semibold text-[#111111] shadow-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{proj}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="pt-4 border-t border-[#E5E5E0] flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#111111] text-white font-display font-bold text-xs hover:bg-[#FFB800] hover:text-[#111111] transition-colors"
                >
                  CLOSE INSIGHTS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
