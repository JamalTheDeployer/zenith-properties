# Zenith Properties — Portfolio site

A state-of-the-art property portfolio for **Zenith Properties**, built to grow from a
single home into a curated collection. Angular + Tailwind + Three.js, in the
**Light Gallery / Scandi** design direction (airy, warm-neutral, oak + sage —
drawn from the property's own oak floors and sage-grey walls).

> The founding residence, **Juniper House (ZP-01)**, is showcased with the client's
> real photographs.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Angular 20 (standalone components, signals, new control flow) |
| Styling | Tailwind CSS v4 (theme tokens in `src/styles.css`) |
| 3D / motion | Three.js (hero orb-field + draggable room-orbit gallery) |
| Fonts | Fraunces (display) + Inter (body) via Google Fonts |
| Build | Angular CLI / esbuild |

## Run it

```bash
cd arenix-portfolio
npm install          # first time only
npm start            # dev server → http://localhost:4200
npm run build        # production build → dist/arenix-portfolio
```

## What's built (v1)

Fully built: **Home**, **Portfolio**, **Property detail** (the showcase centrepiece).
The remaining features from the brief are wired in as **real routes with working
stubs**, so the whole architecture exists and each can be fleshed out without a
rebuild:

| Route | State | Notes |
|---|---|---|
| `/` | ✅ built | Three.js hero, thesis, featured residence, sustainability teaser, CTA |
| `/portfolio` | ✅ built | Grid of homes + a "coming soon" tile for the next acquisition |
| `/property/:slug` | ✅ built | Hero, story, **3D room-orbit gallery**, room grid, spec, sustainability, 360-ready panel |
| `/enquire` | ✅ working stub | Validated reactive form + success state (needs an endpoint to go live) |
| `/sustainability` | ✅ built | Commitments, metrics, net-positive roadmap |
| `/portal` | ✅ working stub | Tenant sign-in → dashboard: raise a repair/complaint, reach the landlord |

## Project structure

```
src/app/
  core/            # data model + data + service (the portfolio lives here)
    property.model.ts       # typed Property interface (the shape of a home)
    properties.data.ts      # THE PORTFOLIO — edit / append homes here
    property.service.ts     # read API (swap for HTTP/CMS later, no UI change)
  layout/          # site-header, site-footer
  shared/          # reveal.directive.ts (scroll-reveal micro-interaction)
  three/           # hero-canvas + gallery-orbit (all Three.js lives here)
  pages/           # home, portfolio, property-detail, enquire, sustainability, portal
public/properties/<slug>/   # each home's photos
```

---

## How to grow it

### ➕ Add a property to the portfolio
1. Drop its photos in `public/properties/<slug>/`.
2. Open `src/app/core/properties.data.ts`, copy the `Juniper House` object, and edit
   the fields + `rooms` list.
3. Done. It appears on the home page, in the portfolio grid, and gets its own
   `/property/<slug>` page automatically.

### 🌐 Turn on 360° virtual tours
The photos supplied are flat (not panoramic), so true drag-to-look-around 360 isn't
possible from them **yet** — but every room is already wired for it. When the client
shoots equirectangular panoramas (a ~£40 phone lens or a Ricoh Theta does it):
1. Save each panorama in the property folder.
2. Fill in its `url` in the property's `panoramas` array.
3. The 360 panel on the property page lights up (drop in a `three` `SphereGeometry`
   viewer — the hook and layout are already there).

### 📨 Make the enquiry form live
`src/app/pages/enquire/enquire.component.ts` → `submit()` has a single `TODO`: POST
`this.form.getRawValue()` to Formspree, a serverless function, or your CRM. Validation,
UX and the success state are already done.

### 🏠 Extend the tenant portal
`src/app/pages/portal/portal.component.ts` is the seed of the tenant experience: sign
in, raise maintenance requests / complaints, reach the landlord. Wire:
- the login form → your auth provider
- `submitRequest()` → your ticketing backend
- the "message the landlord" buttons → email / in-app messaging

---

## Design system

Tokens live in `src/styles.css` under `@theme` — change them once, everywhere updates.

| Token | Value | Role |
|---|---|---|
| `--color-canvas` | `#fbfaf7` | Warm off-white page background |
| `--color-ink` | `#20241f` | Near-black warm charcoal text |
| `--color-oak` | `#b98a54` | Warm oak — primary accent |
| `--color-sage` | `#7e8f76` | Muted sage — secondary accent |
| `--font-display` | Fraunces | Editorial serif headings |
| `--font-body` | Inter | Body / UI |

Prefer a **pure-sans** look? Swap `--font-display` to the Inter stack — one line.

## Placeholders to edit before launch

Search `properties.data.ts` for `(edit)` — location/area, EPC, council tax band,
tenure, floor area and coordinates are sensible placeholders for Juniper House's real
details. Also swap the `hello@zenithproperties.co.uk` / `landlord@…` addresses and the
office phone number in the footer and portal.

## Accessibility & performance notes

- All motion respects `prefers-reduced-motion` (Three.js loops pause; reveals show).
- Three.js is isolated in lazy route chunks — the initial JS payload is ~85 KB gzip.
- Images use `loading="lazy"`; the hero image loads eagerly.
