import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { PropertyService } from '../../core/property.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="pt-36 pb-16" style="background: var(--color-canvas);">
      <div class="container-wide">
        <p class="eyebrow mb-4" data-reveal>The collection</p>
        <h1 class="text-[clamp(2.4rem,5vw,3.8rem)] max-w-3xl text-balance" data-reveal>
          The Zenith portfolio.
        </h1>
        <p class="mt-5 max-w-xl text-[1.08rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="80">
          One home today, a considered collection tomorrow. Each property is acquired, renovated and held to
          the same standard.
        </p>
      </div>
    </section>

    <section class="pb-28" style="background: var(--color-canvas);">
      <div class="container-wide">
        <div class="grid gap-8 md:grid-cols-2">
          @for (p of properties; track p.id; let i = $index) {
            @if (p.status !== 'coming-soon') {
              <a routerLink="/property/{{ p.slug }}" class="group block" data-reveal [revealDelay]="i * 90">
                <article class="surface-card overflow-hidden h-full transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_40px_80px_-40px_rgba(32,36,31,0.4)]"
                         style="border-radius: var(--radius-xl);">
                  <div class="relative overflow-hidden" style="aspect-ratio: 4 / 3;">
                    <img [src]="p.heroImage" alt="{{ p.name }}"
                         class="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]" loading="lazy" />
                    <span class="absolute top-4 left-4 chip chip-sage">{{ statusLabel(p.status) }}</span>
                  </div>
                  <div class="p-7">
                    <div class="flex items-baseline justify-between gap-4">
                      <h2 class="display-serif text-2xl">{{ p.name }}</h2>
                      <span class="text-[12px] uppercase tracking-[0.18em]" style="color: var(--color-muted);">{{ p.ref }}</span>
                    </div>
                    <p class="mt-1 text-[14px] uppercase tracking-[0.14em]" style="color: var(--color-muted);">
                      {{ p.location.area }}, {{ p.location.country }}
                    </p>
                    <p class="mt-4 text-[15px]" style="color: var(--color-slate);">{{ p.standfirst }}</p>
                    <div class="mt-5 flex flex-wrap gap-2">
                      <span class="chip">{{ p.specs.bedrooms }} bed</span>
                      <span class="chip">{{ p.specs.bathrooms }} bath</span>
                      @if (p.specs.areaSqm) { <span class="chip">{{ p.specs.areaSqm }} m²</span> }
                      @if (p.specs.epcRating) { <span class="chip chip-oak">EPC {{ p.specs.epcRating }}</span> }
                    </div>
                    <span class="mt-6 inline-flex items-center gap-2 text-[14px] font-medium" style="color: var(--color-oak-deep);">
                      View the residence
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                  </div>
                </article>
              </a>
            } @else {
              <!-- Coming soon placeholder -->
              <article class="rounded-[32px] border border-dashed p-7 flex flex-col justify-between min-h-[360px]"
                       style="border-color: var(--color-line-strong); background: var(--color-mist);"
                       data-reveal [revealDelay]="i * 90">
                <div>
                  <span class="chip">{{ statusLabel(p.status) }}</span>
                  <h2 class="display-serif text-2xl mt-6">{{ p.name }}</h2>
                  <p class="mt-1 text-[14px] uppercase tracking-[0.14em]" style="color: var(--color-muted);">{{ p.ref }}</p>
                  <p class="mt-4 text-[15px] max-w-sm" style="color: var(--color-slate);">{{ p.standfirst }}</p>
                </div>
                <a routerLink="/enquire" class="btn btn-ghost self-start mt-8">Register interest</a>
              </article>
            }
          }
        </div>
      </div>
    </section>
  `,
})
export class PortfolioComponent {
  private readonly svc = inject(PropertyService);
  readonly properties = this.svc.all();

  statusLabel(s: string): string {
    switch (s) {
      case 'portfolio': return 'In the portfolio';
      case 'available': return 'Open to enquiries';
      case 'let': return 'Now let';
      case 'coming-soon': return 'Coming soon';
      default: return s;
    }
  }
}
