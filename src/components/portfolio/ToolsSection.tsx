"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Sparkle,
  X,
  CheckCircle2,
  Code2,
  Palette,
  PlayCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  group: "DESIGN" | "DEV" | "MOTION";
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
    id: "figma",
    name: "Figma",
    category: "UI / UX & DESIGN SYSTEMS",
    group: "DESIGN",
    desc: "Design system architecture, wireframing & interactive prototypes.",
    details:
      "Mastery over design tokens, auto-layout 5.0, component variants, and interactive prototype flows for web & mobile applications.",
    proficiency: 95,
    experience: "2+ Yrs",
    keyProjects: ["TEDx ACE 2026 Site", "Rise Creative Identity", "Vidhara Social Kit"],
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
    proficiency: 95,
    experience: "2+ Yrs",
    keyProjects: ["TEDx Speaker Key Visuals", "Vidhara Campaign Creatives", "Rise Creative Posters"],
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
      "Bezier curve precision, grid-aligned logo construction, brand book generation, and print-ready vector assets.",
    proficiency: 95,
    experience: "2+ Yrs",
    keyProjects: ["Swapna Catering Visual System", "RISE Creative Brand Mark", "TEDx Event Identity"],
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
      "Streamlined brand kit maintenance, team templates, and high-velocity social media output.",
    proficiency: 90,
    experience: "2+ Yrs",
    keyProjects: ["Swapna Catering Content", "TEDx Social Carousels"],
    iconUrl: "/tools/canva-3d.png",
    accentBg: "bg-[#00C4CC]/10",
    accentBorder: "border-[#00C4CC]/30",
    accentText: "text-[#00C4CC]",
    barGradient: "from-[#00C4CC] to-[#7D2AE8]",
  },
  {
    id: "branding",
    name: "Branding Strategy",
    category: "VISUAL SYSTEMS",
    group: "DESIGN",
    desc: "Complete visual identity creation, logo systems & brand guidelines.",
    details:
      "Positioning strategy, color theory architecture, brand tone of voice, and multi-channel asset handoff kits.",
    proficiency: 95,
    experience: "2+ Yrs",
    keyProjects: ["Swapna Catering", "Rise Creative", "TEDx ACE 2026"],
    iconUrl: "/tools/palette-3d.jpg",
    accentBg: "bg-[#FFB800]/10",
    accentBorder: "border-[#FFB800]/30",
    accentText: "text-[#FFB800]",
    barGradient: "from-[#FFB800] to-[#FF6B35]",
  },
  {
    id: "capcut",
    name: "CapCut",
    category: "SHORT-FORM MOTION & REELS",
    group: "MOTION",
    desc: "Dynamic short-form video editing, auto-captioning & viral reel pacing.",
    details:
      "Keyframe animation, kinetic text overlays, speed ramping, audio sync, and high-engagement short-form video content creation for Instagram Reels & Shorts.",
    proficiency: 95,
    experience: "2+ Yrs",
    keyProjects: ["TEDx ACE Promo Reels", "Rise Creative Campaign Shorts"],
    iconUrl: "/tools/capcut-3d.jpg",
    accentBg: "bg-[#111111]/10",
    accentBorder: "border-[#111111]/30",
    accentText: "text-[#111111]",
    barGradient: "from-[#111111] to-[#333333]",
  },
  {
    id: "html",
    name: "HTML5",
    category: "SEMANTIC STRUCTURE",
    group: "DEV",
    desc: "Accessible HTML5 markup, microdata & SEO structural hierarchy.",
    details:
      "WCAG 2.1 compliance, WAI-ARIA roles, schema.org structured data, and document outline architecture.",
    proficiency: 95,
    experience: "2+ Yrs",
    keyProjects: ["Portfolio Web Application", "Client Web Experiences"],
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
      "CSS custom properties, keyframes, responsive layouts, and Tailwind CSS utility architectures.",
    proficiency: 95,
    experience: "2+ Yrs",
    keyProjects: ["Portfolio Design Tokens", "Interactive Custom Components"],
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
      "ES6+ syntax, custom event dispatchers, IntersectionObservers, and smooth math interpolation.",
    proficiency: 90,
    experience: "2+ Yrs",
    keyProjects: ["Dynamic Carousel Engines", "3D Interactive Components"],
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
    proficiency: 90,
    experience: "2+ Yrs",
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
    proficiency: 90,
    experience: "2+ Yrs",
    keyProjects: ["Graphic Design Portfolio", "Kinetix Digital Platform"],
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
    proficiency: 88,
    experience: "2+ Yrs",
    keyProjects: ["Portfolio Data Models", "Dynamic Project Routing"],
    iconUrl: "/tools/vscode-3d.png",
    accentBg: "bg-[#3178C6]/10",
    accentBorder: "border-[#3178C6]/30",
    accentText: "text-[#3178C6]",
    barGradient: "from-[#3178C6] to-[#235A97]",
  },
];

const STACK_FILTERS = [
  { id: "ALL", label: "ALL 12 SKILLS", count: 12, icon: Sparkle },
  { id: "DESIGN", label: "UI & BRAND DESIGN", count: 5, icon: Palette },
  { id: "DEV", label: "FRONTEND & WEB DEV", count: 6, icon: Code2 },
  { id: "MOTION", label: "CONTENT & REELS", count: 1, icon: PlayCircle },
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
      className="relative py-24 bg-[#F7F7F3] bg-swiss-grid border-b border-[#E5E5E0] overflow-hidden select-none"
    >
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FFB800]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* SECTION HEADER & SLEEK SINGLE-ROW FILTER BAR */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
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
              12 core design & web development tools engineered for visual identity, digital graphics, and responsive web products.
            </motion.p>
          </div>

          {/* SINGLE-LINE SLEEK FILTER TABS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#E5E5E0] shadow-xs max-w-full overflow-x-auto no-scrollbar self-start lg:self-end"
          >
            {STACK_FILTERS.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  data-cursor="pointer"
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-mono-meta text-[11px] font-bold tracking-wider transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-[#111111]"
                      : "text-[#707070] hover:text-[#111111] hover:bg-[#F7F7F3]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="stackFilterActive"
                      className="absolute inset-0 bg-[#FFB800] rounded-full shadow-xs"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono-meta font-extrabold ${
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

        {/* FLUID GRID SHOWCASE */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[420px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -10 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                onClick={() => setSelectedSkill(skill)}
                data-cursor="pointer"
                className="bg-white border border-[#E5E5E0] rounded-3xl p-6 shadow-card hover:shadow-xl hover:border-[#111111] transition-all duration-300 group flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                <div>
                  {/* TOP HEADER ROW: CATEGORY + 3D APP ICON */}
                  <div className="flex justify-between items-start mb-5 gap-2">
                    <span className="font-mono-meta text-[10px] font-bold text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/30 px-2.5 py-1 rounded-full uppercase tracking-wider truncate max-w-[70%]">
                      {skill.category}
                    </span>

                    <div
                      className={`w-13 h-13 shrink-0 rounded-2xl p-1.5 flex items-center justify-center border shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${skill.accentBg} ${skill.accentBorder}`}
                    >
                      <Image
                        src={skill.iconUrl}
                        alt={`${skill.name} Icon`}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                  </div>

                  {/* TOOL TITLE & DESCRIPTION */}
                  <h3 className="font-display text-xl font-extrabold text-[#111111] mb-2 tracking-tight group-hover:text-[#FFB800] transition-colors flex items-center justify-between">
                    <span>{skill.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#111111] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </h3>

                  <p className="text-[#707070] text-xs leading-relaxed mb-5 line-clamp-2">
                    {skill.desc}
                  </p>
                </div>

                {/* BOTTOM METRICS */}
                <div className="pt-4 border-t border-[#E5E5E0] flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[11px] font-mono-meta whitespace-nowrap">
                    <span className="font-bold text-[#707070] uppercase">EXP: {skill.experience}</span>
                    <span className="font-extrabold text-[#111111]">{skill.proficiency}% PROFICIENT</span>
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* SKILL INSIGHT MODAL */}
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
              <button
                onClick={() => setSelectedSkill(null)}
                data-cursor="pointer"
                className="absolute top-6 right-6 p-2 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

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
                    Experience: {selectedSkill.experience} • {selectedSkill.proficiency}% Proficient
                  </span>
                </div>
              </div>

              <div className="mb-6 bg-[#F7F7F3] rounded-2xl p-5 border border-[#E5E5E0]">
                <h4 className="font-mono-meta text-xs font-bold text-[#111111] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>HOW I USE {selectedSkill.name.toUpperCase()}</span>
                </h4>
                <p className="text-sm text-[#707070] leading-relaxed font-sans">
                  {selectedSkill.details}
                </p>
              </div>

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

              <div className="pt-4 border-t border-[#E5E5E0] flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  data-cursor="pointer"
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
