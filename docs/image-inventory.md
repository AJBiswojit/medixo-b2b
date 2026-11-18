# Medixo AI imagery refresh

Comparison base: `602dfa4` (before the photography refresh). Previous image names are relative to `public/images/`. New stems are relative to `public/images/photography/` and denote WebP files, with a smaller WebP alongside each. The deployed [image credits](../public/image-credits.html) link to the original sources and bundled license notices. Pinterest was used for visual reference only; no pins or generated rasters are served by this refresh.

## Opening hero

| Previous image or graphic | Placement and requirement | Replacement |
| --- | --- | --- |
| `hero-lavender.webp`, abstract sculpture | AI: recognizable computing infrastructure | `hero-ai-infrastructure` — server rack aisle, Pexels 4508751 |
| Clinical overview mock and ECG | Healthcare: real clinical technology in use | `hero-clinical-monitoring` — clinician and bedside monitor, Pexels 6129683 |
| Learning dashboard mock | Education: learning with technology | `hero-digital-learning` — students using laptops, Pexels 6684504 |
| `fashion-tile.webp` with storefront mock | E-commerce: genuine textile retail | `hero-fashion-retail` — shopper among fabrics, Pexels 8886966 |
| `hero-optics.webp` with drawn detection box | Computer Vision: inspection equipment, not surveillance | `hero-vision-camera` — optical inspection of a circuit board, Keyence DE, CC BY-SA 4.0 |
| `hero-creative.webp`, abstract composition | Generative AI: real digital production setting | `hero-creative-workstation` — operator at a creative workstation, Pexels 13450798 |
| Workflow diagram | Automation: working industrial hardware | `hero-robotic-cell` — robotic arm in a production cell, Pexels 29320998 |
| Operations chart mock | Enterprise Software: authentic dashboard capture | `hero-analytics-dashboard` — Apache Superset sample, not a Medixo product |

The original card IDs, capability labels, anchors, and orbit paths are retained. The desktop sector scene reuses the corresponding gallery photos: **AI → Robotics; Healthcare → Energy; Education → Agriculture; E-commerce → Logistics; Computer Vision → Automotive; Generative AI → Construction; Automation → Manufacturing; Enterprise Software → Finance**. There are no separate sector copies. The portfolio remains separate from the capabilities gallery.

## Industry gallery

Each cover uses a real subject that can be identified at card scale. The 18 cards, five directory groups, three sector spotlights, and 20 inquiry choices are retained.

| Previous image stem | Placement and requirement | Replacement and Pexels ID |
| --- | --- | --- |
| `project-medixo-health` | Healthcare & Medical: clinical equipment | `industry-healthcare` — diagnostic scanner and patient table (13176358) |
| `project-edux` | Education & EdTech: classroom technology | `industry-education` — teacher and students with laptops (8423049) |
| `industry-retail` | Retail & E-commerce: physical merchandise and storefront context | `industry-retail-ecommerce` — boutique with clothing displays (5490970) |
| `project-swarnova` | Jewellery & Fashion: photographed product detail | `industry-jewellery-fashion` — jewellery on a display stand (20858959) |
| `industry-people` | Human Resources: recruitment workflow | `industry-human-resources` — interview across a desk (5439157) |
| `industry-study-manufacturing` | Manufacturing & Industrial: production floor | `industry-manufacturing` — workers on an assembly line (39351225) |
| `industry-study-robotics` | Robotics & Intelligent Automation: deployed equipment | `industry-robotics` — robot inside a production cell (34207359) |
| `industry-study-construction` | Construction & Infrastructure: active site | `industry-construction` — building frame, crane, and scaffolding (5505125) |
| `industry-study-finance` | Finance & FinTech: financial data workspace | `industry-finance-fintech` — workstation and tablet charts (31650949) |
| `industry-study-real-estate` | Real Estate & Property Technology: built property | `industry-real-estate` — contemporary house (7598364) |
| `industry-study-agriculture` | Agriculture & AgriTech: field operations | `industry-agriculture` — aerial crop rows and machinery (1595106) |
| `industry-study-automotive` | Automotive & Mobility: vehicle infrastructure | `industry-automotive` — EV connected to a charger (35736777) |
| `industry-study-energy` | Energy & Utilities: distributed infrastructure | `industry-energy` — wind turbines on green hills (7389182) |
| `industry-study-logistics` | Logistics & Supply Chain: warehouse operations | `industry-logistics` — worker and forklift between storage racks (30824313) |
| `industry-study-hospitality` | Hospitality & Travel: guest service | `industry-hospitality-travel` — staffed hotel reception (5371676) |
| `industry-study-telecommunications` | Telecommunications: network infrastructure | `industry-telecommunications` — tower with antenna arrays (17324301) |
| `industry-study-media-entertainment` | Media & Entertainment: production equipment | `industry-media-entertainment` — mounted cinema camera (28532582) |
| `industry-study-professional-services` | Professional Services: advisory work | `industry-professional-services` — advisers reviewing documents (36733327) |

## Portfolio

Configured, approved screenshots take priority, then bundled captures, then visibly labeled concepts. A broken configured image does not block the fallback, and a public project URL does not change which visual is shown. Expand **More product views** in the project dialog to see the extra captures and open them at full size.

| Previous visual or unused image metadata | Placement and requirement | Replacement |
| --- | --- | --- |
| Atelier/store concept with `fashion-editorial.webp` and `fashion-tile.webp`; `project-pratikshya` and `hero-fashion` metadata | Pratikshya Fashion: real storefront and catalogue operations | `screens/pratikshya-product`, `screens/pratikshya-catalogue`, `screens/pratikshya-admin`. The fallback uses `concept-fashion-atelier`, a stock atelier photograph (6765056), not a screenshot. |
| CSS jewellery collection/product mock; `project-swarnova` metadata | Swarnova: visually credible jewellery showcase without inventing a production screen | **Concept preview** with `concept-jewellery-collection` (6624862) and `concept-jewellery-detail` (27295182). No verified screenshot was available. |
| CSS question-studio mock; `project-edux` metadata | EduX: real faculty and student workflows | `screens/edux-paper-studio`, `screens/edux-faculty`, `screens/edux-student`, `screens/edux-exams`, `screens/edux-analytics`. The labeled interface concept remains the last-resort fallback. |
| CSS clinical library mock; `project-medixo-health` and `hero-healthcare` metadata | Medixo Healthcare: clinical context without inventing a product screen or patient records | **Concept preview** with `concept-clinical-reference`, a stock clinician photograph (6129041). No verified screenshot was available. |

### Capture provenance

- **Pratikshya Fashion:** local checkout of [`Pratikshya_v2` at `70acce2`](https://github.com/AJBiswojit/Pratikshya_v2/tree/70acce213d9c974202bdf2fd85fef0d257987356). The product detail, `/women/sarees`, and `/admin/products` were rendered by the source app. Catalogue fixtures and demo accounts were local, with no live orders or inventory. The catalogue and admin captures use stock reference photos from Pexels (9419032, 13679117, 13074123, and 28943659). The product-detail capture uses Abhishek Kumar's embroidered saree photograph (9419149) in the main product image and its thumbnail. The project's bundled garment photos were not used. This repository has the same owner as Medixo's site but no declared reusable license. **Confirm the project rights holder approves public use of these screenshots before publishing.** The stock photo licenses do not grant rights to the product UI.
- **EduX:** local checkout of [`edux` at `11a8a70`](https://github.com/AJBiswojit/edux/tree/11a8a7009e0b12929dd9d1254dc58fbf8d6eed5c), with MIT notice included. Captures are from the faculty Question Paper Studio and teaching dashboard, and the student learning, examinations, and performance views. The build used an isolated local database and demo accounts, not live student data.
- **Inspection and analytics:** the Keyence image's resized WebPs carry the original CC BY-SA 4.0 license. The cropped Superset dashboard comes from its upstream documentation, with Apache-2.0 license and NOTICE. The footer credits distinguish these references from Medixo project work.

## About, social, and retained assets

| Previous image | Placement and requirement | Replacement or retention |
| --- | --- | --- |
| `about-studio` | About: a real engineering collaboration, not a fabricated team portrait | `about-engineering` — developers reviewing code together, Pexels 7988742 |
| `hero-ai-sculpture.jpg` | Open Graph and Twitter: recognizable collaboration at share-card scale | `share-engineering.jpg` — separate 1200 × 630 crop of the About photograph. Set `VITE_CANONICAL_URL` to make both image URLs absolute in the built HTML. |
| Inline Medixo mark and favicon; 35 vendor SVG marks; local typefaces; CSS panel colors, rules, and orbital traces | Brand and layout visuals rather than photography | Retained. Technology marks have separate [sources and licenses](../public/marks/SOURCES.md). |
| Unused alternates and duplicate exports from the old library | No remaining rendering dependency | Removed along with the replaced imagery — 53 old rasters in total. Raw stock downloads and browser review files are not in the repository. |

## Verification

- Production builds passed with and without the canonical origin; the configured build exposes both absolute social image URLs in the static HTML. The preview served all bundled public assets, including credits and notices.
- The replacement library contains 79 rasters (78 WebPs and one JPEG), **3.26 MB** in total versus **3.39 MB** for the old rasters. The displayed sizes are selected by the browser; the entire library is not loaded at once. At 390 × 844 at 1× DPR, the opening hero uses four small WebPs totaling 30 KB, with no sector or portfolio images requested on arrival.
- Chromium checks covered 19 viewport sizes (320 × 568 through 2560 × 1440), forward and reverse scrubbing, resize across the pin breakpoint, reduced-motion toggles, and clean animation teardown. The pin remains reserved for screens at least 1100 × 680 with motion enabled. The hero-to-About release gap is measured from the capability index's bottom edge to the About section's top edge, not to the heading:

  | Viewport | Pin scrub, before → after | Release gap, before → after |
  | --- | --- | --- |
  | 1100 × 680 | 1108 → 1496 px | 0 → 0 px |
  | 1440 × 900 | 1467 → 1979 px | 67 → 0 px |
  | 1920 × 1080 | 1740 → 2200 px | 68 → 0 px |
  | 2560 × 1440 | 1740 → 2200 px | 421 → 0 px |
  | 390 × 844 | Not pinned | 0 → 0 px |

  The desktop pin now follows the four-scene hero choreography: the scrub distance is the viewport height × 2.2, clamped to 1400–2200 px. Reverse scrubbing was checked to produce identical frames at 30%, 60%, and 90% progress.

- Verified all 18 responsive covers, sector deep links and browser Back, carousel directory/arrows/keyboard/touch, portfolio fallbacks and dialog focus return, inquiry prefills, and the no-endpoint and mocked success/error submission paths. Automated axe checks passed on the desktop and narrow mobile page, tested project dialogs, and the credits page.
