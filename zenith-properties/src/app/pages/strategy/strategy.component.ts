import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-strategy',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="border-b pb-20 pt-40 md:pb-28 md:pt-48" style="border-color: var(--color-line); background: var(--color-canvas);">
      <div class="container-wide grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
        <div data-reveal>
          <p class="eyebrow">Investment approach</p>
          <p class="mt-5 index-label">Selective by design</p>
        </div>
        <div>
          <h1 class="max-w-5xl text-[clamp(4.2rem,8.5vw,8.6rem)]" data-reveal>Find the potential.<br><em class="font-normal">Build the value.</em></h1>
          <p class="mt-10 max-w-2xl text-[1.08rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="80">
            ZenithStay takes a measured approach to residential property: understand the opportunity, define the improvement case and make decisions that remain sensible beyond the completion date.
          </p>
        </div>
      </div>
    </section>

    <section class="py-24 md:py-36" style="background: var(--color-surface);">
      <div class="container-wide">
        <div class="mb-14 grid gap-8 lg:grid-cols-2">
          <p class="eyebrow" data-reveal>01 · Acquisition lens</p>
          <h2 class="text-[clamp(3rem,5.5vw,5.6rem)]" data-reveal>Quality begins before the keys change hands.</h2>
        </div>
        <div class="grid border-l border-t md:grid-cols-3" style="border-color: var(--color-line-strong);">
          @for (criterion of criteria; track criterion.title; let i = $index) {
            <article class="min-h-[340px] border-b border-r p-7 md:p-9" style="border-color: var(--color-line-strong);" data-reveal [revealDelay]="i * 70">
              <p class="index-label">0{{ i + 1 }}</p>
              <h3 class="mt-20 text-3xl">{{ criterion.title }}</h3>
              <p class="mt-4 text-[14px]" style="color: var(--color-slate);">{{ criterion.body }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="py-24 md:py-36" style="background: var(--color-ink); color: var(--color-canvas);">
      <div class="container-wide grid gap-14 lg:grid-cols-[.65fr_1.35fr]">
        <div data-reveal>
          <p class="eyebrow" style="color: var(--color-oak-soft);">02 · Value creation</p>
          <p class="mt-5 max-w-xs text-[13px]" style="color: rgba(244,241,234,.5);">Capital is directed to decisions that improve how the property works, feels and performs.</p>
        </div>
        <div>
          @for (lever of levers; track lever.title; let i = $index) {
            <div class="grid gap-6 border-t py-9 md:grid-cols-[80px_.7fr_1.3fr]" style="border-color: rgba(244,241,234,.2);" data-reveal [revealDelay]="i * 55">
              <p class="text-[10px] font-semibold uppercase tracking-[.2em]" style="color: rgba(244,241,234,.4);">0{{ i + 1 }}</p>
              <h3 class="text-3xl" style="color: var(--color-canvas);">{{ lever.title }}</h3>
              <p class="text-[14px]" style="color: rgba(244,241,234,.62);">{{ lever.body }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="py-24 md:py-36" style="background: var(--color-mist);">
      <div class="container-wide grid gap-14 lg:grid-cols-[1fr_1fr]">
        <div data-reveal>
          <p class="eyebrow mb-5">03 · Risk discipline</p>
          <h2 class="max-w-2xl text-[clamp(3.1rem,5.5vw,5.7rem)]">Protect the downside before celebrating the upside.</h2>
        </div>
        <div class="border-t" style="border-color: var(--color-line-strong);">
          @for (item of discipline; track item.title; let i = $index) {
            <div class="grid grid-cols-[54px_1fr] gap-4 border-b py-6" style="border-color: var(--color-line-strong);" data-reveal [revealDelay]="i * 50">
              <span class="index-label">0{{ i + 1 }}</span>
              <div><h3 class="text-2xl">{{ item.title }}</h3><p class="mt-2 text-[14px]" style="color: var(--color-slate);">{{ item.body }}</p></div>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="py-24 md:py-36" style="background: var(--color-oak-soft);">
      <div class="container-wide grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
        <div data-reveal>
          <p class="eyebrow mb-5">Partner with ZenithStay</p>
          <h2 class="max-w-5xl text-[clamp(3.4rem,6.5vw,6.8rem)]">Good opportunities move through trusted relationships.</h2>
        </div>
        <div data-reveal [revealDelay]="80">
          <p class="max-w-md" style="color: var(--color-slate);">We welcome conversations with lenders, investors, agents, vendors and professional advisers aligned with a considered approach to residential property.</p>
          <a routerLink="/enquire" class="btn btn-primary mt-8">Start a conversation</a>
        </div>
      </div>
    </section>
  `,
})
export class StrategyComponent {
  readonly criteria = [
    { title: 'Underlying quality', body: 'Residential assets with sound fundamentals and the potential to become materially better through focused intervention.' },
    { title: 'Visible opportunity', body: 'Condition, configuration or presentation that creates a credible improvement case—not value dependent on wishful assumptions.' },
    { title: 'Strategic fit', body: 'Projects that complement the existing portfolio, support long-term ownership and strengthen the route to the next acquisition.' },
  ];

  readonly levers = [
    { title: 'Layout', body: 'Use space intelligently and remove friction from the way the home is lived in.' },
    { title: 'Specification', body: 'Balance visual identity with materials and details chosen to perform over time.' },
    { title: 'Performance', body: 'Improve the building fabric and systems where the evidence supports meaningful operational benefit.' },
    { title: 'Presentation', body: 'Create a coherent finished asset whose quality is immediately legible to occupiers, valuers and partners.' },
  ];

  readonly discipline = [
    { title: 'Evidence before narrative', body: 'The acquisition case should stand up on fundamentals before design ambition is added.' },
    { title: 'Scope before spend', body: 'Define what creates value, what protects the asset and what is simply unnecessary.' },
    { title: 'Contingency in the plan', body: 'Allow for the realities of delivery rather than presenting a best-case programme as certainty.' },
    { title: 'Multiple routes forward', body: 'Retain flexibility around operation, refinance and long-term ownership as conditions evolve.' },
  ];
}
