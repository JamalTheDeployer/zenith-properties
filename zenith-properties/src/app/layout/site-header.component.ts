import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header
      class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      [class.py-4]="!scrolled()"
      [class.py-2]="scrolled()"
      [style.background]="scrolled() ? 'rgba(251,250,247,0.86)' : 'rgba(251,250,247,0.55)'"
      style="backdrop-filter: saturate(160%) blur(12px); -webkit-backdrop-filter: saturate(160%) blur(12px);"
      [style.borderBottom]="scrolled() ? '1px solid var(--color-line)' : '1px solid transparent'"
      [style.boxShadow]="scrolled() ? '0 8px 30px -20px rgba(32,36,31,0.35)' : 'none'"
    >
      <div class="container-wide flex items-center justify-between">
        <!-- Wordmark -->
        <a routerLink="/" class="flex items-center gap-2.5 group" aria-label="Zenith Properties home">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-full"
                style="background: var(--color-ink);">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2 3 9v13h6v-7h6v7h6V9z" stroke="#fbfaf7" stroke-width="1.6"
                    stroke-linejoin="round" fill="none"/>
            </svg>
          </span>
          <span class="leading-none">
            <span class="block text-[15px] font-semibold tracking-[0.14em] uppercase" style="color: var(--color-ink);">Zenith</span>
            <span class="block text-[10px] tracking-[0.3em] uppercase" style="color: var(--color-muted);">Properties</span>
          </span>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-8" aria-label="Primary">
          @for (link of links; track link.path) {
            <a [routerLink]="link.path" routerLinkActive="text-ink"
               [routerLinkActiveOptions]="{ exact: link.path === '/' }"
               class="text-[14px] font-medium tracking-wide transition-colors hover:opacity-100"
               style="color: var(--color-slate);">
              {{ link.label }}
            </a>
          }
          <a routerLink="/portal" class="btn btn-ghost btn-sm text-[13px] py-2 px-4">Tenant login</a>
          <a routerLink="/enquire" class="btn btn-oak text-[13px] py-2.5 px-5">Enquire</a>
        </nav>

        <!-- Mobile toggle -->
        <button class="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full"
                style="border:1px solid var(--color-line-strong);"
                (click)="menuOpen.set(!menuOpen())"
                [attr.aria-expanded]="menuOpen()" aria-label="Toggle menu">
          @if (!menuOpen()) {
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
          } @else {
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
          }
        </button>
      </div>

      <!-- Mobile menu -->
      @if (menuOpen()) {
        <div class="md:hidden container-wide mt-3">
          <div class="surface-card p-4 flex flex-col gap-1">
            @for (link of links; track link.path) {
              <a [routerLink]="link.path" (click)="menuOpen.set(false)"
                 class="py-2.5 px-2 rounded-lg text-[15px] font-medium" style="color: var(--color-ink);">
                {{ link.label }}
              </a>
            }
            <div class="flex gap-2 mt-2">
              <a routerLink="/portal" (click)="menuOpen.set(false)" class="btn btn-ghost flex-1">Tenant login</a>
              <a routerLink="/enquire" (click)="menuOpen.set(false)" class="btn btn-oak flex-1">Enquire</a>
            </div>
          </div>
        </div>
      }
    </header>
  `,
})
export class SiteHeaderComponent {
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  readonly links = [
    { path: '/', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/property/juniper-house', label: 'The Residence' },
    { path: '/sustainability', label: 'Sustainability' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }
}
