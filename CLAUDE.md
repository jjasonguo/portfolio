# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server at http://localhost:5173/portfolio/
npm run build      # tsc type-check + Vite build → dist/
npm run lint       # ESLint (TS + React hooks rules)
npm run preview    # serve the dist/ build locally
npm run deploy     # build then push dist/ to gh-pages branch
```

There is no test suite currently.

## Architecture

Single-page portfolio with no router. Navigation is anchor-link based (`#about`, `#projects`, `#experience`, `#contact`). `App.tsx` composes components in order: `Navbar → Hero → About → Experience → Projects → Contact`.

**Adding a new section:** create a component in `src/components/`, give its root element an `id`, import and render it in `App.tsx`, and add a link to the `links` array in `Navbar.tsx`.

## Key constraints

- **`base: '/portfolio/'`** in `vite.config.ts` is required for GitHub Pages subdirectory hosting — do not remove it. All asset paths must be relative or use Vite's `import` system.
- **Tailwind CSS v4** is configured via the `@tailwindcss/vite` Vite plugin. There is no `tailwind.config.js` or `postcss.config`. Global styles live in `src/index.css` which opens with `@import "tailwindcss"`.
- **If routing is ever added**, use `HashRouter` (not `BrowserRouter`) to avoid 404s on GitHub Pages page refresh.

## Content & persona

Frame the narrative around a strong mathematical background, statistics expertise, and analytical problem-solving.

- **Academics:** Double major in Computer Science and Statistics at Cornell University
- **Experience:** Upcoming SWE Intern at a major social media company (Ads Interface) · past Full-Stack Dev at Chapter One · ML/Bioinformatics roles
- **Projects:** ResuMax (AI job application agent) · Duck Duck Debug (AI debugging assistant) · Munch! (food tracking app)

When generating component data (experience timelines, project cards, etc.), populate with the above real content rather than placeholders.

## Animation conventions

All animations use Framer Motion — no CSS keyframes or transitions for motion effects (Tailwind `transition-*` is fine for color/opacity micro-interactions only).

- Entrance on load: `initial` / `animate` with staggered children via `variants`
- Entrance on scroll: `whileInView` with `viewport={{ once: true, margin: "-100px" }}` — always `once: true`; the negative margin triggers slightly before the element fully enters view
- Hover lifts: `whileHover={{ y: -4 }}` on cards
- Easing: prefer physics-based springs (`transition={{ type: "spring", stiffness: 100, damping: 20 }}`) over linear easings — the monochrome aesthetic requires smooth, weighty motion

## Design tokens — monochrome

Strict black & white theme. Depth comes from typography, negative space, and subtle opacity — no color accents.

| Role | Value |
|---|---|
| Page background | `bg-black` / `#000000` |
| Surface / card | `bg-white/[0.02]` or `bg-zinc-950` |
| Borders | `border-white/10` (hover: `border-white/30`) |
| Primary text / headings | `text-white` or `text-zinc-100` |
| Secondary text / body | `text-zinc-400` |
| Buttons / accents | Inverted — `bg-white text-black hover:bg-zinc-200` |

## Typography & spacing

- **Typeface:** clean sans-serif (Inter or Geist) for headings; monospace (JetBrains Mono or Fira Code) for technical terms, dates, and code snippets
- **Hierarchy:** hero text `text-5xl` → `text-7xl` with `tracking-tight`; body text `text-lg leading-relaxed`
- **Whitespace:** sections use at minimum `py-24` or `py-32`

## Responsive & accessibility

- **Mobile-first:** write base Tailwind classes for mobile, scale up with `md:` and `lg:` prefixes
- **Aria labels:** all icon buttons and external links (GitHub, LinkedIn, etc.) must have descriptive `aria-label` attributes
- **Contrast:** `text-zinc-400` on black passes WCAG AA — do not go lighter than `zinc-400` for body text
