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

  /**
   * Most recently completed projects for company-level surfaces such as the
   * homepage. New records can be appended to the data file; projects completed
   * in the same year are treated as newer when they appear later in the list.
   */
  latestCompleted(limit = 3): Property[] {
    return PROPERTIES
      .map((property, index) => ({ property, index }))
      .filter(({ property }) => property.status !== 'coming-soon')
      .sort((a, b) => {
        const yearDelta = (b.property.specs.yearRenovated ?? 0) - (a.property.specs.yearRenovated ?? 0);
        return yearDelta || b.index - a.index;
      })
      .slice(0, limit)
      .map(({ property }) => property);
  }

  /** Kept for detail-page helpers and backwards compatibility. */
  featured(): Property {
    return this.latestCompleted(1)[0] ?? PROPERTIES[0];
  }

  bySlug(slug: string): Property | undefined {
    return PROPERTIES.find((p) => p.slug === slug);
  }
}
