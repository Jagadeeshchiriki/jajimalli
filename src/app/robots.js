export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://jajimalli.com/sitemap.xml",
    host: "https://jajimalli.com",
  };
}
