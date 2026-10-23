import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { TAB_IDS, DEFAULT_TAB } from "@/lib/tabs";
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

const description = `${profile.title} with ${profile.yearsExperience} years building secure .NET and Next.js platforms, now building production-grade AI systems — RAG, tool-calling agents, hybrid search and multi-agent orchestration.`;

export const metadata: Metadata = {
  // Real address of the deployed site, so link previews resolve correctly.
  // Change this if you move to a custom domain.
  metadataBase: new URL("https://varshini0511.github.io"),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    ".NET", "C#", "ASP.NET Core", "Next.js", "Angular", "Azure",
    "AI Engineer", "RAG", "LLM agents", "pgvector", "LangGraph", "Full-Stack Engineer",
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.title}`,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
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
  var h = (window.location.hash || '').replace('#', '');
  d.setAttribute('data-tab', tabs.indexOf(h) > -1 ? h : '${DEFAULT_TAB}');
  // Switch tabs on hash changes even before React has loaded, so an early click
  // is never ignored. TabController does the same later; both are idempotent.
  window.addEventListener('hashchange', function () {
    var n = (window.location.hash || '').replace('#', '');
    n = tabs.indexOf(n) > -1 ? n : '${DEFAULT_TAB}';
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
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
        <TabController />
        {children}
      </body>
    </html>
  );
}
