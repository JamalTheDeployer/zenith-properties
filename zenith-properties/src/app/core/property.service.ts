import { Injectable } from '@angular/core';
import { PROPERTIES } from './properties.data';
import { Property } from './property.model';

/**
 * Read-only access to the portfolio. Today it serves from a static data file;
 * swap the internals for an HTTP call to a CMS/API later without touching any
 * component (they only depend on these method signatures).
 */
@Injectable({ providedIn: 'root' })
export class PropertyService {
  /** All properties, in portfolio order. */
  all(): Property[] {
    return PROPERTIES;
  }

  /** Only properties that represent real, showable homes. */
  showcased(): Property[] {
    return PROPERTIES.filter((p) => p.status !== 'coming-soon');
  }

  /** The founding / featured residence. */
  featured(): Property {
    return PROPERTIES[0];
  }

  bySlug(slug: string): Property | undefined {
    return PROPERTIES.find((p) => p.slug === slug);
  }
}
