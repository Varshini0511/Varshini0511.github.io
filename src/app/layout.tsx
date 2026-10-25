import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { TAB_IDS, TAB_ALIASES, DEFAULT_TAB } from "@/lib/tabs";
import TabController from "@/components/TabController";
import "./globals.css";

/**
 * Three roles, three faces:
 *  - Newsreader (serif) for headings and large numerals — editorial and
 *    measured, the register of a principal engineer rather than a template
 *  - Inter for body — the most legible workhorse at small sizes
 *  - JetBrains Mono for labels, metrics and diagrams
 *
 * To go back to a sans heading, swap Newsreader for any other face and keep
 * the --font-display variable name.
 */
const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const description = profile.summary;
const siteTitle = `${profile.name} — ${profile.title} · .NET, Azure & Applied AI`;
const siteUrl = "https://varshini0511.github.io";
/** Built from src/app/og.png/route.tsx. */
const ogImage = { url: "/og.png", width: 1200, height: 630, alt: `${profile.name} — ${profile.title}` };

/** Structured data, so search engines can show the name, role and profiles. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  worksFor: { "@type": "Organization", name: profile.currentCompany },
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: [
    "C#", ".NET", "ASP.NET Core", "Azure", "SQL Server", "Angular", "React", "Next.js",
    "Retrieval-augmented generation", "LLM agents", "Model Context Protocol", "LLM evaluation",
  ],
};

export const metadata: Metadata = {
  // Real address of the deployed site, so link previews resolve correctly.
  // Change this if you move to a custom domain.
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    ".NET", "C#", "ASP.NET Core", "Next.js", "Angular", "Azure",
    "AI Engineer", "RAG", "LLM agents", "MCP", "pgvector", "LangGraph", "Full-Stack Engineer",
    "Senior Software Engineer", "Chennai",
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    title: siteTitle,
    description,
    siteName: profile.name,
    images: [ogImage],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description,
    images: [ogImage.url],
  },
  robots: { index: true, follow: true },
};

/**
 * Runs before paint so the stored theme is applied without a flash of the
 * wrong palette. Kept inline and tiny on purpose.
 */
const themeScript = `
(function(){
  var d = document.documentElement;
  try {
    var s = localStorage.getItem('theme');
    var t = s || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    d.setAttribute('data-theme', t);
  } catch (e) {
    d.setAttribute('data-theme', 'dark');
  }
  // Choose the active tab from the URL hash before first paint, so a link like
  // /#career opens on that tab with no flash of another one.
  var tabs = ${JSON.stringify(TAB_IDS)};
  var aliases = ${JSON.stringify(TAB_ALIASES)};
  function pick() {
    var h = (window.location.hash || '').replace('#', '');
    if (aliases.hasOwnProperty(h)) return aliases[h];
    return tabs.indexOf(h) > -1 ? h : '${DEFAULT_TAB}';
  }
  d.setAttribute('data-tab', pick());
  // Switch tabs on hash changes even before React has loaded, so an early click
  // is never ignored. TabController does the same later; both are idempotent.
  window.addEventListener('hashchange', function () {
    // Only the home page has tabs; elsewhere a hash is an ordinary in-page link.
    if (window.location.pathname !== '/') return;
    var n = pick();
    if (d.getAttribute('data-tab') !== n) {
      d.setAttribute('data-tab', n);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });
  // Opts tabs in. Without this class every panel stays visible, so a script
  // failure degrades to a plain long page rather than a blank one.
  d.classList.add('js');
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
        <TabController />
        {children}
      </body>
    </html>
  );
}
