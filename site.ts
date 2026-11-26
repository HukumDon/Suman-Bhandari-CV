/**
 * Canonical site URL used for metadata, sitemap and social previews.
 * Priority: NEXT_PUBLIC_SITE_URL, then Vercel's production domain, then localhost.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) return `https://${vercelProduction}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
