# Varchini Devi K — Portfolio

Personal portfolio site. Static Next.js App Router build, deployed to Vercel.

**Live:** _add your Vercel URL here after the first deploy_

---

## Editing content

All copy lives in one file: [`src/data/profile.ts`](src/data/profile.ts).

Name, tagline, stats, projects, experience, skills, achievements and contact
details are all data. Change the file, and the page updates — no component
edits needed. The components only decide how the data is laid out.

Common edits:

| Want to change | Edit |
|---|---|
| Headline / tagline | `profile.tagline` |
| The four hero stat tiles | `profile.stats` |
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
