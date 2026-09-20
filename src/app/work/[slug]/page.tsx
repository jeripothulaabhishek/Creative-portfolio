import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Folder } from "lucide-react";
import { PORTFOLIO_CATEGORIES, ProjectItem } from "@/data/projects";
import Navbar from "@/components/navigation/Navbar";
import ContactFooter from "@/components/portfolio/ContactFooter";
import ProjectShowcaseCarousel from "@/components/portfolio/ProjectShowcaseCarousel";

export async function generateStaticParams() {
  const allProjects: { slug: string }[] = [];
  PORTFOLIO_CATEGORIES.forEach((cat) => {
    cat.projects.forEach((proj) => {
      if (proj.slug) {
        allProjects.push({ slug: proj.slug });
      }
    });
  });
  return allProjects;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let project: ProjectItem | undefined;
  PORTFOLIO_CATEGORIES.forEach((cat) => {
    cat.projects.forEach((p) => {
      if (p.slug === slug || p.id === slug) {
        project = p;
      }
    });
  });

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const baseUrl = "https://abhishekportfolio.com";
  const canonicalUrl = `${baseUrl}/work/${project.slug}`;

  return {
    title: `${project.title} — ${project.category}`,
    description: project.subtitle || project.content?.overview || project.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} — ${project.category}`,
      description: project.subtitle || project.description,
      url: canonicalUrl,
      siteName: "Abhishek Portfolio",
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.category}`,
      description: project.subtitle || project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let targetProject: ProjectItem | undefined;
  let allProjectsList: ProjectItem[] = [];

  PORTFOLIO_CATEGORIES.forEach((cat) => {
    cat.projects.forEach((p) => {
      allProjectsList.push(p);
      if (p.slug === slug || p.id === slug) {
        targetProject = p;
      }
    });
  });

  if (!targetProject) {
    notFound();
  }

  const project = targetProject;

  // Find next project
  const currentIndex = allProjectsList.findIndex((p) => p.slug === slug || p.id === slug);
  const nextProject = allProjectsList[(currentIndex + 1) % allProjectsList.length];

  // Collect all unique showcase images
  const allShowcaseImages = [
    project.image,
    ...(project.content?.gallery || []),
  ].filter((url, idx, self) => Boolean(url) && self.indexOf(url) === idx);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://abhishekportfolio.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Work",
        "item": "https://abhishekportfolio.com/#work",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `https://abhishekportfolio.com/work/${project.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F7F7F3] text-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      {/* TOP HERO CONTAINER */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-[#E5E5E0]">
        
        {/* Back Link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono-meta text-xs font-bold text-[#707070] hover:text-[#111111] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO PORTFOLIO</span>
        </Link>

        {/* Category & Title */}
        <div className="flex flex-col items-start max-w-4xl mb-8">
          <span className="font-mono-meta text-xs font-bold text-[#FFB800] uppercase tracking-widest px-3.5 py-1 rounded-full bg-white border border-[#E5E5E0] shadow-xs mb-4">
            {project.category} • {project.year}
          </span>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#111111] leading-none mb-6">
            {project.title}
          </h1>
          <p className="text-[#707070] text-lg sm:text-xl leading-relaxed">
            {project.subtitle || project.description}
          </p>
        </div>

        {/* INTERACTIVE SHOWCASE CAROUSEL (ZERO BLACK VOIDS) */}
        <ProjectShowcaseCarousel
          images={allShowcaseImages}
          title={project.title}
          category={project.category}
        />

      </section>

      {/* BODY CONTENT GRID: STICKY SIDEBAR + EDITORIAL NARRATIVE */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: STICKY METADATA SIDEBAR */}
          <div className="lg:col-span-4 sticky top-28 bg-white border border-[#E5E5E0] rounded-3xl p-8 shadow-card flex flex-col gap-6">
            <h3 className="font-mono-meta text-xs font-bold text-[#111111] uppercase tracking-widest border-b border-[#E5E5E0] pb-4">
              PROJECT METADATA
            </h3>

            <div>
              <span className="font-mono-meta text-[11px] text-[#707070] uppercase block">CLIENT</span>
              <span className="font-display text-base font-bold text-[#111111]">{project.client || "Creative Project"}</span>
            </div>

            <div>
              <span className="font-mono-meta text-[11px] text-[#707070] uppercase block">ROLE</span>
              <span className="font-display text-base font-bold text-[#111111]">{project.role}</span>
            </div>

            <div>
              <span className="font-mono-meta text-[11px] text-[#707070] uppercase block">YEAR</span>
              <span className="font-display text-base font-bold text-[#111111]">{project.year}</span>
            </div>

            <div>
              <span className="font-mono-meta text-[11px] text-[#707070] uppercase block mb-2">DELIVERABLES</span>
              <div className="flex flex-wrap gap-1.5">
                {project.deliverables.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] text-xs font-mono-meta text-[#111111]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full bg-[#FFB800] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors text-center py-3.5 rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>{project.externalUrl.includes("vercel.app") || project.externalUrl.includes("http") ? "EXPLORE LIVE WEBSITE" : "VIEW LIVE PROJECT"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* RIGHT: NARRATIVE & HIGH-RES GALLERY */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* OVERVIEW & PROBLEM */}
            <div className="bg-white border border-[#E5E5E0] rounded-3xl p-8 shadow-xs">
              <span className="font-mono-meta text-xs font-bold text-[#E50914] uppercase tracking-wider block mb-2">
                01 / THE PROBLEM & OBJECTIVE
              </span>
              <h2 className="font-display text-2xl font-bold text-[#111111] mb-4 uppercase">
                {project.title} — CHALLENGE STATEMENT
              </h2>
              <p className="text-[#707070] text-base leading-relaxed">
                {project.content?.overview || project.description}
              </p>
            </div>

            {/* THE IDEA & THE SOLUTION */}
            {project.content && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-[#E5E5E0] rounded-3xl p-8 shadow-xs">
                  <span className="font-mono-meta text-xs font-bold text-[#FFB800] uppercase tracking-wider block mb-2">
                    02 / THE IDEA & CHALLENGE
                  </span>
                  <p className="text-[#707070] text-sm leading-relaxed">
                    {project.content.challenge}
                  </p>
                </div>

                <div className="bg-white border border-[#E5E5E0] rounded-3xl p-8 shadow-xs">
                  <span className="font-mono-meta text-xs font-bold text-[#19C8D8] uppercase tracking-wider block mb-2">
                    03 / THE EXPERIENCE & SOLUTION
                  </span>
                  <p className="text-[#707070] text-sm leading-relaxed">
                    {project.content.solution}
                  </p>
                </div>
              </div>
            )}

            {/* THE RESULT & IMPACT KEY TAKEAWAY */}
            {project.content?.keyTakeaway && (
              <div className="bg-[#111111] text-white border border-[#111111] rounded-3xl p-8 shadow-md">
                <span className="font-mono-meta text-xs font-bold text-[#FFB800] uppercase tracking-wider block mb-2">
                  04 / THE RESULT & KEY TAKEAWAY
                </span>
                <p className="text-white/90 text-base leading-relaxed font-medium">
                  "{project.content.keyTakeaway}"
                </p>
              </div>
            )}

            {/* HIGH-RES GALLERY IMAGES WITH AMBIENT BACKDROPS */}
            {project.content?.gallery && project.content.gallery.length > 0 && (
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono-meta text-xs font-bold text-[#111111] uppercase tracking-widest">
                    PROJECT GALLERY & CREATIVE ASSETS
                  </span>
                  <span className="font-mono-meta text-xs font-semibold text-[#707070]">
                    {project.content.gallery.length} ASSETS
                  </span>
                </div>

                {project.content.gallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="relative h-[380px] sm:h-[540px] lg:h-[620px] w-full rounded-3xl overflow-hidden bg-[#0C0C0E] border border-[#E5E5E0] shadow-studio group flex items-center justify-center"
                  >
                    {/* AMBIENT BACKGROUND GLOW DERIVED FROM IMAGE */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                      <Image
                        src={imgUrl}
                        alt=""
                        fill
                        className="object-cover blur-3xl opacity-35 scale-125 brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/80 via-transparent to-[#0C0C0E]/40" />
                    </div>

                    {/* MAIN IMAGE */}
                    <div className="relative z-10 w-full h-full p-4 sm:p-8 flex items-center justify-center">
                      <Image
                        src={imgUrl}
                        alt={`${project.title} gallery asset ${i + 1}`}
                        fill
                        quality={98}
                        className={`${
                          imgUrl.includes("logo") || imgUrl.includes("ad-design")
                            ? "object-contain p-4 sm:p-10 filter drop-shadow-2xl max-h-[92%]"
                            : "object-contain sm:object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* NEXT PROJECT TRIGGER */}
            <div className="pt-12 border-t border-[#E5E5E0]">
              <span className="font-mono-meta text-xs text-[#707070] uppercase block mb-3">
                UP NEXT
              </span>
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex items-center justify-between bg-white border border-[#E5E5E0] hover:border-[#111111] rounded-3xl p-8 shadow-card transition-all duration-300"
              >
                <div>
                  <span className="font-mono-meta text-xs text-[#FFB800] uppercase font-bold">
                    {nextProject.category}
                  </span>
                  <h3 className="font-display text-3xl font-extrabold text-[#111111] group-hover:text-[#FFB800] transition-colors">
                    {nextProject.title}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#111111] text-white group-hover:bg-[#FFB800] group-hover:text-[#111111] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <ContactFooter />
    </main>
  );
}
