import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="pb-20 pt-40 md:pb-28 md:pt-48" style="background: var(--color-canvas);">
      <div class="container-wide grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
        <div data-reveal>
          <p class="eyebrow">About ZenithStay</p>
          <p class="mt-5 index-label">Independent · Focused · Long term</p>
        </div>
        <div>
          <h1 class="max-w-5xl text-[clamp(4.2rem,8.8vw,8.8rem)]" data-reveal>A property company<br><em class="font-normal">built from the work.</em></h1>
        </div>
      </div>
    </section>

    <section class="pb-24 md:pb-36" style="background: var(--color-canvas);">
      <div class="container-wide">
        <div class="image-wash h-[64vh] min-h-[500px]" data-reveal>
          <img src="properties/priory-road/clean/walnut-door-clean.jpg" alt="Walnut detailing at Priory Road" class="h-full w-full object-cover" loading="eager" />
        </div>
      </div>
    </section>

    <section class="py-24 md:py-36" style="background: var(--color-surface);">
      <div class="container-wide grid gap-14 lg:grid-cols-[.55fr_1.45fr]">
        <div data-reveal><p class="eyebrow">Why ZenithStay exists</p></div>
        <div>
          <h2 class="max-w-5xl text-[clamp(3.1rem,6vw,6.2rem)]" data-reveal>To build a residential portfolio where the quality of every decision can be seen in the asset.</h2>
          <div class="mt-12 grid gap-8 border-t pt-8 md:grid-cols-2" style="border-color: var(--color-line);">
            <p class="text-[1rem]" style="color: var(--color-slate);" data-reveal>
              ZenithStay Properties Limited is an independent property company focused on acquiring, reconfiguring and improving residential assets. Priory Road is the first completed project: a two-bedroom house transformed into a four-bedroom home.
            </p>
            <p class="text-[1rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="70">
              The ambition is measured growth. Each acquisition should demonstrate sound thinking, strengthen the portfolio and create the credibility required to pursue the next opportunity with the right partners.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 md:py-36" style="background: var(--color-mist);">
      <div class="container-wide">
        <p class="eyebrow mb-12" data-reveal>The principles</p>
        <div class="grid border-l border-t md:grid-cols-2" style="border-color: var(--color-line-strong);">
          @for (principle of principles; track principle.title; let i = $index) {
            <article class="min-h-[320px] border-b border-r p-8 md:p-10" style="border-color: var(--color-line-strong);" data-reveal [revealDelay]="i * 60">
              <p class="index-label">0{{ i + 1 }}</p>
              <h3 class="mt-16 text-[2.4rem]">{{ principle.title }}</h3>
              <p class="mt-4 max-w-md text-[14px]" style="color: var(--color-slate);">{{ principle.body }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="py-24 md:py-36" style="background: var(--color-ink); color: var(--color-canvas);">
      <div class="container-wide grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
        <div data-reveal>
          <p class="eyebrow mb-5" style="color: var(--color-oak-soft);">A growing business</p>
          <h2 class="max-w-5xl text-[clamp(3.5rem,7vw,7rem)]" style="color: var(--color-canvas);">A growing track record. A clear standard for what comes next.</h2>
        </div>
        <div data-reveal [revealDelay]="80">
          <p class="max-w-md" style="color: rgba(244,241,234,.62);">Explore the project track record or speak with ZenithStay about finance, investment, sourcing and professional partnerships.</p>
          <div class="mt-8 flex flex-wrap gap-3"><a routerLink="/portfolio" class="btn btn-oak">View projects</a><a routerLink="/enquire" class="btn btn-light">Get in touch</a></div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  readonly principles = [
    { title: 'Be selective', body: 'The quality of the portfolio matters more than the pace at which it grows.' },
    { title: 'Make it coherent', body: 'Property, design, delivery and finance should support the same long-term objective.' },
    { title: 'Show the evidence', body: 'Completed work, clear records and honest communication build stronger relationships than inflated claims.' },
    { title: 'Think beyond completion', body: 'A project is successful when the asset continues to perform after the photographs are taken.' },
  ];
}
