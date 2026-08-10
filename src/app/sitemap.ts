import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gvvb.fr";
  const pages = [
    { url: "/", priority: 1.0 },
    { url: "/le-club", priority: 0.8 },
    { url: "/equipes", priority: 0.8 },
    { url: "/entrainements", priority: 0.7 },
    { url: "/calendrier", priority: 0.7 },
    { url: "/inscription", priority: 0.9 },
    { url: "/contact", priority: 0.6 },
  ];
  return pages.map(({ url, priority }) => ({
    url: `${base}${url}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
