# Medixo AI website

The corporate site is a React/JSX single-page site. The section components live in `src/components`, business content in `src/data`, and the shared GSAP/ScrollTrigger helpers in `src/animations`.

## Run locally

```sh
npm ci
npm run dev
```

Run `npm run build` to compile the production site into `dist/`. Serve the entire `dist/` directory, including the local WebP images, fonts, and technology marks.

## Industry catalogue

`src/data/industries.js` is the source for sector names, imagery, capabilities, the gallery directory, and inquiry options. Use `spotlight: true` to feature a sector first in the gallery. To include it in the desktop hero, assign an unused `hero.slot` from `HERO_CARDS` in `src/data/navigation.js` and a short `hero.label`. The opening artwork is independent of this mapping. Catalogue imagery illustrates service capabilities, not client or project work. Portfolio entries remain in `src/data/projects.js`.

## Deployment settings

- Copy `.env.example` to `.env` and supply official contact channels and a `VITE_INQUIRY_API_URL` if live submissions are available. Without an endpoint, the form validates and prepares a copyable brief without sending a message. Vite exposes `VITE_` variables to visitors; do not put secrets in them.
- Each project will display its labeled illustrative mockup unless a verified screenshot is supplied using its `VITE_PROJECT_*_SCREENSHOT` setting. Put local screenshots in `public/images/` and reference them as `/images/...`. A project's optional `VITE_PROJECT_*_URL` controls its separate live-platform link.
