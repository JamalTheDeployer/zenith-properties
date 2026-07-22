import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { PropertyService } from '../../core/property.service';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  styles: [`
    .project-film-stage {
      aspect-ratio: 16 / 9;
      background: #111813;
    }

    .project-film-frame {
      --film-delay: 0s;
      animation: project-film-frame 32s infinite both;
      animation-delay: var(--film-delay);
      opacity: 0;
    }

    .project-film-frame img {
      animation: project-film-move 32s infinite linear both;
      animation-delay: var(--film-delay);
      transform: scale(1.025);
    }

    @keyframes project-film-frame {
      0% { opacity: 0; }
      1.5%, 12.75% { opacity: 1; }
      14.5%, 100% { opacity: 0; }
    }

    @keyframes project-film-move {
      0% { transform: scale(1.025) translate3d(-.4%, .2%, 0); }
      14.5% { transform: scale(1.095) translate3d(.4%, -.35%, 0); }
      100% { transform: scale(1.095) translate3d(.4%, -.35%, 0); }
    }

    @media (max-width: 767px) {
      .project-film-stage { aspect-ratio: 4 / 5; }
    }

    @media (prefers-reduced-motion: reduce) {
      .project-film-frame,
      .project-film-frame img { animation: none; }
      .project-film-frame:first-child { opacity: 1; }
    }
  `],
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

      <!-- Cinematic project sequence -->
      <section class="overflow-hidden py-20 md:py-28" style="background: var(--color-ink); color: var(--color-canvas);">
        <div class="container-wide">
          <div class="grid gap-10 border-b pb-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end" style="border-color: rgba(244,241,234,.18);">
            <div data-reveal>
              <p class="eyebrow mb-5" style="color: var(--color-oak-soft);">Project film · 32 seconds</p>
              <h2 class="max-w-5xl text-[clamp(3.3rem,6vw,6.4rem)]" style="color: var(--color-canvas);">From opened structure to finished home.</h2>
            </div>
            <p class="max-w-xl text-[15px] leading-relaxed lg:justify-self-end" style="color: rgba(244,241,234,.58);" data-reveal [revealDelay]="70">
              A concise visual sequence moves from the structural intervention through to the completed four-bedroom home—presented as evidence of delivery, not a property reel.
            </p>
          </div>

          <div class="project-film-stage relative mt-10 overflow-hidden border" style="border-color: rgba(244,241,234,.16);" aria-label="Priory Road transformation sequence" data-reveal>
            @for (shot of film; track shot.image; let i = $index) {
              <figure class="project-film-frame absolute inset-0" [style.--film-delay]="filmDelay(i)" aria-hidden="true">
                <img [src]="shot.image" alt="" class="absolute inset-0 h-full w-full object-cover" [attr.loading]="i === 0 ? 'eager' : 'lazy'" />
                <figcaption class="absolute bottom-7 left-7 z-20 max-w-sm md:bottom-10 md:left-10">
                  <p class="text-[9px] font-semibold uppercase tracking-[.23em] text-white/55">{{ (i + 1).toString().padStart(2, '0') }} / {{ shot.chapter }}</p>
                  <p class="mt-2 display-serif text-3xl text-white md:text-5xl">{{ shot.label }}</p>
                </figcaption>
              </figure>
            }
            <div class="pointer-events-none absolute inset-0 z-10" style="background: linear-gradient(180deg, rgba(8,13,10,.14), rgba(8,13,10,.08) 42%, rgba(8,13,10,.82));"></div>
            <div class="pointer-events-none absolute left-7 right-7 top-7 z-20 flex items-center justify-between border-b pb-4 md:left-10 md:right-10 md:top-9" style="border-color: rgba(255,255,255,.28);">
              <p class="text-[9px] font-semibold uppercase tracking-[.23em] text-white/70">Priory Road · {{ p.ref }}</p>
              <p class="text-[9px] font-semibold uppercase tracking-[.23em] text-white/70">Two bedrooms <span class="mx-2 text-white/35">→</span> Four bedrooms</p>
            </div>
          </div>

          <div class="mt-5 grid grid-cols-8 gap-2" aria-hidden="true">
            @for (shot of film; track shot.image) {
              <span class="h-px" style="background: rgba(244,241,234,.28);"></span>
            }
          </div>
        </div>
      </section>

      @if (p.development?.length) {
        <!-- Development evidence -->
        <section class="py-24 md:py-36" style="background: var(--color-canvas);">
          <div class="container-wide">
            <div class="grid gap-10 border-b pb-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end" style="border-color: var(--color-line-strong);">
              <div data-reveal>
                <p class="eyebrow mb-5">Development record</p>
                <h2 class="max-w-4xl text-[clamp(3.2rem,6vw,6.2rem)]">Evidence of the work, not just the finish.</h2>
              </div>
              <p class="max-w-xl text-[15px] leading-relaxed lg:justify-self-end" style="color: var(--color-slate);" data-reveal [revealDelay]="70">
                Selected stages show how Priory Road moved from an opened structure to a resolved four-bedroom home. The record matters: it makes the scope, sequence and substance of the intervention visible.
              </p>
            </div>

            <div class="mt-12 grid gap-x-5 gap-y-16 md:grid-cols-12 md:gap-y-24">
              @for (item of p.development; track item.image; let i = $index) {
                <figure [class]="developmentClass(i)" data-reveal [revealDelay]="(i % 2) * 70">
                  <div [class]="developmentImageClass(i)">
                    <img [src]="item.image" [alt]="item.stage + ' at Priory Road'" class="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-[1.015]" loading="lazy" />
                  </div>
                  <figcaption class="mt-4 grid grid-cols-[44px_1fr] gap-4 border-t pt-4" style="border-color: var(--color-line);">
                    <p class="index-label">{{ (i + 1).toString().padStart(2, '0') }}</p>
                    <div>
                      <h3 class="text-2xl">{{ item.stage }}</h3>
                      <p class="mt-2 max-w-xl text-[13px]" style="color: var(--color-slate);">{{ item.caption }}</p>
                    </div>
                  </figcaption>
                </figure>
              }
            </div>
          </div>
        </section>
      }

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

  readonly film = [
    { image: 'properties/priory-road/development-stripped-shell.jpg', chapter: 'Opening', label: 'The structure opened' },
    { image: 'properties/priory-road/development-spatial-frame.jpg', chapter: 'Planning', label: 'A new spatial order' },
    { image: 'properties/priory-road/development-first-fix.jpg', chapter: 'Delivery', label: 'Services coordinated' },
    { image: 'properties/priory-road/development-loft-room.jpg', chapter: 'Volume', label: 'Additional accommodation' },
    { image: 'properties/priory-road/development-kitchen-fitout.jpg', chapter: 'Fit-out', label: 'The material plan arrives' },
    { image: 'properties/priory-road/clean/kitchen-clean.jpg', chapter: 'Completion', label: 'A resolved kitchen' },
    { image: 'properties/priory-road/clean/furnished-bedroom-clean.jpg', chapter: 'Completion', label: 'Four credible bedrooms' },
    { image: 'properties/priory-road/clean/staircase-clean.jpg', chapter: 'Result', label: 'One coherent home' },
  ];

  filmDelay(index: number): string {
    return `${(index * 4) - 0.5}s`;
  }

  galleryClass(index: number): string {
    const pattern = [
      'md:col-span-7', 'md:col-span-5 md:mt-24', 'md:col-span-5', 'md:col-span-7 md:mt-16',
      'md:col-span-8', 'md:col-span-4 md:mt-28', 'md:col-span-4', 'md:col-span-8 md:mt-20',
      'md:col-span-6', 'md:col-span-6 md:mt-16', 'md:col-span-12',
    ];
    return pattern[index % pattern.length];
  }

  developmentClass(index: number): string {
    const pattern = [
      'md:col-span-5', 'md:col-span-7 md:pt-24',
      'md:col-span-7', 'md:col-span-5 md:pt-24',
      'md:col-span-5', 'md:col-span-7 md:pt-24',
    ];
    return pattern[index % pattern.length];
  }

  developmentImageClass(index: number): string {
    const pattern = [
      'image-wash h-[520px] overflow-hidden md:h-[720px]',
      'image-wash h-[500px] overflow-hidden md:h-[650px]',
      'image-wash h-[500px] overflow-hidden md:h-[650px]',
      'image-wash h-[440px] overflow-hidden md:h-[520px]',
      'image-wash h-[520px] overflow-hidden md:h-[720px]',
      'image-wash h-[500px] overflow-hidden md:h-[650px]',
    ];
    return pattern[index % pattern.length];
  }
}
