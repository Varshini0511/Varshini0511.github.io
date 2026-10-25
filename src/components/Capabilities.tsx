"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type Capability = {
  name: string;
  hook: string;
  detail: string;
  points: readonly string[];
};

export default function Capabilities({ capabilities }: { capabilities: readonly Capability[] }) {
  const [active, setActive] = useState(0);
  const cap = capabilities[active];

  return (
    <div className="card overflow-hidden">
      <div className="flex gap-2 overflow-x-auto border-b p-3">
        {capabilities.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setActive(i)}
            aria-current={i === active}
            className={`shrink-0 rounded-lg border px-3.5 py-2.5 text-left transition-all ${
              i === active
                ? "border-[var(--accent-line)] bg-[var(--accent-soft)]"
                : "border-transparent hover:bg-[var(--surface-2)]"
            }`}
          >
            <span
              className={`block text-sm font-medium ${i === active ? "text-[var(--accent)]" : "text-[var(--text)]"}`}
            >
              {c.name}
            </span>
            <span className="mt-0.5 hidden text-xs leading-snug text-[var(--faint)] sm:block">{c.hook}</span>
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-7">
        <p className="text-[1rem] leading-[1.75] text-[var(--muted)]">{cap.detail}</p>
        <ul className="mt-5 space-y-2.5">
          {cap.points.map((pt) => (
            <li key={pt} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-[var(--muted)]">
              <Check size={15} className="mt-[3px] shrink-0 text-[var(--accent)]" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
