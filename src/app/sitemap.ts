import { MetadataRoute } from "next";
import { PORTFOLIO_CATEGORIES } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abhishekportfolio.com";

  // Collect all project detail URLs statically
  const projectUrls: MetadataRoute.Sitemap = [];

  PORTFOLIO_CATEGORIES.forEach((category) => {
    category.projects.forEach((project) => {
      if (project.slug) {
        projectUrls.push({
          url: `${baseUrl}/work/${project.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    });
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectUrls,
  ];
}
