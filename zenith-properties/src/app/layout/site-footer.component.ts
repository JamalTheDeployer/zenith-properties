import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="mt-24" style="background: var(--color-ink); color: var(--color-canvas);">
      <div class="container-wide py-20">
        <div class="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2.5 mb-4">
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full" style="background: rgba(251,250,247,0.12);">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2 3 9v13h6v-7h6v7h6V9z" stroke="#fbfaf7" stroke-width="1.6" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="text-[15px] font-semibold tracking-[0.14em] uppercase">Zenith Properties</span>
            </div>
            <p class="text-[15px] max-w-xs" style="color: rgba(251,250,247,0.62);">
              A growing portfolio of thoughtfully renovated homes. Held for the long term, cared for in detail.
            </p>
          </div>

          <!-- Explore -->
          <nav aria-label="Footer — explore">
            <h4 class="text-[12px] uppercase tracking-[0.2em] mb-4" style="color: var(--color-oak-soft); font-family: var(--font-body); font-weight:600;">Explore</h4>
            <ul class="space-y-2.5 text-[15px]" style="color: rgba(251,250,247,0.72);">
              <li><a routerLink="/portfolio" class="hover:opacity-100 opacity-90 transition-opacity">Portfolio</a></li>
              <li><a routerLink="/property/juniper-house" class="hover:opacity-100 opacity-90 transition-opacity">The Residence</a></li>
              <li><a routerLink="/sustainability" class="hover:opacity-100 opacity-90 transition-opacity">Sustainability</a></li>
            </ul>
          </nav>

          <!-- Access -->
          <nav aria-label="Footer — access">
            <h4 class="text-[12px] uppercase tracking-[0.2em] mb-4" style="color: var(--color-oak-soft); font-family: var(--font-body); font-weight:600;">Access</h4>
            <ul class="space-y-2.5 text-[15px]" style="color: rgba(251,250,247,0.72);">
              <li><a routerLink="/enquire" class="hover:opacity-100 opacity-90 transition-opacity">Make an enquiry</a></li>
              <li><a routerLink="/portal" class="hover:opacity-100 opacity-90 transition-opacity">Tenant portal</a></li>
              <li><a href="mailto:hello&#64;zenithproperties.co.uk" class="hover:opacity-100 opacity-90 transition-opacity">hello&#64;zenithproperties.co.uk</a></li>
            </ul>
          </nav>

          <!-- Contact -->
          <div>
            <h4 class="text-[12px] uppercase tracking-[0.2em] mb-4" style="color: var(--color-oak-soft); font-family: var(--font-body); font-weight:600;">Get in touch</h4>
            <p class="text-[15px] mb-4" style="color: rgba(251,250,247,0.72);">
              For viewings, enquiries, or to discuss the portfolio — we reply personally.
            </p>
            <a routerLink="/enquire" class="btn btn-oak">Start an enquiry</a>
          </div>
        </div>

        <hr class="my-10" style="border:0;border-top:1px solid rgba(251,250,247,0.12);" />

        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px]" style="color: rgba(251,250,247,0.5);">
          <p>© {{ year }} Zenith Properties. All rights reserved.</p>
          <p>Every enquiry is handled privately and with care.</p>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  readonly year = 2026;
}
