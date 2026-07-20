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
    <section class="relative isolate min-h-[100svh] overflow-hidden bg-black pt-[82px] text-white">
      <div class="absolute inset-x-0 bottom-0 top-[82px] -z-20">
        <img [src]="latestProject.heroImage" alt="Completed ZenithStay residential interior"
             class="h-full w-full object-cover" loading="eager" />
      </div>
      <div class="absolute inset-x-0 bottom-0 top-[82px] -z-10"
           style="background: linear-gradient(90deg, rgba(10,14,12,.9) 0%, rgba(10,14,12,.65) 43%, rgba(10,14,12,.16) 76%), linear-gradient(0deg, rgba(10,14,12,.72), transparent 58%);"></div>

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

          <aside class="border border-white/25 bg-black/25 p-6 backdrop-blur-md md:p-8" data-reveal [revealDelay]="90">
            <p class="text-[11px] font-semibold uppercase tracking-[.18em] text-white/58">Operating mandate</p>
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
})
export class HomeComponent {
  private readonly svc = inject(PropertyService);
  readonly latestProject = this.svc.featured();

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
