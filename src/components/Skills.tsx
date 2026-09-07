import { profile } from "@/data/profile";

export default function Skills() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {profile.skills.map((group) => (
        <div key={group.group} className="card card-hover p-5">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">{group.group}</h3>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
