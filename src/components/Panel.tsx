import type { TabId } from "@/lib/tabs";

/**
 * One tab's content. It is always rendered into the HTML, so search engines and
 * no-JS visitors get the whole site; CSS hides every panel except the active one
 * once the page has confirmed JavaScript is running (see globals.css).
 */
export default function Panel({ id, children }: { id: TabId; children: React.ReactNode }) {
  return (
    <div data-panel={id} className="panel">
      {children}
    </div>
  );
}
