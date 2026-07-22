import { Property } from './property.model';

/**
 * The project portfolio. Each completed acquisition is a self-contained case
 * study with its own name, evidence and imagery. Financial metrics should only
 * be added once they have been confirmed for publication.
 */
export const PROPERTIES: Property[] = [
  {
    id: 'priory-road',
    slug: 'priory-road',
    name: 'Priory Road',
    ref: 'ZP-01',
    status: 'portfolio',
    location: {
      area: 'Greater London',
      city: 'London',
      country: 'United Kingdom',
    },
    headline: 'From two bedrooms to four.',
    standfirst:
      'A two-bedroom house reconfigured and comprehensively improved into a four-bedroom home.',
    story: [
      'Priory Road is the founding project in the ZenithStay Properties portfolio: an existing two-bedroom house reconsidered as a more capable four-bedroom home.',
      'The value case went beyond finishes. The plan was reworked to create two additional bedrooms, while the wider refurbishment brought a coherent material language, durable specification and considered lighting to every floor. It is the first proof of ZenithStay’s model: recognise underused potential, resolve the configuration and deliver an asset whose improvement is clear in both utility and finish.',
    ],
    heroImage: 'properties/priory-road/clean/kitchen-clean.jpg',
    specs: {
      originalBedrooms: 2,
      bedrooms: 4,
      bathrooms: 3,
      receptions: 1,
      areaSqft: 1080,
      areaSqm: 100,
      epcRating: 'C',
      councilTaxBand: 'D',
      tenure: 'Freehold',
      yearRenovated: 2026,
    },
    features: [
      'Reconfiguration from two bedrooms to four',
      'Comprehensive residential refurbishment',
      'Contemporary kitchen with integrated appliances',
      'Engineered oak flooring throughout',
      'Solid walnut internal doors and considered joinery',
      'Stone-led bath and shower rooms',
      'Black architectural ironmongery',
      'Double-glazed sash-style windows',
      'Flexible fourth bedroom and additional storage provision',
    ],
    development: [
      {
        stage: 'Opening the structure',
        image: 'properties/priory-road/development-stripped-shell.jpg',
        caption: 'The existing fabric was opened up so the revised plan could be resolved from the structure outwards.',
      },
      {
        stage: 'Spatial reconfiguration',
        image: 'properties/priory-road/development-spatial-frame.jpg',
        caption: 'New timber framing established the circulation and room arrangement required for the four-bedroom plan.',
      },
      {
        stage: 'First fix',
        image: 'properties/priory-road/development-first-fix.jpg',
        caption: 'Services, lining and preparation progressed as one coordinated package before the final finishes were introduced.',
      },
      {
        stage: 'Additional accommodation',
        image: 'properties/priory-road/development-loft-room.jpg',
        caption: 'The upper floor was formed into useful residential space with rooflights, storage and a clear material plan.',
      },
      {
        stage: 'Building envelope',
        image: 'properties/priory-road/development-rear-elevation.jpg',
        caption: 'The rear elevation records the scale of the intervention and the additional volume created within the existing home.',
      },
      {
        stage: 'Fit-out',
        image: 'properties/priory-road/development-kitchen-fitout.jpg',
        caption: 'Joinery, surfaces, lighting and appliances were brought together during the final coordinated fit-out.',
      },
    ],
    rooms: [
      { name: 'Kitchen', floor: 'Ground floor', image: 'properties/priory-road/clean/kitchen-clean.jpg', caption: 'A contemporary kitchen built around durable surfaces, integrated appliances and a restrained material palette.' },
      { name: 'Principal bedroom', floor: 'First floor', image: 'properties/priory-road/clean/principal-bedroom-clean.jpg', caption: 'A light-filled principal room with a calm, neutral finish.' },
      { name: 'Shower room', floor: 'First floor', image: 'properties/priory-road/clean/shower-room-wide-clean.jpg', caption: 'Stone-led finishes, a black-framed enclosure and precise detailing.' },
      { name: 'Bedroom four', floor: 'Ground floor', image: 'properties/priory-road/clean/furnished-bedroom-clean.jpg', caption: 'A furnished view of the fourth bedroom created through the revised residential layout.' },
      { name: 'Bedroom two', floor: 'First floor', image: 'properties/priory-road/clean/bedroom-two-clean.jpg', caption: 'A well-proportioned second bedroom overlooking the garden.' },
      { name: 'Bedroom three', floor: 'First floor', image: 'properties/priory-road/clean/bedroom-three-clean.jpg', caption: 'A flexible third bedroom with strong natural light.' },
      { name: 'Landing', floor: 'First floor', image: 'properties/priory-road/clean/landing-clean.jpg', caption: 'A generous landing with a restored timber balustrade and a clear view into the completed shower room.' },
      { name: 'Shower room detail', floor: 'First floor', image: 'properties/priory-road/clean/shower-room-clean.jpg', caption: 'A close study of the marble-effect surfaces, black fittings and warm timber floor.' },
      { name: 'Walnut detailing', floor: 'Ground floor', image: 'properties/priory-road/clean/walnut-door-clean.jpg', caption: 'Walnut doors create continuity between the principal living spaces.' },
      { name: 'Staircase', floor: 'Ground to first floor', image: 'properties/priory-road/clean/staircase-clean.jpg', caption: 'A fully renewed staircase with soft grey carpet, warm timber detailing and considered lighting.' },
    ],
    sustainability: [
      { icon: 'thermometer', title: 'Efficient heating', detail: 'A modern condensing system with thermostatic radiator valves supports room-by-room control.' },
      { icon: 'bolt', title: 'Low-energy lighting', detail: 'LED lighting was specified throughout the completed scheme.' },
      { icon: 'thermometer', title: 'Improved insulation', detail: 'Upgrades to the building fabric help retain heat and reduce unnecessary demand.' },
      { icon: 'droplet', title: 'Water-conscious fittings', detail: 'Dual-flush WCs and flow-conscious fittings reduce mains water demand.' },
      { icon: 'recycle', title: 'Reworked, not replaced', detail: 'Retaining the existing structure avoided the material impact of wholesale redevelopment.' },
    ],
    panoramas: [],
    coordinates: undefined,
    guidePrice: undefined,
  },
];
