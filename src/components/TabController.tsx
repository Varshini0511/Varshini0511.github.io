"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { tabFromHash } from "@/lib/tabs";

/**
 * Keeps <html data-tab> in step with the URL hash and returns to the top of the
 * page when the tab changes. The initial value is set before paint by the inline
 * script in layout.tsx; this handles everything after that.
 */
export default function TabController() {
  const pathname = usePathname();

  // Hash changes on the same page (clicking a tab).
  useEffect(() => {
    const apply = () => {
      // Only the home page has tabs; on a project page a hash is an in-page link.
      if (window.location.pathname !== "/") return;
      const next = tabFromHash(window.location.hash);
      const root = document.documentElement;
      if (root.getAttribute("data-tab") !== next) {
        root.setAttribute("data-tab", next);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  // Client-side navigation back to the home page (e.g. "All projects" from a
  // project page) changes the path without a hashchange event.
  useEffect(() => {
    if (pathname === "/") {
      document.documentElement.setAttribute("data-tab", tabFromHash(window.location.hash));
    }
  }, [pathname]);

  return null;
}
