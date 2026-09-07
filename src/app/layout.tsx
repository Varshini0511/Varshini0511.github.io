import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description = `${profile.title} with ${profile.yearsExperience} years building secure .NET and Next.js platforms, now building production-grade AI systems — RAG, tool-calling agents, hybrid search and multi-agent orchestration.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://varchini.dev"),
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
  try {
    var s = localStorage.getItem('theme');
    var t = s || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
