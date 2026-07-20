import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
            [style.background]="scrolled() || menuOpen() ? 'rgba(244,241,234,.96)' : 'rgba(244,241,234,.82)'"
            [style.borderBottom]="scrolled() || menuOpen() ? '1px solid var(--color-line)' : '1px solid transparent'"
            style="backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);">
      <div class="container-wide flex h-[82px] items-center justify-between">
        <a routerLink="/" class="group flex items-center gap-4" aria-label="ZenithStay Properties home">
          <img src="brand/zenith-mark-header.png" alt="" aria-hidden="true" width="160" height="160"
               class="h-11 w-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
          <span>
            <span class="block text-[12px] font-semibold uppercase tracking-[.18em] leading-none">ZenithStay</span>
            <span class="mt-1.5 block text-[9px] uppercase tracking-[.34em] leading-none" style="color: var(--color-muted);">Properties</span>
          </span>
        </a>

        <nav class="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          @for (link of links; track link.path) {
            <a [routerLink]="link.path" routerLinkActive="active-link"
               [routerLinkActiveOptions]="{ exact: link.path === '/' }"
               class="nav-link text-[11px] font-semibold uppercase tracking-[.16em]">
              {{ link.label }}
            </a>
          }
          <a routerLink="/enquire" class="btn btn-primary min-h-[42px] px-5">Enquire</a>
        </nav>

        <button class="grid h-10 w-10 place-items-center border lg:hidden" style="border-color: var(--color-line-strong);"
                (click)="menuOpen.set(!menuOpen())" [attr.aria-expanded]="menuOpen()" aria-label="Toggle menu">
          @if (!menuOpen()) {
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 8h18M3 16h18" stroke="currentColor" stroke-width="1.5"/></svg>
          } @else {
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.5"/></svg>
          }
        </button>
      </div>

      @if (menuOpen()) {
        <nav class="container-wide border-t py-8 lg:hidden" style="border-color: var(--color-line);" aria-label="Mobile navigation">
          @for (link of links; track link.path; let i = $index) {
            <a [routerLink]="link.path" (click)="menuOpen.set(false)"
               class="flex items-center justify-between border-b py-4 text-xl display-serif" style="border-color: var(--color-line);">
              {{ link.label }} <span class="index-label">0{{ i + 1 }}</span>
            </a>
          }
          <a routerLink="/enquire" (click)="menuOpen.set(false)" class="btn btn-primary mt-7 w-full">Start a conversation</a>
        </nav>
      }
    </header>
  `,
  styles: [`
    .nav-link { color: var(--color-slate); transition: color .2s ease; }
    .nav-link:hover, .active-link { color: var(--color-ink); }
  `],
})
export class SiteHeaderComponent {
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  readonly links = [
    { path: '/', label: 'Overview' },
    { path: '/portfolio', label: 'Projects' },
    { path: '/strategy', label: 'Approach' },
    { path: '/about', label: 'About' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }
}
