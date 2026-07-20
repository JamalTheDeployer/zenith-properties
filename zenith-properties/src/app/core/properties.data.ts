import { Property } from './property.model';

/**
 * THE PORTFOLIO.
 *
 * ── To add a future property ──────────────────────────────────────────────
 *   1. Drop its photos in  public/properties/<slug>/
 *   2. Copy the object below, change the fields, list its rooms.
 *   3. That's it — it appears on the home page, the portfolio grid and gets
 *      its own /property/<slug> page automatically.
 *
 * ── Placeholders to edit ──────────────────────────────────────────────────
 *   Text marked  (edit)  is a sensible placeholder for the real details of
 *   the client's first home — swap in the true location, area, EPC, etc.
 */
export const PROPERTIES: Property[] = [
  {
    id: 'juniper-house',
    slug: 'juniper-house',
    name: 'Juniper House',
    ref: 'ZP-01',
    status: 'portfolio',
    location: {
      area: 'Greater London', // (edit) neighbourhood
      city: 'London',         // (edit)
      country: 'United Kingdom',
    },
    headline: 'The first of many.',
    standfirst:
      'A fully reimagined Victorian terrace — warm oak underfoot, onyx-marble bathrooms, and light in every room. The founding residence of the Zenith portfolio.',
    story: [
      'Juniper House marks the beginning of the Zenith Properties portfolio — the first home acquired, stripped back and rebuilt to a standard we intend to repeat with every property that follows.',
      'Every surface was considered: full-height onyx-effect porcelain in the bath and shower rooms, hand-finished walnut internal doors, engineered oak floors, and a bright, contemporary kitchen with integrated appliances and quartz-marble worktops.',
      'It is a home first and an investment second — proof that careful renovation and long-term ownership can sit comfortably together.',
    ],
    heroImage: 'properties/juniper-house/kitchen.jpg',
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      receptions: 1,
      areaSqft: 1080,       // (edit)
      areaSqm: 100,         // (edit)
      epcRating: 'C',       // (edit)
      councilTaxBand: 'D',  // (edit)
      tenure: 'Freehold',   // (edit)
      yearRenovated: 2026,
    },
    features: [
      'Full renovation, completed 2026',
      'Onyx-effect porcelain bath & shower rooms',
      'Contemporary kitchen with integrated appliances',
      'Engineered oak flooring throughout',
      'Solid walnut internal doors',
      'Black matte ironmongery & heated towel rails',
      'Double-glazed sash-style windows',
      'Private landing with feature balustrade',
    ],
    rooms: [
      { name: 'Kitchen', floor: 'Ground floor', image: 'properties/juniper-house/kitchen.jpg', caption: 'Contemporary kitchen with quartz-marble worktops, marble-effect splashback and integrated appliances.' },
      { name: 'Principal Bedroom', floor: 'First floor', image: 'properties/juniper-house/principal-bedroom.jpg', caption: 'A bright dual-aspect principal bedroom overlooking the street.' },
      { name: 'Shower Room', floor: 'First floor', image: 'properties/juniper-house/shower-room.jpg', caption: 'Onyx-effect porcelain walls, black-framed enclosure and heated towel rail.' },
      { name: 'En-suite', floor: 'First floor', image: 'properties/juniper-house/ensuite.jpg', caption: 'A crisp en-suite off the landing, finished in marble-effect stone.' },
      { name: 'Bedroom Two', floor: 'First floor', image: 'properties/juniper-house/bedroom-two.jpg', caption: 'A calm second bedroom with garden views and soft neutral tones.' },
      { name: 'Bedroom Three', floor: 'First floor', image: 'properties/juniper-house/bedroom-three.jpg', caption: 'A well-proportioned third bedroom filled with natural light.' },
      { name: 'Study', floor: 'First floor', image: 'properties/juniper-house/study.jpg', caption: 'A flexible study or nursery with a feature pendant.' },
      { name: 'Cloakroom', floor: 'Ground floor', image: 'properties/juniper-house/cloakroom.jpg', caption: 'A guest cloakroom with an oak-framed mirror and marble half-wall.' },
      { name: 'Landing', floor: 'First floor', image: 'properties/juniper-house/landing.jpg', caption: 'A generous landing with a painted timber balustrade.' },
      { name: 'Walnut Detailing', floor: 'Ground floor', image: 'properties/juniper-house/walnut-door.jpg', caption: 'Solid walnut doors with slim glazed panels connecting the living spaces.' },
      { name: 'Box Room', floor: 'First floor', image: 'properties/juniper-house/box-room.jpg', caption: 'A versatile box room — dressing room, home office or storage.' },
    ],
    sustainability: [
      { icon: 'thermometer', title: 'Efficient heating', detail: 'Modern condensing system with thermostatic radiator valves throughout for zone-by-zone control.' },
      { icon: 'bolt', title: 'Low-energy lighting', detail: 'Full LED lighting scheme, cutting lighting energy use by roughly 80% versus halogen.' },
      { icon: 'thermometer', title: 'Improved insulation', detail: 'Upgraded loft and cavity insulation retaining heat and lowering running costs.' },
      { icon: 'droplet', title: 'Water-conscious fittings', detail: 'Dual-flush WCs and flow-restricted taps and showers reduce mains water demand.' },
      { icon: 'recycle', title: 'Renovated, not rebuilt', detail: 'Restoring the existing structure avoided the embodied carbon of new construction.' },
      { icon: 'leaf', title: 'Roadmap to net-positive', detail: 'Future-ready for solar PV, battery storage and an air-source heat pump. (edit as installed)' },
    ],
    // future-ready: capture equirectangular 360° panoramas and add their paths.
    panoramas: [
      { room: 'Kitchen', url: '' },
      { room: 'Principal Bedroom', url: '' },
      { room: 'Shower Room', url: '' },
    ],
    coordinates: undefined, // (edit) e.g. { lat: 51.5074, lng: -0.1278 }
    guidePrice: undefined,  // portfolio piece — no price shown
  },

  // ── Next acquisition placeholder ─────────────────────────────────────────
  // A quiet "coming soon" tile keeps the portfolio feeling alive. Replace the
  // whole object with the real property when it completes.
  {
    id: 'acquisition-02',
    slug: 'acquisition-02',
    name: 'Acquisition 02',
    ref: 'ZP-02',
    status: 'coming-soon',
    location: { area: 'To be announced', city: '', country: 'United Kingdom' },
    headline: 'The search continues.',
    standfirst: 'The second property in the Zenith portfolio is being sourced. Register to be told first.',
    story: [],
    heroImage: '',
    specs: { bedrooms: 0, bathrooms: 0, receptions: 0 },
    features: [],
    rooms: [],
    sustainability: [],
    panoramas: [],
  },
];
