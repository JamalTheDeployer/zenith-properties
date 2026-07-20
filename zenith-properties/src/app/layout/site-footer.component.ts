import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer style="background: var(--color-ink); color: var(--color-canvas);">
      <div class="container-wide py-16 md:py-24">
        <div class="grid gap-14 border-b pb-16 md:grid-cols-[1.5fr_.7fr_.7fr]" style="border-color: rgba(244,241,234,.16);">
          <div>
            <p class="eyebrow mb-5" style="color: var(--color-oak-soft);">A considered next move</p>
            <h2 class="max-w-2xl text-[clamp(2.7rem,5vw,5rem)]" style="color: var(--color-canvas);">
              Property partnerships begin with a conversation.
            </h2>
            <a routerLink="/enquire" class="btn btn-oak mt-9">Talk to ZenithStay</a>
          </div>
          <nav aria-label="Footer navigation">
            <p class="index-label mb-5" style="color: rgba(244,241,234,.5);">Navigate</p>
            <ul class="space-y-3 text-[14px]" style="color: rgba(244,241,234,.76);">
              <li><a routerLink="/portfolio">Projects</a></li>
              <li><a routerLink="/strategy">Investment approach</a></li>
              <li><a routerLink="/about">About ZenithStay</a></li>
            </ul>
          </nav>
          <div>
            <p class="index-label mb-5" style="color: rgba(244,241,234,.5);">Contact</p>
            <div class="space-y-3 text-[14px]" style="color: rgba(244,241,234,.76);">
              <a href="mailto:admin&#64;zenithstayproperties.co.uk" class="block break-words">admin&#64;zenithstayproperties.co.uk</a>
              <a href="tel:+447944015213" class="block">07944 015 213</a>
              <a href="https://www.instagram.com/Zenithstay/" target="_blank" rel="noopener noreferrer" class="block">Instagram · &#64;Zenithstay</a>
            </div>
            <p class="mt-5 max-w-xs text-[13px]" style="color: rgba(244,241,234,.45);">
              For lending, investment, acquisitions and professional partnerships.
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-3 pt-7 text-[11px] uppercase tracking-[.14em] sm:flex-row sm:items-center sm:justify-between" style="color: rgba(244,241,234,.42);">
          <p>© {{ year }} ZenithStay Properties Limited</p>
          <p>Independent property investment · United Kingdom</p>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  readonly year = new Date().getFullYear();
}
