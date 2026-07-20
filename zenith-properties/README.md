# ZenithStay Properties Limited

Corporate portfolio website for ZenithStay Properties Limited, an independent residential property investment company.

The site is positioned for lenders, investors, agents and professional partners. It presents ZenithStay's investment approach and documents each completed project as an evidence-led case study, beginning with **Priory Road (ZP-01)**.

## Current pages

- `/` — investment proposition and featured project
- `/portfolio` — completed project portfolio and pipeline positioning
- `/project/priory-road` — Priory Road case study
- `/strategy` — acquisition, value-creation and risk approach
- `/about` — company purpose and operating principles
- `/enquire` — professional contact flow

## Technology

- Angular 20 standalone components
- Tailwind CSS v4
- TypeScript
- Angular CLI / esbuild production build

## Local development

```bash
npm install
npm start
```

The development server is available at `http://localhost:4200`.

## Production build

```bash
npm run build
```

The production output is generated under `dist/zenith-properties`.

## Adding the next project

1. Add approved photography under `public/properties/<project-slug>/`.
2. Add a verified project record to `src/app/core/properties.data.ts`.
3. Include only figures and performance claims approved for publication.

Each project then appears in the portfolio and receives its own case-study route.

## Before public launch

- Confirm Priory Road location, area, EPC, tenure and completion details.
- Add approved investment metrics or remove any facts that are not for public use.
- Confirm the business email, company details and legal copy.
- Connect the contact flow to a production email or CRM endpoint if preferred.
- Add privacy, cookie and website terms pages.
