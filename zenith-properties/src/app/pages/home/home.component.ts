import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { PropertyService } from '../../core/property.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <!-- Cinematic company opening -->
    <section class="brand-film relative isolate min-h-[100svh] overflow-hidden bg-black pt-[82px] text-white"
             [class.brand-film--paused]="filmPaused">
      <div class="brand-film__media absolute inset-x-0 bottom-0 top-[82px] -z-30" aria-hidden="true">
        @for (frame of brandFilmFrames; track frame.src; let i = $index) {
          <figure class="brand-film__frame" [style.--frame-index]="i">
            <img [src]="frame.src" alt="" [style.object-position]="frame.position"
                 [attr.loading]="i === 0 ? 'eager' : 'lazy'"
                 [attr.fetchpriority]="i === 0 ? 'high' : null" />
          </figure>
        }
      </div>
      <div class="brand-film__veil absolute inset-x-0 bottom-0 top-[82px] -z-20"></div>
      <div class="brand-film__grain absolute inset-x-0 bottom-0 top-[82px] -z-10" aria-hidden="true"></div>

      <div class="container-wide pointer-events-none absolute inset-x-0 top-[104px] z-20 flex items-center justify-between">
        <p class="hidden text-[10px] font-semibold uppercase tracking-[.2em] text-white/52 md:block">UK residential investment · Built evidence</p>
        <button type="button" class="brand-film__motion-control pointer-events-auto inline-flex items-center gap-3 border border-white/25 bg-black/20 px-4 py-3 text-[10px] font-semibold uppercase tracking-[.16em] text-white/72 backdrop-blur-md transition-colors hover:border-white/50 hover:text-white"
                (click)="toggleFilm()" [attr.aria-pressed]="filmPaused">
          <span class="brand-film__control-icon" aria-hidden="true">
            @if (filmPaused) { <span class="brand-film__play">▶</span> } @else { <span class="brand-film__pause">Ⅱ</span> }
          </span>
          {{ filmPaused ? 'Play visual sequence' : 'Pause visual sequence' }}
        </button>
      </div>

      <div class="container-wide flex min-h-[calc(100svh-82px)] items-end py-10 md:py-14">
        <div class="grid w-full gap-10 lg:grid-cols-[1.28fr_.72fr] lg:items-end">
          <div data-reveal>
            <div class="mb-7 flex items-center gap-4">
              <span class="h-px w-12 bg-white/50"></span>
              <p class="text-[11px] font-semibold uppercase tracking-[.22em] text-white/72">ZenithStay Properties Limited</p>
            </div>
            <h1 class="max-w-5xl text-[clamp(3.55rem,7.6vw,8.1rem)] leading-[.86]" style="color: white;">
              Residential value,<br><em class="font-normal text-white/80">deliberately created.</em>
            </h1>
            <div class="mt-9 grid max-w-3xl gap-7 border-t border-white/30 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <p class="max-w-2xl text-[1.02rem] leading-[1.72] text-white/76 md:text-[1.1rem]">
                We acquire residential property where configuration, condition or presentation leaves clear room for improvement. Each project is planned around a defined value case, disciplined delivery and a long-term view of the completed asset.
              </p>
              <a routerLink="/portfolio" class="btn btn-light shrink-0">View our work</a>
            </div>
          </div>

          <aside class="border border-white/25 bg-black/30 p-6 backdrop-blur-md md:p-8" data-reveal [revealDelay]="90">
            <div class="mb-7 flex items-center justify-between gap-5 border-b border-white/20 pb-5">
              <p class="text-[11px] font-semibold uppercase tracking-[.18em] text-white/58">Operating mandate</p>
              <div class="relative h-4 min-w-[126px] overflow-hidden text-right" aria-hidden="true">
                @for (frame of brandFilmFrames; track frame.label; let i = $index) {
                  <p class="brand-film__phase absolute inset-0 text-[10px] font-semibold uppercase tracking-[.16em] text-white/68"
                     [style.--frame-index]="i">0{{ i + 1 }} · {{ frame.label }}</p>
                }
              </div>
            </div>
            <div class="mt-8 space-y-5">
              @for (signal of companySignals; track signal.label) {
                <div class="grid grid-cols-[92px_1fr] gap-4 border-t border-white/20 pt-4">
                  <p class="text-[10px] font-semibold uppercase tracking-[.14em] text-white/48">{{ signal.label }}</p>
                  <p class="display-serif text-[1.35rem] text-white/90">{{ signal.value }}</p>
                </div>
              }
            </div>
            <a routerLink="/strategy" class="mt-8 inline-flex text-[11px] font-semibold uppercase tracking-[.16em] text-white">Read our investment approach <span class="ml-3">→</span></a>
          </aside>
        </div>
      </div>

      <div class="brand-film__timeline pointer-events-none absolute inset-x-0 bottom-0 z-20 grid grid-cols-4" aria-hidden="true">
        @for (frame of brandFilmFrames; track frame.label; let i = $index) {
          <span class="brand-film__timeline-segment" [style.--frame-index]="i"></span>
        }
      </div>
    </section>

    <!-- Mandate and positioning -->
    <section class="py-24 md:py-36" style="background: var(--color-canvas);">
      <div class="container-wide">
        <div class="grid gap-10 lg:grid-cols-[.42fr_1.58fr]">
          <div data-reveal>
            <p class="eyebrow">The mandate</p>
            <p class="mt-5 max-w-[210px] text-[13px] leading-relaxed" style="color: var(--color-muted);">Independent residential investment · United Kingdom</p>
          </div>
          <div>
            <h2 class="max-w-6xl text-[clamp(3.2rem,6.5vw,6.7rem)] leading-[.92]" data-reveal>
              A focused property company where every acquisition must <em class="font-normal" style="color: var(--color-oak-deep);">justify its place.</em>
            </h2>
            <div class="mt-12 grid gap-8 border-t pt-8 md:grid-cols-[1.08fr_.92fr]" style="border-color: var(--color-line-strong);" data-reveal [revealDelay]="70">
              <p class="max-w-2xl text-[1.08rem] leading-[1.75]" style="color: var(--color-slate);">
                ZenithStay Properties Limited is an independent property company building a focused UK residential portfolio. We look for homes where a better layout, considered refurbishment and clear specification can create lasting utility rather than a short-term cosmetic uplift.
              </p>
              <p class="max-w-xl text-[16px] leading-[1.75]" style="color: var(--color-muted);">
                Our decisions begin with the asset itself: its existing accommodation, realistic improvement scope, delivery complexity, total capital requirement and fit with the wider portfolio. The objective is measured growth supported by completed evidence that lenders, advisers and investment partners can understand.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-20 grid gap-px overflow-hidden border" style="border-color: var(--color-line-strong); background: var(--color-line-strong);" data-reveal>
          <div class="grid gap-px md:grid-cols-3" style="background: var(--color-line-strong);">
            @for (pillar of pillars; track pillar.title; let i = $index) {
              <article class="min-h-[300px] p-7 md:p-9" style="background: var(--color-surface);">
                <div class="flex items-center justify-between">
                  <p class="index-label">0{{ i + 1 }}</p>
                  <span class="display-serif text-2xl" style="color: var(--color-oak);">—</span>
                </div>
                <h3 class="mt-14 text-[2rem]">{{ pillar.title }}</h3>
                <p class="mt-4 max-w-sm text-[15px] leading-[1.72]" style="color: var(--color-slate);">{{ pillar.body }}</p>
              </article>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Featured completed project -->
    <section class="overflow-hidden py-24 md:py-32" style="background: var(--color-ink); color: var(--color-canvas);">
      <div class="container-wide">
        <div class="grid gap-12 lg:grid-cols-[.68fr_1.32fr] lg:items-end">
          <div data-reveal>
            <p class="text-[10px] font-semibold uppercase tracking-[.27em]" style="color: var(--color-oak-soft);">Completed work · {{ latestProject.ref }}</p>
            <h2 class="mt-5 text-[clamp(4rem,7vw,7.4rem)] leading-[.84]" style="color: var(--color-canvas);">{{ latestProject.name }}</h2>
          </div>
          <div class="border-t pt-6" style="border-color: rgba(244,241,234,.24);" data-reveal [revealDelay]="70">
            <p class="max-w-3xl display-serif text-[clamp(2rem,3.2vw,3.4rem)] leading-[1.02]" style="color: rgba(244,241,234,.92);">
              A two-bedroom house reconfigured and comprehensively improved into a four-bedroom home.
            </p>
          </div>
        </div>

        <div class="mt-14 grid gap-5 lg:grid-cols-[1.42fr_.58fr]">
          <a [routerLink]="['/project', latestProject.slug]" class="group relative min-h-[560px] overflow-hidden md:min-h-[720px]" data-reveal>
            <img [src]="latestProject.heroImage" [alt]="latestProject.name + ' completed kitchen'"
                 class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-[1.02]" loading="lazy" />
            <div class="absolute inset-0" style="background: linear-gradient(0deg, rgba(10,14,12,.72), transparent 54%);"></div>
            <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-white md:p-9">
              <p class="max-w-md text-[10px] font-semibold uppercase tracking-[.23em] text-white/72">Full residential reconfiguration and refurbishment</p>
              <p class="text-[10px] font-semibold uppercase tracking-[.2em]">Open case study →</p>
            </div>
          </a>

          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div class="flex min-h-[280px] flex-col justify-between p-7 md:p-9" style="background: var(--color-oak-soft); color: var(--color-ink);" data-reveal [revealDelay]="60">
              <p class="index-label">Configuration</p>
              <div>
                <p class="display-serif text-[clamp(5rem,8vw,8rem)] leading-none">2<span class="mx-3 text-[.45em]" style="color: var(--color-oak-deep);">→</span>4</p>
                <p class="mt-4 text-[11px] font-semibold uppercase tracking-[.2em]" style="color: var(--color-slate);">Bedrooms</p>
              </div>
            </div>
            <div class="relative min-h-[360px] overflow-hidden" data-reveal [revealDelay]="100">
              <img src="properties/priory-road/clean/shower-room-clean.jpg" alt="Completed stone-led shower room at Priory Road" class="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>

        <div class="mt-8 grid gap-9 border-t pt-8 md:grid-cols-[1.28fr_.72fr]" style="border-color: rgba(244,241,234,.2);">
          <div class="max-w-3xl" data-reveal>
            <p class="text-[16px] leading-[1.75]" style="color: rgba(244,241,234,.72);">
              Priory Road began as a two-bedroom house with underused residential capacity. ZenithStay reconfigured the accommodation to create four bedrooms, then coordinated a comprehensive refurbishment across the kitchen, bathrooms, joinery, flooring, lighting and building fabric.
            </p>
            <p class="mt-5 text-[15px] leading-[1.75]" style="color: rgba(244,241,234,.54);">
              The completed home is the first tangible evidence of our model: use space more intelligently, define the work clearly and carry every room through to a consistent standard with long-term everyday utility in mind.
            </p>
            <a [routerLink]="['/project', latestProject.slug]" class="mt-6 inline-flex text-[11px] font-semibold uppercase tracking-[.16em]" style="color: var(--color-oak-soft);">Read the complete case study <span class="ml-3">→</span></a>
          </div>
          <div class="flex flex-wrap gap-x-8 gap-y-3 md:justify-end" data-reveal [revealDelay]="60">
            <p class="text-[11px] font-semibold uppercase tracking-[.16em] text-white/50">Greater London</p>
            <p class="text-[11px] font-semibold uppercase tracking-[.16em] text-white/50">Completed {{ latestProject.specs.yearRenovated }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Operating discipline -->
    <section class="py-24 md:py-36" style="background: var(--color-surface);">
      <div class="container-wide grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
        <div data-reveal>
          <p class="eyebrow mb-5">Operating discipline</p>
          <h2 class="max-w-xl text-[clamp(3.2rem,5.5vw,5.5rem)]">A clear logic from acquisition to ownership.</h2>
          <p class="mt-8 max-w-lg text-[16px] leading-[1.75]" style="color: var(--color-slate);">
            Value is not created by refurbishment alone. It depends on selecting the right starting asset, testing the proposed intervention, controlling delivery and retaining a clear record of the decisions made. That discipline allows the people financing, advising on and working alongside ZenithStay to understand what is being done and why.
          </p>
          <a routerLink="/strategy" class="btn btn-ghost mt-8">Explore the full approach</a>
        </div>

        <ol class="border-t" style="border-color: var(--color-ink);">
          @for (step of model; track step.title; let i = $index) {
            <li class="grid gap-5 border-b py-8 sm:grid-cols-[64px_.55fr_1.45fr] sm:items-start" style="border-color: var(--color-line-strong);" data-reveal [revealDelay]="i * 55">
              <p class="index-label">0{{ i + 1 }}</p>
              <h3 class="text-[2rem]">{{ step.title }}</h3>
              <p class="max-w-xl text-[15px] leading-[1.72]" style="color: var(--color-slate);">{{ step.body }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <!-- Relationship-led growth -->
    <section class="border-t py-24 md:py-32" style="border-color: var(--color-line); background: var(--color-canvas);">
      <div class="container-wide grid gap-14 lg:grid-cols-[.88fr_1.12fr]">
        <div class="lg:pr-10" data-reveal>
          <p class="eyebrow mb-5">Work with ZenithStay</p>
          <h2 class="max-w-2xl text-[clamp(3.3rem,6vw,6.1rem)]">Built through trusted relationships.</h2>
          <p class="mt-8 max-w-xl text-[1rem] leading-[1.75]" style="color: var(--color-slate);">
            ZenithStay is being built through direct, credible relationships with people who understand residential property and value clear communication. Whether a conversation concerns lending, investment, acquisition or delivery, we begin with the asset, the proposed scope, the capital requirement and the long-term rationale.
          </p>
          <a routerLink="/enquire" class="btn btn-primary mt-8">Start a conversation</a>
        </div>

        <div class="border-t" style="border-color: var(--color-ink);">
          @for (audience of audiences; track audience.title; let i = $index) {
            <a routerLink="/enquire" [queryParams]="{ interest: audience.interest }"
               class="group grid gap-4 border-b py-7 sm:grid-cols-[48px_1fr_auto] sm:items-center" style="border-color: var(--color-line-strong);" data-reveal [revealDelay]="i * 50">
              <p class="index-label">0{{ i + 1 }}</p>
              <div>
                <h3 class="text-[1.8rem]">{{ audience.title }}</h3>
                <p class="mt-2 max-w-xl text-[15px] leading-[1.7]" style="color: var(--color-slate);">{{ audience.body }}</p>
              </div>
              <span class="hidden text-2xl transition-transform duration-300 group-hover:translate-x-1 sm:block" style="color: var(--color-oak-deep);">→</span>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .brand-film__frame {
      --frame-duration: 24s;
      position: absolute;
      inset: 0;
      margin: 0;
      opacity: 0;
      overflow: hidden;
      animation: brand-frame var(--frame-duration) ease-in-out infinite both;
      animation-delay: calc(var(--frame-index) * 6s);
    }

    .brand-film__frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(.72) contrast(1.04) brightness(.88);
      transform: scale(1.035);
      animation: brand-drift 24s cubic-bezier(.2,.55,.25,1) infinite both;
      animation-delay: calc(var(--frame-index) * 6s);
      will-change: transform;
    }

    .brand-film__veil {
      background:
        linear-gradient(90deg, rgba(7, 10, 9, .94) 0%, rgba(7, 10, 9, .73) 42%, rgba(7, 10, 9, .22) 78%),
        linear-gradient(0deg, rgba(7, 10, 9, .82) 0%, rgba(7, 10, 9, .08) 64%),
        linear-gradient(180deg, rgba(7, 10, 9, .32) 0%, transparent 30%);
    }

    .brand-film__grain {
      opacity: .11;
      background-image:
        radial-gradient(circle at 20% 30%, rgba(255,255,255,.28) 0 .5px, transparent .7px),
        radial-gradient(circle at 70% 65%, rgba(255,255,255,.18) 0 .45px, transparent .7px);
      background-size: 5px 5px, 7px 7px;
      mix-blend-mode: soft-light;
    }

    .brand-film__phase {
      opacity: 0;
      animation: brand-phase 24s ease-in-out infinite both;
      animation-delay: calc(var(--frame-index) * 6s);
    }

    .brand-film__timeline-segment {
      position: relative;
      height: 2px;
      overflow: hidden;
      background: rgba(255, 255, 255, .18);
    }

    .brand-film__timeline-segment::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, .82);
      transform: translateX(-101%);
      animation: brand-progress 24s linear infinite both;
      animation-delay: calc(var(--frame-index) * 6s);
    }

    .brand-film__control-icon {
      display: inline-grid;
      width: 12px;
      place-items: center;
      color: rgba(255,255,255,.88);
    }

    .brand-film__play {
      font-size: 8px;
      transform: translateX(1px);
    }

    .brand-film__pause {
      font-size: 10px;
      letter-spacing: -2px;
      transform: translateX(-1px);
    }

    .brand-film--paused .brand-film__frame,
    .brand-film--paused .brand-film__frame img,
    .brand-film--paused .brand-film__phase,
    .brand-film--paused .brand-film__timeline-segment::after {
      animation-play-state: paused;
    }

    @keyframes brand-frame {
      0%, 21% { opacity: 1; }
      27%, 94% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes brand-drift {
      0% { transform: scale(1.035) translate3d(0, 0, 0); }
      23% { transform: scale(1.12) translate3d(-1.3%, -1%, 0); }
      100% { transform: scale(1.12) translate3d(-1.3%, -1%, 0); }
    }

    @keyframes brand-phase {
      0%, 20% { opacity: 1; transform: translateY(0); }
      24% { opacity: 0; transform: translateY(-7px); }
      25%, 94% { opacity: 0; transform: translateY(7px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes brand-progress {
      0% { transform: translateX(-101%); }
      24% { transform: translateX(0); }
      25%, 100% { transform: translateX(101%); }
    }

    @media (max-width: 767px) {
      .brand-film__veil {
        background:
          linear-gradient(90deg, rgba(7, 10, 9, .84), rgba(7, 10, 9, .28)),
          linear-gradient(0deg, rgba(7, 10, 9, .9) 0%, rgba(7, 10, 9, .14) 72%);
      }

      .brand-film__frame img {
        filter: saturate(.76) contrast(1.02) brightness(.78);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .brand-film__frame,
      .brand-film__frame img,
      .brand-film__phase,
      .brand-film__timeline-segment::after {
        animation: none !important;
      }

      .brand-film__frame:first-child,
      .brand-film__phase:first-child {
        opacity: 1;
      }

      .brand-film__frame:not(:first-child),
      .brand-film__phase:not(:first-child),
      .brand-film__timeline,
      .brand-film__motion-control {
        display: none;
      }
    }
  `],
})
export class HomeComponent {
  private readonly svc = inject(PropertyService);
  readonly latestProject = this.svc.featured();

  filmPaused = false;

  readonly brandFilmFrames = [
    { src: 'properties/priory-road/clean/kitchen-clean.jpg', position: '58% 48%', label: 'Acquire' },
    { src: 'properties/priory-road/clean/walnut-door-clean.jpg', position: '52% 50%', label: 'Reconfigure' },
    { src: 'properties/priory-road/clean/shower-room-wide-clean.jpg', position: '54% 50%', label: 'Deliver' },
    { src: 'properties/priory-road/clean/staircase-clean.jpg', position: '55% 45%', label: 'Steward' },
  ];

  toggleFilm(): void {
    this.filmPaused = !this.filmPaused;
  }

  readonly companySignals = [
    { label: 'Asset class', value: 'Residential' },
    { label: 'Value case', value: 'Reconfigure · Improve' },
    { label: 'Ownership view', value: 'Long term' },
  ];

  readonly pillars = [
    { title: 'Selective acquisition', body: 'We consider location, existing accommodation, condition and realistic improvement potential together. An opportunity must support a clear residential case before it earns a place in the portfolio.' },
    { title: 'Defined value plan', body: 'The proposed layout, refurbishment scope, specification, delivery complexity and capital requirement are considered as one plan. Investment is directed towards changes that improve how the whole home works.' },
    { title: 'Responsible ownership', body: 'The completed asset is approached with a long-term view of utility, durability and performance. Project evidence is retained so that future decisions can build on what has already been delivered.' },
  ];

  readonly model = [
    { title: 'Acquire', body: 'Assess location, condition, existing configuration, residential demand and strategic fit. The underlying property fundamentals must make sense before an improvement narrative is allowed to form.' },
    { title: 'Resolve', body: 'Translate the opportunity into a coherent layout, scope of work, specification, delivery sequence and capital plan, with the principal risks visible before work begins.' },
    { title: 'Deliver', body: 'Coordinate trades, materials, quality and progress against the defined scope. Changes are judged by whether they protect the utility and integrity of the completed asset.' },
    { title: 'Steward', body: 'Maintain a long-term view of the finished home, retain the project record and carry practical evidence from each completed asset into future acquisition decisions.' },
  ];

  readonly audiences = [
    { title: 'Lenders & finance partners', body: 'Asset-led conversations that set out the existing property, proposed intervention, delivery scope and long-term ownership rationale in a clear, practical way.', interest: 'Lending and finance' },
    { title: 'Investors & strategic partners', body: 'Selective residential opportunities for partners who value tangible property fundamentals, disciplined improvement and measured portfolio growth.', interest: 'Investment partnership' },
    { title: 'Agents & introducers', body: 'A responsive route for residential opportunities where configuration, condition or presentation may be obscuring credible underlying potential.', interest: 'Property opportunity' },
    { title: 'Owners & vendors', body: 'Straightforward conversations about the property, timing, circumstances and whether ZenithStay can provide a sensible route to the next stage.', interest: 'Property opportunity' },
  ];
}
