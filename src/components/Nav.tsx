"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun, Github, Linkedin, Menu, X, FileText } from "lucide-react";
import { profile } from "@/data/profile";
import { TABS, tabFromHash } from "@/lib/tabs";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [open, setOpen] = useState(false);
  const [hashTab, setHashTab] = useState<string>("");
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");

    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      // Reading progress, written straight to the DOM so scrolling never re-renders.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty("--progress", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The active tab comes from the URL hash, not from scroll position.
  useEffect(() => {
    const read = () => setHashTab(tabFromHash(window.location.hash));
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [pathname]);

  // On a project page no tab is active.
  const active = pathname === "/" ? hashTab : "";

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the in-memory toggle still works */
    }
  };

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b bg-[var(--bg)]/90 backdrop-blur-lg" : "border-b border-transparent"
      }`}
    >
      <div ref={progress} className="scroll-progress" aria-hidden />
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Plain anchors on purpose: a tab link is a hash change, not a router navigation. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#overview" className="group flex items-center gap-2.5 text-sm font-medium tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md border border-[var(--accent-line)] bg-[var(--accent-soft)] font-mono text-[11px] font-semibold text-[var(--accent)]">
            VK
          </span>
          <span className="hidden text-[var(--text)] sm:inline">{profile.name}</span>
        </a>

        <div role="tablist" aria-label="Sections" className="hidden items-center gap-0.5 lg:flex">
          {TABS.map((t) => {
            const isActive = active === t.id;
            return (
              <a
                key={t.id}
                href={`/#${t.id}`}
                role="tab"
                aria-selected={isActive}
                className={`relative rounded-md px-3 py-2 text-[0.92rem] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)] ${
                  isActive ? "text-[var(--text)]" : "text-[var(--muted)]"
                }`}
              >
                {t.label}
                {isActive && <span className="absolute inset-x-3 -bottom-px h-px bg-[var(--accent)]" />}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <a
            href="/Varchini-Devi-K-Resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="mr-1.5 hidden items-center gap-1.5 rounded-md border border-[var(--border-strong)] px-3 py-1.5 text-[0.82rem] font-medium text-[var(--text)] transition-colors hover:border-[var(--accent-line)] hover:text-[var(--accent)] sm:inline-flex"
          >
            <FileText size={14} /> Résumé
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-md text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
          >
            <Github size={17} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-md text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
          >
            <Linkedin size={17} />
          </a>
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="grid h-9 w-9 place-items-center rounded-md text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-md text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)] lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t bg-[var(--bg)]/95 backdrop-blur-lg lg:hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-5 py-3 sm:px-8">
            {TABS.map((t) => (
              <a
                key={t.id}
                href={`/#${t.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)] ${
                  active === t.id ? "bg-[var(--surface-2)] text-[var(--text)]" : "text-[var(--muted)]"
                }`}
              >
                {t.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
