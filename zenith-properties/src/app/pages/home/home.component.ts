import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeroCanvasComponent } from '../../three/hero-canvas.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { PropertyService } from '../../core/property.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeroCanvasComponent, RevealDirective],
  template: `
    <!-- ===================== HERO ===================== -->
    <section class="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28" style="background: var(--color-canvas);">
      <app-hero-canvas class="opacity-90" />
      <!-- soft light wash -->
      <div class="pointer-events-none absolute inset-0"
           style="background: radial-gradient(60% 55% at 70% 20%, rgba(185,138,84,0.10), transparent 70%), radial-gradient(50% 50% at 15% 80%, rgba(126,143,118,0.10), transparent 70%);"></div>

      <div class="container-wide relative">
        <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p class="eyebrow mb-5" data-reveal>Property portfolio · Est. 2026</p>
            <h1 class="text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] text-balance" data-reveal>
              A curated portfolio of <em class="not-italic" style="color: var(--color-oak-deep);">considered</em> homes.
            </h1>
            <p class="mt-6 max-w-xl text-[1.12rem] text-pretty" style="color: var(--color-slate);" data-reveal [revealDelay]="80">
              Zenith Properties acquires, renovates and holds characterful homes to a single standard —
              warm, sustainable and built to last. This is where the collection begins.
            </p>
            <div class="mt-9 flex flex-wrap gap-3" data-reveal [revealDelay]="160">
              <a routerLink="/property/{{ featured.slug }}" class="btn btn-primary">Tour the residence</a>
              <a routerLink="/portfolio" class="btn btn-ghost">View the portfolio</a>
            </div>

            <!-- quick stats -->
            <dl class="mt-12 grid grid-cols-3 gap-6 max-w-md" data-reveal [revealDelay]="220">
              <div>
                <dt class="text-[12px] uppercase tracking-[0.18em]" style="color: var(--color-muted);">Homes held</dt>
                <dd class="mt-1 text-3xl display-serif">01</dd>
              </div>
              <div>
                <dt class="text-[12px] uppercase tracking-[0.18em]" style="color: var(--color-muted);">Renovated</dt>
                <dd class="mt-1 text-3xl display-serif">2026</dd>
              </div>
              <div>
                <dt class="text-[12px] uppercase tracking-[0.18em]" style="color: var(--color-muted);">EPC target</dt>
                <dd class="mt-1 text-3xl display-serif">A–B</dd>
              </div>
            </dl>
          </div>

          <!-- featured image -->
          <div class="relative" data-reveal [revealDelay]="120">
            <div class="surface-card overflow-hidden shadow-[0_40px_80px_-40px_rgba(32,36,31,0.35)]"
                 style="border-radius: var(--radius-xl);">
              <img [src]="featured.heroImage" alt="Interior of {{ featured.name }}"
                   class="w-full h-[420px] md:h-[520px] object-cover" loading="eager" />
            </div>
            <div class="absolute -bottom-5 -left-5 surface-card px-5 py-4 hidden sm:block"
                 style="border-radius: var(--radius-md); box-shadow: 0 20px 40px -24px rgba(32,36,31,0.3);">
              <p class="text-[11px] uppercase tracking-[0.2em]" style="color: var(--color-muted);">{{ featured.ref }}</p>
              <p class="display-serif text-xl leading-tight">{{ featured.name }}</p>
              <p class="text-[13px]" style="color: var(--color-slate);">{{ featured.location.area }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== THESIS ===================== -->
    <section class="py-24" style="background: var(--color-mist);">
      <div class="container-wide">
        <div class="max-w-3xl">
          <p class="eyebrow mb-4" data-reveal>Our approach</p>
          <h2 class="text-[clamp(1.9rem,3.6vw,2.8rem)] text-balance" data-reveal>
            Fewer homes, cared for properly.
          </h2>
          <p class="mt-5 text-[1.08rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="80">
            We would rather own a small number of exceptional homes than a large number of ordinary ones.
            Every property is renovated with the same intent, then held for the long term.
          </p>
        </div>

        <div class="mt-14 grid gap-6 md:grid-cols-3">
          @for (pillar of pillars; track pillar.title; let i = $index) {
            <div class="surface-card p-8" data-reveal [revealDelay]="i * 90"
                 style="border-radius: var(--radius-lg);">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-full mb-5"
                    [style.background]="pillar.tint">
                <span [innerHTML]="pillar.iconSafe"></span>
              </span>
              <h3 class="display-serif text-2xl mb-2">{{ pillar.title }}</h3>
              <p class="text-[15px]" style="color: var(--color-slate);">{{ pillar.body }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ===================== FEATURED RESIDENCE ===================== -->
    <section class="py-24" style="background: var(--color-canvas);">
      <div class="container-wide">
        <div class="grid gap-10 lg:grid-cols-2 items-center">
          <div class="order-2 lg:order-1" data-reveal>
            <p class="eyebrow mb-4">The founding residence · {{ featured.ref }}</p>
            <h2 class="text-[clamp(1.9rem,3.6vw,2.9rem)]">{{ featured.name }}</h2>
            <p class="mt-2 text-[15px] uppercase tracking-[0.16em]" style="color: var(--color-muted);">
              {{ featured.location.area }}, {{ featured.location.country }}
            </p>
            <p class="mt-6 text-[1.06rem]" style="color: var(--color-slate);">{{ featured.standfirst }}</p>

            <div class="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5">
              <div>
                <p class="display-serif text-3xl">{{ featured.specs.bedrooms }}</p>
                <p class="text-[13px]" style="color: var(--color-muted);">Bedrooms</p>
              </div>
              <div>
                <p class="display-serif text-3xl">{{ featured.specs.bathrooms }}</p>
                <p class="text-[13px]" style="color: var(--color-muted);">Bath / shower</p>
              </div>
              <div>
                <p class="display-serif text-3xl">{{ featured.specs.areaSqm }}</p>
                <p class="text-[13px]" style="color: var(--color-muted);">m² approx.</p>
              </div>
              <div>
                <p class="display-serif text-3xl">{{ featured.specs.epcRating }}</p>
                <p class="text-[13px]" style="color: var(--color-muted);">EPC</p>
              </div>
            </div>

            <div class="mt-9 flex flex-wrap gap-3">
              <a routerLink="/property/{{ featured.slug }}" class="btn btn-oak">Explore in 3D</a>
              <a routerLink="/enquire" class="btn btn-ghost">Arrange a viewing</a>
            </div>
          </div>

          <div class="order-1 lg:order-2 grid grid-cols-2 gap-4" data-reveal [revealDelay]="100">
            <img [src]="galleryPeek[0]" alt="Room at {{ featured.name }}"
                 class="w-full h-64 object-cover surface-card" style="border-radius: var(--radius-md);" loading="lazy" />
            <img [src]="galleryPeek[1]" alt="Room at {{ featured.name }}"
                 class="w-full h-64 object-cover surface-card mt-8" style="border-radius: var(--radius-md);" loading="lazy" />
            <img [src]="galleryPeek[2]" alt="Room at {{ featured.name }}"
                 class="w-full h-64 object-cover surface-card -mt-8" style="border-radius: var(--radius-md);" loading="lazy" />
            <img [src]="galleryPeek[3]" alt="Room at {{ featured.name }}"
                 class="w-full h-64 object-cover surface-card" style="border-radius: var(--radius-md);" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== SUSTAINABILITY TEASER ===================== -->
    <section class="py-24" style="background: var(--color-ink); color: var(--color-canvas);">
      <div class="container-wide">
        <div class="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
          <div data-reveal>
            <p class="eyebrow mb-4" style="color: var(--color-oak-soft);">Built to last, lightly</p>
            <h2 class="text-[clamp(1.9rem,3.6vw,2.8rem)]" style="color: var(--color-canvas);">
              Sustainability is a design choice, not an afterthought.
            </h2>
            <p class="mt-5 text-[1.06rem]" style="color: rgba(251,250,247,0.72);">
              Renovating rather than rebuilding, low-energy systems throughout, and a clear roadmap to
              net-positive. Every home in the portfolio is measured on how gently it runs.
            </p>
            <a routerLink="/sustainability" class="btn btn-oak mt-8">See our commitments</a>
          </div>
          <div class="grid grid-cols-2 gap-4" data-reveal [revealDelay]="100">
            @for (s of featured.sustainability.slice(0, 4); track s.title) {
              <div class="rounded-2xl p-6" style="background: rgba(251,250,247,0.06); border:1px solid rgba(251,250,247,0.1);">
                <p class="display-serif text-xl mb-1" style="color: var(--color-canvas);">{{ s.title }}</p>
                <p class="text-[14px]" style="color: rgba(251,250,247,0.62);">{{ s.detail }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== ENQUIRY CTA ===================== -->
    <section class="py-24" style="background: var(--color-canvas);">
      <div class="container-wide">
        <div class="surface-card overflow-hidden relative" style="border-radius: var(--radius-xl);">
          <div class="grid lg:grid-cols-2">
            <div class="p-10 md:p-14">
              <p class="eyebrow mb-4" data-reveal>Enquiries</p>
              <h2 class="text-[clamp(1.8rem,3.4vw,2.6rem)] text-balance" data-reveal>
                Interested in the portfolio?
              </h2>
              <p class="mt-4 text-[1.05rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="80">
                Whether you'd like to view a home, discuss a future tenancy, or simply follow where the
                collection goes next — we'd love to hear from you. Every message is answered personally.
              </p>
              <div class="mt-8 flex flex-wrap gap-3" data-reveal [revealDelay]="140">
                <a routerLink="/enquire" class="btn btn-primary">Make an enquiry</a>
                <a routerLink="/portal" class="btn btn-ghost">Tenant portal</a>
              </div>
            </div>
            <div class="relative min-h-[280px]">
              <img [src]="galleryPeek[4]" alt="Interior detail at {{ featured.name }}"
                   class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  private readonly svc = inject(PropertyService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly featured = this.svc.featured();

  readonly galleryPeek = [
    'properties/juniper-house/principal-bedroom.jpg',
    'properties/juniper-house/shower-room.jpg',
    'properties/juniper-house/landing.jpg',
    'properties/juniper-house/bedroom-two.jpg',
    'properties/juniper-house/ensuite.jpg',
  ];

  readonly pillars: { title: string; body: string; tint: string; iconSafe: SafeHtml }[] = [
    {
      title: 'Craftsmanship',
      body: 'Solid walnut doors, engineered oak floors, stone-finished bathrooms — detail you can feel underfoot.',
      tint: 'var(--color-oak-soft)',
      iconSafe: this.trust(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9c6f3d" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/></svg>`),
    },
    {
      title: 'Sustainability',
      body: 'Low-energy systems, upgraded insulation, and a renovate-not-rebuild philosophy that saves carbon.',
      tint: 'var(--color-sage-soft)',
      iconSafe: this.trust(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5b6b52" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>`),
    },
    {
      title: 'Long-term ownership',
      body: 'We buy to hold, not to flip — so each home is finished for the people who will actually live in it.',
      tint: 'var(--color-oak-soft)',
      iconSafe: this.trust(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9c6f3d" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 7v5l3 2"/></svg>`),
    },
  ];

  private trust(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
