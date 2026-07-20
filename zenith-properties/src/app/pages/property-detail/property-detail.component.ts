import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { PropertyService } from '../../core/property.service';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    @if (property(); as p) {
      <section class="relative min-h-[92svh] overflow-hidden pt-[82px]">
        <img [src]="p.heroImage" [alt]="p.name + ' completed interior'" class="absolute inset-0 h-full w-full object-cover" />
        <div class="absolute inset-0" style="background: linear-gradient(180deg, rgba(16,22,18,.08), rgba(16,22,18,.76));"></div>
        <div class="container-wide relative flex min-h-[calc(92svh-82px)] items-end pb-12 md:pb-16">
          <div class="w-full text-white">
            <div class="mb-7 flex flex-wrap items-center justify-between gap-4 border-b pb-5" style="border-color: rgba(255,255,255,.28);">
              <p class="text-[10px] font-semibold uppercase tracking-[.24em] text-white/68">{{ p.ref }} · Completed project</p>
              <p class="text-[10px] font-semibold uppercase tracking-[.24em] text-white/68">{{ p.location.area }} · {{ p.specs.yearRenovated }}</p>
            </div>
            <h1 class="text-[clamp(4.5rem,10vw,10rem)] leading-[.8]" style="color: white;">{{ p.name }}</h1>
            <div class="mt-9 grid gap-8 border-t border-white/25 pt-6 md:grid-cols-[1fr_auto] md:items-end">
              <p class="max-w-2xl text-[1.05rem] leading-relaxed text-white/70">{{ p.standfirst }}</p>
              <div class="flex items-baseline gap-4 md:justify-end">
                <p class="display-serif text-[clamp(4.5rem,8vw,7.8rem)] leading-none text-white">2<span class="mx-3 text-[.38em] text-white/55">→</span>4</p>
                <p class="pb-2 text-[9px] font-semibold uppercase tracking-[.22em] text-white/55">Bedrooms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Case-study introduction -->
      <section class="py-24 md:py-36" style="background: var(--color-canvas);">
        <div class="container-wide grid gap-14 lg:grid-cols-[.55fr_1.45fr]">
          <div data-reveal>
            <p class="eyebrow">Case study</p>
            <p class="mt-5 index-label">Project 01 / {{ p.ref }}</p>
          </div>
          <div>
            <h2 class="max-w-5xl text-[clamp(3.2rem,6.5vw,6.7rem)]" data-reveal>{{ p.headline }}</h2>
            <div class="mt-12 grid gap-8 border-t pt-8 md:grid-cols-2" style="border-color: var(--color-line);">
              @for (paragraph of p.story; track $index) {
                <p class="text-[1rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="$index * 60">{{ paragraph }}</p>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Project record -->
      <section class="border-y" style="border-color: var(--color-line-strong); background: var(--color-surface);">
        <div class="container-wide grid md:grid-cols-5">
          @for (fact of facts(); track fact.label; let i = $index) {
            <div class="border-b py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0" style="border-color: var(--color-line-strong);" data-reveal [revealDelay]="i * 50">
              <p class="index-label">{{ fact.label }}</p>
              <p class="mt-3 display-serif text-2xl">{{ fact.value }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Delivery logic -->
      <section class="py-24 md:py-36" style="background: var(--color-mist);">
        <div class="container-wide">
          <div class="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div data-reveal>
              <p class="eyebrow mb-5">The transformation</p>
              <h2 class="max-w-xl text-[clamp(3rem,5vw,5rem)]">Two additional bedrooms. One resolved home.</h2>
              <p class="mt-7 max-w-md text-[15px] leading-relaxed" style="color: var(--color-slate);">
                The value case depended on using the existing house more intelligently, then carrying that revised plan through a complete refurbishment.
              </p>
            </div>
            <div class="grid border-l border-t md:grid-cols-3" style="border-color: var(--color-line-strong);">
              @for (phase of phases; track phase.title; let i = $index) {
                <div class="min-h-[350px] border-b border-r p-7" style="border-color: var(--color-line-strong);" data-reveal [revealDelay]="i * 70">
                  <p class="index-label">0{{ i + 1 }}</p>
                  <h3 class="mt-20 text-3xl">{{ phase.title }}</h3>
                  <p class="mt-4 text-[14px]" style="color: var(--color-slate);">{{ phase.body }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Editorial image sequence -->
      <section class="py-20 md:py-28" style="background: var(--color-ink); color: var(--color-canvas);">
        <div class="container-wide">
          <div class="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div data-reveal>
              <p class="eyebrow mb-5" style="color: var(--color-oak-soft);">Completed details</p>
              <h2 class="text-[clamp(3.5rem,7vw,7rem)]" style="color: var(--color-canvas);">Room by room.</h2>
            </div>
            <p class="max-w-md text-[14px]" style="color: rgba(244,241,234,.58);">The material language carries from the principal rooms into the smallest details.</p>
          </div>

          <div class="grid gap-5 md:grid-cols-12">
            @for (room of p.rooms; track room.image; let i = $index) {
              <figure [class]="galleryClass(i)" data-reveal [revealDelay]="(i % 3) * 60">
                <div class="image-wash h-full min-h-[360px] overflow-hidden">
                  <img [src]="room.image" [alt]="room.caption" class="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-[1.02]" loading="lazy" />
                </div>
                <figcaption class="mt-3 flex items-baseline justify-between gap-4">
                  <p class="display-serif text-xl" style="color: var(--color-canvas);">{{ room.name }}</p>
                  <p class="text-[9px] uppercase tracking-[.18em]" style="color: rgba(244,241,234,.45);">{{ room.floor }}</p>
                </figcaption>
              </figure>
            }
          </div>
        </div>
      </section>

      <!-- Specification and stewardship -->
      <section class="py-24 md:py-36" style="background: var(--color-surface);">
        <div class="container-wide grid gap-16 lg:grid-cols-2">
          <div>
            <p class="eyebrow mb-5" data-reveal>Specification</p>
            <h2 class="text-[clamp(3rem,5vw,5rem)]" data-reveal>Built around durability.</h2>
            <ul class="mt-10 border-t" style="border-color: var(--color-line-strong);">
              @for (feature of p.features; track feature; let i = $index) {
                <li class="grid grid-cols-[38px_1fr] border-b py-4 text-[14px]" style="border-color: var(--color-line);" data-reveal [revealDelay]="i * 35">
                  <span class="index-label">{{ (i + 1).toString().padStart(2, '0') }}</span><span>{{ feature }}</span>
                </li>
              }
            </ul>
          </div>
          <div>
            <p class="eyebrow mb-5" data-reveal>Stewardship</p>
            <h2 class="text-[clamp(3rem,5vw,5rem)]" data-reveal>Improved with the long term in mind.</h2>
            <div class="mt-10 grid border-l border-t sm:grid-cols-2" style="border-color: var(--color-line-strong);">
              @for (item of p.sustainability; track item.title; let i = $index) {
                <div class="border-b border-r p-6" style="border-color: var(--color-line-strong);" data-reveal [revealDelay]="i * 50">
                  <p class="index-label">0{{ i + 1 }}</p>
                  <h3 class="mt-10 text-2xl">{{ item.title }}</h3>
                  <p class="mt-3 text-[13px]" style="color: var(--color-slate);">{{ item.detail }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Case-study close -->
      <section class="py-24 md:py-36" style="background: var(--color-oak-soft);">
        <div class="container-wide grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div data-reveal>
            <p class="eyebrow mb-5">What {{ p.name }} demonstrates</p>
            <h2 class="max-w-5xl text-[clamp(3.3rem,6.5vw,6.6rem)]">A two-bedroom starting point. A four-bedroom result.</h2>
          </div>
          <div data-reveal [revealDelay]="80">
            <p class="max-w-md text-[1rem]" style="color: var(--color-slate);">
              {{ p.name }} turns ZenithStay’s approach into evidence: identify latent residential potential, resolve the configuration and deliver the whole asset to a consistent standard.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a routerLink="/strategy" class="btn btn-primary">Investment approach</a>
              <a routerLink="/enquire" class="btn btn-ghost">Start a conversation</a>
            </div>
          </div>
        </div>
      </section>
    } @else {
      <section class="grid min-h-screen place-items-center pt-28" style="background: var(--color-canvas);">
        <div class="container-prose text-center">
          <p class="eyebrow mb-5">Project not found</p>
          <h1 class="text-6xl">This case study has moved.</h1>
          <a routerLink="/portfolio" class="btn btn-primary mt-8">View projects</a>
        </div>
      </section>
    }
  `,
})
export class PropertyDetailComponent {
  private readonly svc = inject(PropertyService);
  readonly slug = input.required<string>();
  readonly property = computed(() => this.svc.bySlug(this.slug()));

  readonly facts = computed(() => {
    const project = this.property();
    if (!project) return [];
    return [
      { label: 'Status', value: 'Completed' },
      { label: 'Starting point', value: `${project.specs.originalBedrooms ?? 2}-bedroom house` },
      { label: 'Completed form', value: `${project.specs.bedrooms}-bedroom home` },
      { label: 'Scope', value: 'Reconfiguration + refurbishment' },
      { label: 'Completion', value: String(project.specs.yearRenovated ?? '—') },
    ];
  });

  readonly phases = [
    { title: 'Reconfigure', body: 'Rework the existing two-bedroom arrangement into a credible four-bedroom plan with better use of the available space.' },
    { title: 'Rebuild', body: 'Carry the new layout through a comprehensive refurbishment, coordinating rooms, services, materials and performance.' },
    { title: 'Refine', body: 'Apply a consistent finish across the house so the completed four-bedroom home reads as one intentional asset.' },
  ];

  galleryClass(index: number): string {
    const pattern = [
      'md:col-span-7', 'md:col-span-5 md:mt-24', 'md:col-span-5', 'md:col-span-7 md:mt-16',
      'md:col-span-8', 'md:col-span-4 md:mt-28', 'md:col-span-4', 'md:col-span-8 md:mt-20',
      'md:col-span-6', 'md:col-span-6 md:mt-16', 'md:col-span-12',
    ];
    return pattern[index % pattern.length];
  }
}
