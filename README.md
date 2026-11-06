# Vibrations Elite Website

Company profile website for Vibrations Elite (Pvt) Ltd., Kandana, Sri Lanka. It is a showcase only, with no shop, cart or payments.

Built with React, Vite, TypeScript, Tailwind CSS and Lucide icons. Every page is prerendered to static HTML.

## Run it

Requires Node.js 22 or later.

```bash
npm install
npm run dev       # development server at http://localhost:5173
npm run build     # production site in dist/
npm run preview   # serve the production build at http://localhost:4173
```

Upload the contents of `dist/` to any static host. `public/.htaccess` handles clean URLs on Apache and cPanel hosting. Other hosts should point their 404 page to `404.html`.

## Before launch

| Item | Where | Notes |
| --- | --- | --- |
| Phone, email and WhatsApp | `contact` in `src/config/site.ts` | Hidden until filled |
| Social links | `social` in `src/config/site.ts` | Hidden until filled |
| Confirm brands | `brandsConfirmed` in `src/config/site.ts` | Set to `true` only once the owner confirms the business deals in these brands. This changes the Brands wording to "Brands we offer". The Home hero says "from the world's leading brands" and "Visit Our Store" regardless, so confirm those are accurate |
| Map pin | `address.mapQuery` in `src/config/site.ts` | Check the pin matches the real premises. Google resolves the printed address to the wrong area, so this uses Google's road name instead |
| Contact form | `.env` | See below |
| Hero, SoundPEATS and Soundcore images | `IMAGE_SOURCES.md` | Licence not confirmed |
| Hero brand logos | `src/components/HomeHero.tsx` | Trademark use needs checking, see `IMAGE_SOURCES.md` |

Also check that the site copy suits the business, especially the About page and brand descriptions.

## Contact form

The form validates input but has no delivery service yet. Until one is connected, every valid submission shows **"Your message could not be sent"**, so visitors cannot reach you through it.

To connect it, copy `.env.example` to `.env` and set `VITE_CONTACT_FORM_ENDPOINT` to a form service or API that accepts a JSON POST with `name`, `email`, `subject` and `message`. Then rebuild.

## Project layout

```
src/config/site.ts        Business details and settings
src/data/catalog.ts       Phones, accessories and brands
src/data/pages.ts         Navigation and page metadata
src/components/           Header, Footer, Showcase, ContactSection, ContactForm
src/pages/                One file per page
assets-source/photos/     Original images, by category
scripts/                  Image optimisation, brand assets and prerendering
design-references/        Reference captures and final screenshots
IMAGE_SOURCES.md          Image origins, licences and permission notes
```

To add or change an image, put the original in `assets-source/photos/`, add it to `scripts/optimize-images.mjs`, run `npm run images`, and update `IMAGE_SOURCES.md`.
