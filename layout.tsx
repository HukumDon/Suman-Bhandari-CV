import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { Providers } from "@/components/providers";
// @ts-expect-error Next.js processes this stylesheet import at build time.
import "./globals.css";

// Variable fonts: the hero name animates the weight axis of Bricolage Grotesque.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz"],
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const title = `${profile.fullName} | ${profile.headline}`;
const description = profile.intro;

const iconTypes: Record<string, string> = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
};
const photoExtension = profile.photo.src.split(".").pop()?.toLowerCase() ?? "png";
const photoIconType = iconTypes[photoExtension] ?? "image/png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.fullName}` },
  description,
  keywords: profile.keywords,
  icons: {
    icon: [{ url: profile.photo.src, type: photoIconType }],
    apple: [{ url: profile.photo.src }],
  },
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title,
    description,
    siteName: profile.fullName,
    firstName: profile.name.first,
    lastName: profile.name.last,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f3f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sameAs = profile.socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.headline,
    description,
    url: siteUrl,
    email: profile.email,
    sameAs,
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${serif.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}