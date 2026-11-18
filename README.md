# Medixo AI website

The corporate site is a React/JSX single-page site. The section components live in `src/components`, business content in `src/data`, and the shared GSAP/ScrollTrigger helpers in `src/animations`.

## Run locally

```sh
npm ci
npm run dev
```

Run `npm run build` to compile the production site into `dist/`. Serve the entire `dist/` directory, including the local WebP images, fonts, and SVG assets.

## Brand logo

`public/logo/MedixoEmblemWhite.svg` is the original Medixo AI emblem and is used unchanged on dark surfaces. `MedixoEmblemDark.svg` changes only its two visible gradient colours for light surfaces. The navbar, mobile menu, footer, credits page, and favicon use these public SVGs directly.

## Industry catalogue

`src/data/industries.js` is the source for sector names, imagery, capabilities, the gallery directory, and inquiry options. Use `spotlight: true` to feature a sector first in the gallery. To include it in the desktop hero, assign an unused `hero.slot` from `HERO_CARDS` in `src/data/navigation.js` and a short `hero.label`. The opening hero imagery is independent of this mapping. Catalogue photography illustrates service capabilities, not client or project work. Portfolio entries remain in `src/data/projects.js`.

## Photography and product views

The [image inventory](docs/image-inventory.md) records the replacements, capture provenance, and verification results. The site's **Image credits** footer link leads to photo sources and license notices. Responsive photographs and capture pairs are under `public/images/photography/`.

The portfolio prefers a configured, approved product screenshot, then a bundled capture, then a labeled concept. Missing or broken images fall back automatically. The Pratikshya Fashion and EduX captures show local builds with sample data. The Swarnova and Medixo Healthcare visuals are concepts until approved captures are supplied. Confirm permission to publish the Pratikshya UI captures before deploying; see [capture provenance](docs/image-inventory.md#capture-provenance).

## Deployment settings

- Copy `.env.example` to `.env` and supply official contact channels and a `VITE_INQUIRY_API_URL` if live submissions are available. Without an endpoint, the form validates and prepares a copyable brief without sending a message. Vite exposes `VITE_` variables to visitors; do not put secrets in them.
- Set `VITE_CANONICAL_URL` to the official public origin (for example, `https://example.com`) so the production build has absolute Open Graph and Twitter image URLs.
- To override a portfolio visual, set its `VITE_PROJECT_*_SCREENSHOT` to an approved HTTPS image URL or a local path such as `/images/photography/screens/project-screen.webp` for a file in `public/`. `VITE_PROJECT_*_URL` independently controls the live-platform link.
