/**
 * ZenithStay Properties Limited — domain model.
 *
 * The whole site is data-driven from `properties.data.ts`. Adding a future
 * acquisition to the portfolio = append one `Property` object there. Every
 * page (home, portfolio grid, detail) reads from this shape, so nothing else
 * needs to change.
 *
 * Optional fields can be expanded as verified project and investment data is
 * approved for publication.
 */

export type PropertyStatus =
  | 'portfolio'    // owned & showcased, not for sale
  | 'available'    // open to enquiries / for sale
  | 'let'          // held and currently occupied
  | 'coming-soon'; // acquisition in progress / placeholder

export interface RoomImage {
  /** Human room label, shown as a caption. Editable — reorder freely. */
  name: string;
  /** Path under /public, e.g. properties/priory-road/kitchen.jpg */
  image: string;
  /** Short descriptive caption for the gallery + alt text. */
  caption: string;
  /** Optional grouping, e.g. 'Ground floor' | 'First floor'. */
  floor?: string;
}

export interface DevelopmentImage {
  /** Short phase label shown in the project record. */
  stage: string;
  /** Path under /public to an authentic progress photograph. */
  image: string;
  /** Concise explanation of what the photograph evidences. */
  caption: string;
}

export interface SustainabilityItem {
  title: string;
  detail: string;
  /** Inline SVG key rendered by the sustainability card (see component). */
  icon: 'leaf' | 'bolt' | 'droplet' | 'thermometer' | 'recycle' | 'sun';
}

export interface Panorama360 {
  /** Which room this 360° panorama represents. */
  room: string;
  /** Equirectangular image path once captured. Empty = not yet available. */
  url: string;
}

export interface PropertySpecs {
  /** Bedroom count before ZenithStay's intervention, when relevant. */
  originalBedrooms?: number;
  bedrooms: number;
  bathrooms: number;
  receptions: number;
  /** Internal floor area. */
  areaSqft?: number;
  areaSqm?: number;
  epcRating?: string;        // e.g. 'B', 'C'
  councilTaxBand?: string;   // e.g. 'D'
  tenure?: string;           // e.g. 'Freehold'
  yearRenovated?: number;
}

export interface Property {
  id: string;
  slug: string;
  /** Public project name, e.g. "Priory Road". */
  name: string;
  /** Portfolio reference, e.g. "ZP-01". */
  ref: string;
  status: PropertyStatus;

  location: {
    area: string;    // neighbourhood / district
    city: string;
    country: string;
  };

  /** One-line hero headline. */
  headline: string;
  /** Short standfirst under the headline. */
  standfirst: string;
  /** Longer narrative — array of paragraphs. */
  story: string[];

  heroImage: string;
  specs: PropertySpecs;
  features: string[];
  /** Optional evidence from key delivery stages, ordered for presentation. */
  development?: DevelopmentImage[];
  rooms: RoomImage[];
  sustainability: SustainabilityItem[];

  /** future-ready — populate when panoramas are shot. */
  panoramas: Panorama360[];
  /** future-ready — for a portfolio map. */
  coordinates?: { lat: number; lng: number };
  /** Optional guide price; hidden in the UI unless set. */
  guidePrice?: string;
}
