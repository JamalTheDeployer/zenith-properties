import {
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RevealDirective } from '../../shared/reveal.directive';
import { GalleryOrbitComponent } from '../../three/gallery-orbit.component';
import { PropertyService } from '../../core/property.service';
import { SustainabilityItem } from '../../core/property.model';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [RouterLink, RevealDirective, GalleryOrbitComponent],
  template: `
    @if (property(); as p) {
      <!-- ============ HERO ============ -->
      <section class="relative min-h-[86vh] flex items-end overflow-hidden">
        <img [src]="p.heroImage" alt="{{ p.name }}"
             class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0"
             style="background: linear-gradient(180deg, rgba(20,22,18,0.15) 0%, rgba(20,22,18,0.05) 40%, rgba(20,22,18,0.78) 100%);"></div>
        <div class="container-wide relative pb-14 pt-40 text-white w-full">
          <p class="text-[12px] uppercase tracking-[0.24em] mb-4" style="color: rgba(255,255,255,0.8);">
            {{ p.ref }} · {{ statusLabel(p.status) }}
          </p>
          <h1 class="text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.98] text-balance" style="color: var(--color-canvas);">{{ p.name }}</h1>
          <p class="mt-3 text-[1.05rem] uppercase tracking-[0.16em]" style="color: rgba(255,255,255,0.82);">
            {{ p.location.area }}, {{ p.location.country }}
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div class="flex items-center gap-8">
              <div>
                <p class="display-serif text-3xl">{{ p.specs.bedrooms }}</p>
                <p class="text-[12px] uppercase tracking-widest" style="color: rgba(255,255,255,0.7);">Bedrooms</p>
              </div>
              <div>
                <p class="display-serif text-3xl">{{ p.specs.bathrooms }}</p>
                <p class="text-[12px] uppercase tracking-widest" style="color: rgba(255,255,255,0.7);">Bath / shower</p>
              </div>
              <div>
                <p class="display-serif text-3xl">{{ p.specs.receptions }}</p>
                <p class="text-[12px] uppercase tracking-widest" style="color: rgba(255,255,255,0.7);">Reception</p>
              </div>
              @if (p.specs.areaSqm) {
                <div>
                  <p class="display-serif text-3xl">{{ p.specs.areaSqm }}</p>
                  <p class="text-[12px] uppercase tracking-widest" style="color: rgba(255,255,255,0.7);">m² approx.</p>
                </div>
              }
            </div>
            <a routerLink="/enquire" class="btn btn-oak ml-auto">Arrange a viewing</a>
          </div>
        </div>
      </section>

      <!-- ============ STORY + SPECS ============ -->
      <section class="py-24" style="background: var(--color-canvas);">
        <div class="container-wide grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p class="eyebrow mb-4" data-reveal>The residence</p>
            <h2 class="text-[clamp(1.8rem,3.2vw,2.6rem)] max-w-2xl text-balance" data-reveal>{{ p.standfirst }}</h2>
            <div class="mt-8 space-y-5 max-w-2xl text-[1.06rem]" style="color: var(--color-slate);">
              @for (para of p.story; track $index) {
                <p data-reveal [revealDelay]="$index * 60">{{ para }}</p>
              }
            </div>
          </div>

          <aside class="surface-card p-8 h-fit lg:sticky lg:top-28" style="border-radius: var(--radius-lg);" data-reveal [revealDelay]="120">
            <h3 class="text-[12px] uppercase tracking-[0.2em] mb-5" style="color: var(--color-muted); font-family: var(--font-body); font-weight:600;">Key facts</h3>
            <dl class="divide-y" style="border-color: var(--color-line);">
              @for (fact of facts(); track fact.label) {
                <div class="flex justify-between py-3 text-[15px]">
                  <dt style="color: var(--color-slate);">{{ fact.label }}</dt>
                  <dd class="font-medium">{{ fact.value }}</dd>
                </div>
              }
            </dl>
          </aside>
        </div>
      </section>

      <!-- ============ 3D GALLERY ORBIT ============ -->
      @if (p.rooms.length) {
        <section class="py-24" style="background: var(--color-mist);">
          <div class="container-wide">
            <div class="flex flex-wrap items-end justify-between gap-6 mb-10">
              <div>
                <p class="eyebrow mb-4" data-reveal>Step inside</p>
                <h2 class="text-[clamp(1.8rem,3.2vw,2.6rem)]" data-reveal>Every room, in the round.</h2>
                <p class="mt-3 max-w-lg text-[1rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="60">
                  Drag or swipe to move through the home. It drifts gently on its own if you'd rather just watch.
                </p>
              </div>
              <div class="flex items-center gap-3">
                <button (click)="orbit.prev()" aria-label="Previous room"
                        class="h-12 w-12 rounded-full surface-card inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <button (click)="orbit.next()" aria-label="Next room"
                        class="h-12 w-12 rounded-full surface-card inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </div>
            </div>

            <div class="relative rounded-[28px] overflow-hidden"
                 style="background: radial-gradient(70% 90% at 50% 10%, #ffffff, var(--color-fog)); border:1px solid var(--color-line);">
              <div class="h-[58vh] min-h-[420px] w-full">
                <app-gallery-orbit #orbit [images]="p.rooms" (frontIndex)="frontIdx.set($event)" />
              </div>
              <!-- caption -->
              <div class="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-8"
                   style="background: linear-gradient(0deg, rgba(251,250,247,0.95), transparent);">
                <p class="text-[12px] uppercase tracking-[0.2em]" style="color: var(--color-oak-deep);">
                  {{ frontIdx() + 1 }} / {{ p.rooms.length }} · {{ currentRoom()?.floor }}
                </p>
                <p class="display-serif text-2xl mt-1">{{ currentRoom()?.name }}</p>
                <p class="text-[14px] max-w-2xl mt-1" style="color: var(--color-slate);">{{ currentRoom()?.caption }}</p>
              </div>
            </div>

            <!-- thumbnails -->
            <div class="mt-6 flex gap-3 overflow-x-auto pb-2">
              @for (room of p.rooms; track room.image; let i = $index) {
                <button (click)="orbit.goTo(i)"
                        class="relative shrink-0 rounded-xl overflow-hidden transition-all duration-300"
                        [style.outline]="frontIdx() === i ? '2px solid var(--color-oak)' : '2px solid transparent'"
                        [style.opacity]="frontIdx() === i ? '1' : '0.6'"
                        [attr.aria-label]="'Show ' + room.name">
                  <img [src]="room.image" [alt]="room.name" class="h-16 w-24 object-cover" loading="lazy" />
                </button>
              }
            </div>
          </div>
        </section>
      }

      <!-- ============ ROOM GRID ============ -->
      @if (p.rooms.length) {
        <section class="py-24" style="background: var(--color-canvas);">
          <div class="container-wide">
            <p class="eyebrow mb-4" data-reveal>The full tour</p>
            <h2 class="text-[clamp(1.8rem,3.2vw,2.6rem)] mb-10" data-reveal>Room by room.</h2>
            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              @for (room of p.rooms; track room.image; let i = $index) {
                <figure class="group" data-reveal [revealDelay]="(i % 3) * 80">
                  <div class="overflow-hidden surface-card" style="border-radius: var(--radius-md); aspect-ratio: 4 / 3;">
                    <img [src]="room.image" [alt]="room.caption"
                         class="w-full h-full object-cover transition-transform duration-[1.1s] group-hover:scale-105" loading="lazy" />
                  </div>
                  <figcaption class="mt-3">
                    <p class="display-serif text-lg">{{ room.name }}</p>
                    <p class="text-[13px]" style="color: var(--color-muted);">{{ room.floor }}</p>
                  </figcaption>
                </figure>
              }
            </div>
          </div>
        </section>
      }

      <!-- ============ FEATURES + SUSTAINABILITY ============ -->
      <section class="py-24" style="background: var(--color-mist);">
        <div class="container-wide grid gap-14 lg:grid-cols-2">
          <div>
            <p class="eyebrow mb-4" data-reveal>Specification</p>
            <h2 class="text-[clamp(1.7rem,3vw,2.3rem)] mb-8" data-reveal>Finished with intent.</h2>
            <ul class="space-y-0">
              @for (f of p.features; track f; let i = $index) {
                <li class="flex items-start gap-3 py-3.5 border-t text-[15px]"
                    style="border-color: var(--color-line);" data-reveal [revealDelay]="i * 40">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="mt-0.5 shrink-0"><path d="M5 12l5 5L20 7" stroke="#9c6f3d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span>{{ f }}</span>
                </li>
              }
            </ul>
          </div>

          @if (p.sustainability.length) {
            <div>
              <p class="eyebrow mb-4" data-reveal>Sustainability</p>
              <h2 class="text-[clamp(1.7rem,3vw,2.3rem)] mb-8" data-reveal>Runs gently.</h2>
              <div class="grid gap-4 sm:grid-cols-2">
                @for (s of p.sustainability; track s.title; let i = $index) {
                  <div class="surface-card p-5" style="border-radius: var(--radius-md);" data-reveal [revealDelay]="i * 60">
                    <span class="inline-flex h-9 w-9 items-center justify-center rounded-full mb-3"
                          style="background: var(--color-sage-soft);">
                      <span [innerHTML]="icon(s.icon)"></span>
                    </span>
                    <p class="font-medium mb-1">{{ s.title }}</p>
                    <p class="text-[13.5px]" style="color: var(--color-slate);">{{ s.detail }}</p>
                  </div>
                }
              </div>
              <a routerLink="/sustainability" class="btn btn-ghost mt-8">Our full approach</a>
            </div>
          }
        </div>
      </section>

      <!-- ============ 360 TOUR (future-ready) ============ -->
      <section class="py-24" style="background: var(--color-canvas);">
        <div class="container-wide">
          <div class="surface-card p-10 md:p-14 text-center relative overflow-hidden" style="border-radius: var(--radius-xl);">
            <div class="pointer-events-none absolute inset-0 opacity-60"
                 style="background: radial-gradient(50% 60% at 50% 0%, var(--color-sage-soft), transparent 70%);"></div>
            <div class="relative">
              <span class="chip chip-sage mb-5">Immersive tours</span>
              <h2 class="text-[clamp(1.8rem,3.2vw,2.6rem)] max-w-2xl mx-auto text-balance">
                360° virtual tours are ready to switch on.
              </h2>
              <p class="mt-4 max-w-xl mx-auto text-[1.02rem]" style="color: var(--color-slate);">
                Every room is already wired for a drag-to-look-around panorama. The moment equirectangular
                shots are captured, they appear here — no rebuild required.
              </p>
              <div class="mt-8 flex flex-wrap justify-center gap-2.5">
                @for (pano of p.panoramas; track pano.room) {
                  <span class="chip" [class.chip-oak]="!!pano.url">
                    {{ pano.room }} · {{ pano.url ? 'ready' : 'awaiting capture' }}
                  </span>
                }
              </div>
              <a routerLink="/enquire" class="btn btn-primary mt-9">Ask about a private tour</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ ENQUIRY CTA ============ -->
      <section class="pb-28" style="background: var(--color-canvas);">
        <div class="container-wide">
          <div class="rounded-[32px] p-10 md:p-14 text-center" style="background: var(--color-ink); color: var(--color-canvas);">
            <h2 class="text-[clamp(1.8rem,3.4vw,2.6rem)] text-balance" style="color: var(--color-canvas);">
              Like what you see?
            </h2>
            <p class="mt-4 max-w-xl mx-auto" style="color: rgba(251,250,247,0.72);">
              Arrange a viewing of {{ p.name }}, ask a question, or register for the next release.
            </p>
            <div class="mt-8 flex flex-wrap justify-center gap-3">
              <a routerLink="/enquire" class="btn btn-oak">Make an enquiry</a>
              <a routerLink="/portfolio" class="btn btn-ghost" style="color: var(--color-canvas); border-color: rgba(251,250,247,0.3);">Back to portfolio</a>
            </div>
          </div>
        </div>
      </section>
    } @else {
      <!-- NOT FOUND -->
      <section class="pt-44 pb-32 text-center" style="background: var(--color-canvas);">
        <div class="container-prose">
          <p class="eyebrow mb-4">Not found</p>
          <h1 class="text-4xl mb-4">We couldn't find that residence.</h1>
          <p class="mb-8" style="color: var(--color-slate);">It may have moved, or the link may be out of date.</p>
          <a routerLink="/portfolio" class="btn btn-primary">View the portfolio</a>
        </div>
      </section>
    }
  `,
})
export class PropertyDetailComponent {
  private readonly svc = inject(PropertyService);
  private readonly sanitizer = inject(DomSanitizer);

  /** Bound from the route param via withComponentInputBinding(). */
  readonly slug = input.required<string>();
  readonly property = computed(() => this.svc.bySlug(this.slug()));

  readonly frontIdx = signal(0);
  readonly currentRoom = computed(() => this.property()?.rooms[this.frontIdx()]);

  readonly facts = computed(() => {
    const p = this.property();
    if (!p) return [];
    const s = p.specs;
    return [
      { label: 'Reference', value: p.ref },
      { label: 'Tenure', value: s.tenure ?? '—' },
      { label: 'Bedrooms', value: String(s.bedrooms) },
      { label: 'Bath / shower rooms', value: String(s.bathrooms) },
      { label: 'Receptions', value: String(s.receptions) },
      { label: 'Internal area', value: s.areaSqm ? `${s.areaSqm} m² / ${s.areaSqft} sq ft` : '—' },
      { label: 'EPC rating', value: s.epcRating ?? '—' },
      { label: 'Council tax band', value: s.councilTaxBand ?? '—' },
      { label: 'Renovated', value: s.yearRenovated ? String(s.yearRenovated) : '—' },
    ];
  });

  statusLabel(s: string): string {
    switch (s) {
      case 'portfolio': return 'In the portfolio';
      case 'available': return 'Open to enquiries';
      case 'let': return 'Now let';
      case 'coming-soon': return 'Coming soon';
      default: return s;
    }
  }

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
      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5b6b52" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[key]}</svg>`,
    );
  }
}
