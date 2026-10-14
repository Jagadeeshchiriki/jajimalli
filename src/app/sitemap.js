const siteUrl = "https://jajimalli.com";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/services/spa-salon/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services/skin-laser/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services/beauty-academy/`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
