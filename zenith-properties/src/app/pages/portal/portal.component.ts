import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * TENANT PORTAL — future-ready stub.
 *
 * This is the seed of the tenant experience described in the brief: sign in,
 * raise maintenance requests / complaints, and reach the landlord. Everything
 * here runs locally as a preview. When you're ready, wire:
 *   • auth        → the login form to your identity provider
 *   • requests    → submitRequest() to your ticketing backend
 *   • messages    → the landlord contact to email / in-app messaging
 * The layout and flows won't need to change.
 */
@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, RevealDirective],
  template: `
    <section class="pt-36 pb-24 min-h-screen" style="background: var(--color-mist);">
      <div class="container-wide">

        @if (!signedIn()) {
          <!-- ============ SIGN IN ============ -->
          <div class="grid gap-14 lg:grid-cols-2 items-center">
            <div>
              <span class="chip chip-sage mb-5" data-reveal>Preview</span>
              <h1 class="text-[clamp(2.2rem,4.4vw,3.4rem)] text-balance" data-reveal>The tenant portal.</h1>
              <p class="mt-5 max-w-md text-[1.08rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="80">
                A calm, single place for residents of Zenith homes to look after the day-to-day: report
                anything that needs attention, track it to resolution, and reach us directly.
              </p>
              <ul class="mt-8 space-y-4">
                @for (f of features; track f.title) {
                  <li class="flex items-start gap-3" data-reveal>
                    <span class="inline-flex h-9 w-9 items-center justify-center rounded-full shrink-0" style="background: var(--color-oak-soft);">
                      <span [innerHTML]="f.icon" style="color: var(--color-oak-deep);"></span>
                    </span>
                    <div>
                      <p class="font-medium">{{ f.title }}</p>
                      <p class="text-[14px]" style="color: var(--color-slate);">{{ f.body }}</p>
                    </div>
                  </li>
                }
              </ul>
            </div>

            <div class="surface-card p-8 md:p-10 max-w-md w-full mx-auto" style="border-radius: var(--radius-lg);" data-reveal [revealDelay]="120">
              <h2 class="text-2xl mb-1">Resident sign in</h2>
              <p class="text-[14px] mb-6" style="color: var(--color-muted);">Demo only — press enter to explore the portal.</p>
              <form (ngSubmit)="enterDemo()" class="space-y-4">
                <label class="block">
                  <span class="label">Email</span>
                  <input class="field" type="email" placeholder="you@example.com" [value]="'resident@example.com'" />
                </label>
                <label class="block">
                  <span class="label">Password</span>
                  <input class="field" type="password" placeholder="••••••••" [value]="'demo'" />
                </label>
                <button type="submit" class="btn btn-primary w-full">Enter portal</button>
              </form>
              <p class="text-[13px] mt-5 text-center" style="color: var(--color-muted);">
                Not a tenant yet? <a routerLink="/enquire" style="color: var(--color-oak-deep); font-weight:500;">Enquire about renting</a>
              </p>
            </div>
          </div>
        } @else {
          <!-- ============ DASHBOARD ============ -->
          <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p class="eyebrow mb-2">Juniper House · ZP-01</p>
              <h1 class="text-[clamp(1.9rem,3.6vw,2.8rem)]">Welcome back.</h1>
            </div>
            <button (click)="signedIn.set(false)" class="btn btn-ghost">Sign out</button>
          </div>

          <div class="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <!-- Raise a request -->
            <div class="surface-card p-8" style="border-radius: var(--radius-lg);">
              <h2 class="text-2xl mb-1">Report an issue or complaint</h2>
              <p class="text-[14px] mb-6" style="color: var(--color-muted);">
                Tell us what needs attention. Urgent safety issues are flagged straight to the landlord.
              </p>

              @if (!requestSent()) {
                <form [formGroup]="requestForm" (ngSubmit)="submitRequest()" class="space-y-5">
                  <div class="grid sm:grid-cols-2 gap-5">
                    <label class="block">
                      <span class="label">Category</span>
                      <select class="field" formControlName="category">
                        <option>Plumbing</option>
                        <option>Heating &amp; hot water</option>
                        <option>Electrical</option>
                        <option>Appliances</option>
                        <option>Damp / mould</option>
                        <option>General repair</option>
                        <option>Complaint</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <label class="block">
                      <span class="label">Priority</span>
                      <select class="field" formControlName="priority">
                        <option value="Low">Low — whenever convenient</option>
                        <option value="Medium">Medium — this week</option>
                        <option value="High">High — as soon as possible</option>
                        <option value="Urgent">Urgent — safety risk</option>
                      </select>
                    </label>
                  </div>
                  <label class="block">
                    <span class="label">Where in the home?</span>
                    <input class="field" formControlName="location" placeholder="e.g. Kitchen, principal bedroom en-suite" />
                  </label>
                  <label class="block">
                    <span class="label">Describe the issue</span>
                    <textarea class="field min-h-[120px] resize-y" formControlName="description"
                              placeholder="What's happening, since when, and anything we should know."></textarea>
                    @if (reqInvalid('description')) { <span class="err">A few details help us fix it faster.</span> }
                  </label>
                  <button type="submit" class="btn btn-primary">Submit request</button>
                </form>
              } @else {
                <div class="rounded-2xl p-6 flex items-start gap-4" style="background: var(--color-sage-soft);">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="mt-0.5 shrink-0"><path d="M5 12l5 5L20 7" stroke="#5b6b52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <div>
                    <p class="font-medium mb-1">Request logged — reference {{ ticketRef() }}</p>
                    <p class="text-[14px]" style="color: var(--color-slate);">
                      In the live portal you'd now see it tracked below with status updates. We'd confirm by
                      email and, for urgent items, notify the landlord immediately.
                    </p>
                    <button (click)="requestSent.set(false)" class="btn btn-ghost mt-4">Raise another</button>
                  </div>
                </div>
              }

              <!-- request history preview -->
              <h3 class="text-[12px] uppercase tracking-[0.2em] mt-10 mb-3" style="color: var(--color-muted); font-family: var(--font-body); font-weight:600;">Recent requests</h3>
              <div class="divide-y" style="border-color: var(--color-line);">
                @for (t of tickets; track t.ref) {
                  <div class="flex items-center justify-between py-3.5">
                    <div>
                      <p class="font-medium text-[15px]">{{ t.title }}</p>
                      <p class="text-[13px]" style="color: var(--color-muted);">{{ t.ref }} · {{ t.date }}</p>
                    </div>
                    <span class="chip" [class.chip-sage]="t.status === 'Resolved'" [class.chip-oak]="t.status === 'In progress'">{{ t.status }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Reach the landlord -->
            <div class="space-y-6">
              <div class="surface-card p-7" style="border-radius: var(--radius-lg);">
                <h3 class="text-xl mb-1">Reach your landlord</h3>
                <p class="text-[14px] mb-5" style="color: var(--color-slate);">
                  For anything the form doesn't cover, message us directly.
                </p>
                <a href="mailto:landlord@zenithproperties.co.uk" class="btn btn-oak w-full mb-2.5">Message the landlord</a>
                <a href="tel:+440000000000" class="btn btn-ghost w-full">Call the office</a>
              </div>
              <div class="surface-card p-7" style="border-radius: var(--radius-lg);">
                <h3 class="text-xl mb-3">Your tenancy</h3>
                <dl class="space-y-2.5 text-[14px]">
                  <div class="flex justify-between"><dt style="color: var(--color-muted);">Property</dt><dd class="font-medium">Juniper House</dd></div>
                  <div class="flex justify-between"><dt style="color: var(--color-muted);">Rent due</dt><dd class="font-medium">1st of month</dd></div>
                  <div class="flex justify-between"><dt style="color: var(--color-muted);">Deposit scheme</dt><dd class="font-medium">Protected</dd></div>
                  <div class="flex justify-between"><dt style="color: var(--color-muted);">Documents</dt><dd class="font-medium">3 available</dd></div>
                </dl>
                <p class="text-[12px] mt-4" style="color: var(--color-muted);">Sample data — wire to your tenancy records.</p>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .label { display:block; font-size:0.82rem; font-weight:500; margin-bottom:0.4rem; color: var(--color-slate); }
    .field {
      width:100%; font-family: var(--font-body); font-size:1rem; color: var(--color-ink);
      background: var(--color-canvas); border:1px solid var(--color-line-strong);
      border-radius: 12px; padding: 0.75rem 0.85rem; transition: border-color .2s, box-shadow .2s;
    }
    .field:focus { outline:none; border-color: var(--color-oak); box-shadow: 0 0 0 3px rgba(185,138,84,0.15); }
    .err { display:block; margin-top:0.35rem; font-size:0.8rem; color:#a3502f; }
  `],
})
export class PortalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly sanitizer = inject(DomSanitizer);

  readonly signedIn = signal(false);
  readonly requestSent = signal(false);
  readonly ticketRef = signal('');

  readonly requestForm = this.fb.group({
    category: ['Plumbing', Validators.required],
    priority: ['Medium', Validators.required],
    location: [''],
    description: ['', [Validators.required, Validators.minLength(8)]],
  });

  readonly features: { title: string; body: string; icon: SafeHtml }[] = [
    { title: 'Report in seconds', body: 'Log repairs and complaints with a photo and a priority.', icon: this.trust('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>') },
    { title: 'Track to resolution', body: 'See status updates from logged to resolved, in one thread.', icon: this.trust('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>') },
    { title: 'A direct line', body: 'Message the landlord without hunting for an email address.', icon: this.trust('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>') },
  ];

  private trust(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  readonly tickets = [
    { ref: 'REQ-0134', title: 'Kitchen tap dripping', date: 'Resolved 12 May', status: 'Resolved' },
    { ref: 'REQ-0141', title: 'Bedroom radiator bleed', date: 'Logged 2 Jun', status: 'In progress' },
  ];

  enterDemo(): void {
    this.signedIn.set(true);
  }

  reqInvalid(control: string): boolean {
    const c = this.requestForm.get(control);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  submitRequest(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }
    // TODO: POST this.requestForm.getRawValue() to your ticketing backend.
    const n = 142 + Math.floor((this.tickets.length + 1)); // deterministic-ish demo ref
    this.ticketRef.set('REQ-0' + n);
    this.requestSent.set(true);
  }
}
