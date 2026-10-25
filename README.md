# Varchini Devi K — Portfolio

Personal portfolio site. Static Next.js App Router build, deployed to GitHub Pages.

**Live:** https://varshini0511.github.io/

---

## Editing content

All copy lives in one file: [`src/data/profile.ts`](src/data/profile.ts).

Name, tagline, stats, projects, experience, skills, achievements and contact
details are all data. Change the file, and the page updates — no component
edits needed. The components only decide how the data is laid out.

Common edits:

| Want to change | Edit |
|---|---|
| Hero headline (second half is italic) | `profile.headline` |
| Paragraph under the headline | `profile.tagline` |
| Meta description / link previews | `profile.summary` |
| The four hero stat tiles | `profile.stats` |
| Client wordmarks on the home tab | `profile.clients` |
| "Why the combination matters" rows | `profile.bridge` |
| The four home-page project cards | `profile.selectedWork` |
| AI toolkit (techniques → projects) | `profile.aiToolkit` — also feeds the chips on every project card and the home-page tech band |
| "One lifecycle, every AI system" | `profile.aiLifecycle` |
| Enterprise row of the tech band | `profile.enterpriseStack` |
| A project's bullets | that project's `highlights` |
| The three AdviShopping panels | `projects[0].capabilities` |
| Filter chips | `FILTERS` in `src/components/Projects.tsx` |
| Résumé PDF | replace `public/Varchini-Devi-K-Resume.pdf` |

Setting `repoPrivate: true` on a project swaps the "Source" button for a
non-clickable "Private repo" badge, so no link 404s for a recruiter.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy

```bash
npm run deploy
```

Builds the static site and force-pushes `out/` to the `gh-pages` branch,
which GitHub Pages serves at the URL above.

## Build

```bash
npm run build
```

Output is fully static — every route prerenders, so it deploys anywhere.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · lucide-react

Notes:
- Theme is dark by default with a light toggle, driven by CSS variables in
  `globals.css` and a `data-theme` attribute on `<html>`. A tiny inline script
  in `layout.tsx` applies the stored theme before paint to avoid a flash.
- No external requests at runtime — fonts are self-hosted by `next/font`.
- The link-preview image is generated at build time by `src/app/og.png/route.tsx`
  from `profile.headline` and `profile.stats`, so it never goes stale.
- `sitemap.xml`, `robots.txt` and schema.org `Person` data are generated too.
- Scroll motion lives in `src/components/ScrollEffects.tsx`: add `data-reveal`
  to fade an element in, `data-reveal="grow"` to draw a bar or line, and
  `data-count` to count a number up. All of it is skipped without JavaScript
  and under `prefers-reduced-motion`.
