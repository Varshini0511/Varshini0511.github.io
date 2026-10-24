/**
 * The home page is a set of tabs, not one long scroll. Each id is both the URL
 * hash (/#career) and the name of a panel. "overview" is the default.
 */
export const TABS = [
  { id: "overview", label: "Home" },
  { id: "career", label: "Career" },
  { id: "ai", label: "AI work" },
  { id: "mobile", label: "Mobile" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

export const TAB_IDS: readonly string[] = TABS.map((t) => t.id);

export const DEFAULT_TAB: TabId = "overview";

/** Reads the tab from a location hash such as "#career"; anything unknown is the default. */
export function tabFromHash(hash: string): TabId {
  const id = hash.replace(/^#/, "");
  return (TAB_IDS.includes(id) ? id : DEFAULT_TAB) as TabId;
}
