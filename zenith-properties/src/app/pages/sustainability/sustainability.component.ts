import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RevealDirective } from '../../shared/reveal.directive';
import { PropertyService } from '../../core/property.service';
import { SustainabilityItem } from '../../core/property.model';

@Component({
  selector: 'app-sustainability',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <!-- HERO -->
    <section class="pt-36 pb-20" style="background: var(--color-ink); color: var(--color-canvas);">
      <div class="container-wide">
        <p class="eyebrow mb-4" style="color: var(--color-oak-soft);" data-reveal>Sustainability</p>
        <h1 class="text-[clamp(2.4rem,5vw,4rem)] max-w-3xl text-balance" style="color: var(--color-canvas);" data-reveal>
          Homes that tread lightly, by design.
        </h1>
        <p class="mt-6 max-w-xl text-[1.1rem]" style="color: rgba(251,250,247,0.72);" data-reveal [revealDelay]="80">
          We measure every property not just on how it looks, but on how gently it runs. Renovate rather than
          rebuild; specify for efficiency; and leave a clear path to net-positive.
        </p>
        <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl">
          @for (m of metrics; track m.label) {
            <div data-reveal>
              <p class="display-serif text-4xl" style="color: var(--color-oak-soft);">{{ m.value }}</p>
              <p class="text-[13px] mt-1" style="color: rgba(251,250,247,0.6);">{{ m.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- COMMITMENTS -->
    <section class="py-24" style="background: var(--color-canvas);">
      <div class="container-wide">
        <p class="eyebrow mb-4" data-reveal>At {{ featured.name }}</p>
        <h2 class="text-[clamp(1.8rem,3.4vw,2.6rem)] max-w-2xl text-balance mb-12" data-reveal>
          What "runs gently" looks like in practice.
        </h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (s of featured.sustainability; track s.title; let i = $index) {
            <div class="surface-card p-8" style="border-radius: var(--radius-lg);" data-reveal [revealDelay]="(i % 3) * 80">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-full mb-5" style="background: var(--color-sage-soft);">
                <span [innerHTML]="icon(s.icon)"></span>
              </span>
              <h3 class="display-serif text-xl mb-2">{{ s.title }}</h3>
              <p class="text-[15px]" style="color: var(--color-slate);">{{ s.detail }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ROADMAP -->
    <section class="py-24" style="background: var(--color-mist);">
      <div class="container-wide">
        <div class="max-w-2xl mb-12">
          <p class="eyebrow mb-4" data-reveal>The roadmap</p>
          <h2 class="text-[clamp(1.8rem,3.4vw,2.6rem)] text-balance" data-reveal>From efficient to net-positive.</h2>
          <p class="mt-4 text-[1.05rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="60">
            A staged plan, applied to each home as it joins the portfolio. Edit the dates and status as work
            completes.
          </p>
        </div>
        <ol class="relative border-l-2 pl-8 space-y-10" style="border-color: var(--color-line-strong);">
          @for (step of roadmap; track step.title; let i = $index) {
            <li class="relative" data-reveal [revealDelay]="i * 70">
              <span class="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-2"
                    [style.background]="step.done ? 'var(--color-sage)' : 'var(--color-canvas)'"
                    style="border-color: var(--color-sage);"></span>
              <div class="flex items-center gap-3 flex-wrap">
                <h3 class="display-serif text-xl">{{ step.title }}</h3>
                <span class="chip" [class.chip-sage]="step.done">{{ step.done ? 'In place' : step.when }}</span>
              </div>
              <p class="mt-2 text-[15px] max-w-xl" style="color: var(--color-slate);">{{ step.body }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24" style="background: var(--color-canvas);">
      <div class="container-prose text-center">
        <h2 class="text-[clamp(1.8rem,3.4vw,2.6rem)] text-balance">Questions about our approach?</h2>
        <p class="mt-4" style="color: var(--color-slate);">
          We're always happy to share EPC certificates, spec sheets and the detail behind the numbers.
        </p>
        <a routerLink="/enquire" class="btn btn-primary mt-8">Get in touch</a>
      </div>
    </section>
  `,
})
export class SustainabilityComponent {
  private readonly svc = inject(PropertyService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly featured = this.svc.featured();

  readonly metrics = [
    { value: '80%', label: 'Less lighting energy (LED)' },
    { value: 'C→A', label: 'EPC improvement target' },
    { value: '100%', label: 'Renovated, not rebuilt' },
    { value: '0', label: 'Structures demolished' },
  ];

  readonly roadmap = [
    { title: 'Efficient envelope & systems', when: 'Complete', done: true, body: 'Upgraded insulation, LED lighting and a modern condensing heating system with zoned controls.' },
    { title: 'Water & waste reduction', when: 'Complete', done: true, body: 'Low-flow fittings and dual-flush WCs; construction waste sorted for recycling.' },
    { title: 'Solar PV & battery storage', when: 'Planned', done: false, body: 'Roof-mounted panels with home battery to cut grid draw and shift demand off-peak.' },
    { title: 'Air-source heat pump', when: 'Planned', done: false, body: 'Transitioning space and water heating away from gas as each tenancy allows.' },
    { title: 'Net-positive operation', when: 'Goal', done: false, body: 'Generating more clean energy than the home consumes across the year.' },
  ];

  icon(key: SustainabilityItem['icon']): SafeHtml {
    const paths: Record<SustainabilityItem['icon'], string> = {
      leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
      bolt: '<path d="M13 2 3 14h7l-1 8 10-12h-7z"/>',
      droplet: '<path d="M12 2.7S6 9 6 13.5a6 6 0 0 0 12 0C18 9 12 2.7 12 2.7Z"/>',
      thermometer: '<path d="M14 14.76V4a2 2 0 0 0-4 0v10.76a4 4 0 1 0 4 0Z"/>',
      recycle: '<path d="M7 19H4.8a2 2 0 0 1-1.7-3l1.2-2M7 8l3-5 3 5M17 8l2 3.5a2 2 0 0 1-1.7 3H15M9 19h6"/>',
      sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    };
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5b6b52" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[key]}</svg>`,
    );
  }
}
