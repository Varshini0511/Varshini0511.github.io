/**
 * The home page is a set of tabs, not one long scroll. Each id is both the URL
 * hash (/#career) and the name of a panel. "overview" is the default.
 */
export const TABS = [
  { id: "overview", label: "Home" },
  { id: "career", label: "Experience" },
  { id: "ai", label: "AI work" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

export const TAB_IDS: readonly string[] = TABS.map((t) => t.id);

export const DEFAULT_TAB: TabId = "overview";

/** Old hashes that now live inside another tab, so existing links keep working. */
export const TAB_ALIASES: Readonly<Record<string, TabId>> = { mobile: "ai" };

/** Reads the tab from a location hash such as "#career"; anything unknown is the default. */
export function tabFromHash(hash: string): TabId {
  const id = hash.replace(/^#/, "");
  if (id in TAB_ALIASES) return TAB_ALIASES[id];
  return (TAB_IDS.includes(id) ? id : DEFAULT_TAB) as TabId;
}
