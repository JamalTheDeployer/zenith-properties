import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { PropertyService } from '../../core/property.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="border-b pb-20 pt-40 md:pb-28 md:pt-48" style="border-color: var(--color-line); background: var(--color-canvas);">
      <div class="container-wide">
        <div class="grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
          <div data-reveal>
            <p class="eyebrow">Project portfolio</p>
            <p class="mt-5 index-label">Completed work / 2026—</p>
          </div>
          <div>
            <h1 class="max-w-5xl text-[clamp(4.3rem,9vw,9rem)]" data-reveal>Evidence,<br><em class="font-normal">not promises.</em></h1>
            <p class="mt-10 max-w-2xl text-[1.1rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="80">
              Every ZenithStay project is documented through the opportunity identified, the intervention delivered and the completed asset. Priory Road begins that record with a two-bedroom to four-bedroom transformation.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 md:py-28" style="background: var(--color-surface);">
      <div class="container-wide">
        @for (p of projects; track p.id; let i = $index) {
          <article class="grid gap-0 border" style="border-color: var(--color-line-strong);" data-reveal>
            <a [routerLink]="['/project', p.slug]" class="group image-wash relative min-h-[500px] overflow-hidden lg:min-h-[680px]">
              <img [src]="p.heroImage" [alt]="p.name + ' completed kitchen'"
                   class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.025]" loading="eager" />
              <div class="absolute inset-x-0 bottom-0 z-10 p-6 text-white md:p-10" style="background: linear-gradient(0deg, rgba(16,22,18,.82), transparent);">
                <div class="flex flex-wrap items-end justify-between gap-6 border-t pt-6" style="border-color: rgba(255,255,255,.32);">
                  <div>
                    <p class="text-[10px] font-semibold uppercase tracking-[.23em] text-white/65">{{ p.ref }} · Completed project</p>
                    <h2 class="mt-3 text-[clamp(3rem,6vw,6rem)]" style="color: white;">{{ p.name }}</h2>
                  </div>
                  <span class="text-[11px] font-semibold uppercase tracking-[.17em]">Open case study →</span>
                </div>
              </div>
            </a>
            <div class="grid border-t md:grid-cols-4" style="border-color: var(--color-line-strong);">
              @for (fact of projectFacts(p); track fact.label) {
                <div class="border-b p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0" style="border-color: var(--color-line-strong);">
                  <p class="index-label">{{ fact.label }}</p>
                  <p class="mt-3 display-serif text-2xl">{{ fact.value }}</p>
                </div>
              }
            </div>
          </article>
        }
      </div>
    </section>

    <section class="py-24 md:py-36" style="background: var(--color-mist);">
      <div class="container-wide grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div data-reveal>
          <p class="eyebrow mb-5">Pipeline</p>
          <h2 class="max-w-4xl text-[clamp(3rem,6vw,6rem)]">The next project earns its name when the opportunity is right.</h2>
        </div>
        <div data-reveal [revealDelay]="90">
          <p class="max-w-lg text-[1.05rem]" style="color: var(--color-slate);">
            ZenithStay is actively building the relationships that support the next acquisition. We are interested in well-located residential assets where focused improvement can unlock durable value.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a routerLink="/strategy" class="btn btn-primary">View our approach</a>
            <a routerLink="/enquire" class="btn btn-ghost">Discuss an opportunity</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PortfolioComponent {
  private readonly svc = inject(PropertyService);
  readonly projects = this.svc.showcased();

  projectFacts(project: ReturnType<PropertyService['featured']>): { label: string; value: string }[] {
    return [
      { label: 'Status', value: 'Completed' },
      { label: 'Transformation', value: `${project.specs.originalBedrooms ?? 2} → ${project.specs.bedrooms} bedrooms` },
      { label: 'Completed form', value: `${project.specs.bedrooms}-bedroom home` },
      { label: 'Scope', value: 'Reconfiguration + refurbishment' },
      { label: 'Completion', value: String(project.specs.yearRenovated ?? '—') },
    ];
  }
}
