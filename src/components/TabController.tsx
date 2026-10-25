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
    // The last history state written by the Next.js router. A plain hash link
    // creates a history entry with null state, and Next ignores Back/Forward
    // onto such an entry, so returning from a project page would leave the
    // project on screen under a /#tab URL. Stamping the router's state onto
    // each hash entry lets Next restore the home page there. It is re-read on
    // every click, before the hash changes, so it always belongs to this page.
    let routerState: unknown = null;
    const remember = () => {
      if (window.history.state?.__NA) routerState = window.history.state;
    };
    remember();

    const apply = () => {
      if (window.history.state == null && routerState) {
        window.history.replaceState(routerState, "", window.location.href);
      }
      remember();
      // Only the home page has tabs; on a project page a hash is an in-page link.
      if (window.location.pathname !== "/") return;
      const next = tabFromHash(window.location.hash);
      const root = document.documentElement;
      if (root.getAttribute("data-tab") !== next) {
        root.setAttribute("data-tab", next);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    // Clicking the tab that is already open goes back to its top, as a tab should.
    const onClick = (e: MouseEvent) => {
      remember();
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.location.pathname !== "/") return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target || a.origin !== window.location.origin || a.pathname !== "/" || !a.hash) return;
      if (tabFromHash(a.hash) === document.documentElement.getAttribute("data-tab")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", apply);
    window.addEventListener("popstate", remember);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", apply);
      window.removeEventListener("popstate", remember);
      document.removeEventListener("click", onClick, true);
    };
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
