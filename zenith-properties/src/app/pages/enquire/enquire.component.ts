import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RevealDirective } from '../../shared/reveal.directive';
import { PropertyService } from '../../core/property.service';

/**
 * Enquiry flow. The form validates client-side and shows a confirmation.
 *
 * To make it live, point `submit()` at your endpoint of choice — Formspree,
 * a serverless function, or a CRM webhook. The one integration line is marked
 * TODO below; everything else (validation, UX, success state) is done.
 */
@Component({
  selector: 'app-enquire',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, RevealDirective],
  template: `
    <section class="pt-36 pb-24" style="background: var(--color-canvas);">
      <div class="container-wide grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <!-- Intro -->
        <div>
          <p class="eyebrow mb-4" data-reveal>Enquiries</p>
          <h1 class="text-[clamp(2.2rem,4.4vw,3.4rem)] text-balance" data-reveal>Start a conversation.</h1>
          <p class="mt-5 max-w-md text-[1.08rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="80">
            Arrange a viewing, ask about a future tenancy, or register interest in the next property.
            Every enquiry is read and answered personally — usually within two working days.
          </p>

          <div class="mt-10 space-y-5">
            @for (item of assurances; track item.title) {
              <div class="flex items-start gap-3" data-reveal>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="mt-0.5 shrink-0"><path d="M5 12l5 5L20 7" stroke="#9c6f3d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <div>
                  <p class="font-medium">{{ item.title }}</p>
                  <p class="text-[14px]" style="color: var(--color-slate);">{{ item.body }}</p>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Form / success -->
        <div class="surface-card p-8 md:p-10" style="border-radius: var(--radius-lg);" data-reveal [revealDelay]="120">
          @if (!submitted()) {
            <form [formGroup]="form" (ngSubmit)="submit()" novalidate class="space-y-5">
              <div class="grid sm:grid-cols-2 gap-5">
                <label class="block">
                  <span class="label">Your name</span>
                  <input class="field" type="text" formControlName="name" autocomplete="name" />
                  @if (invalid('name')) { <span class="err">Please tell us your name.</span> }
                </label>
                <label class="block">
                  <span class="label">Email</span>
                  <input class="field" type="email" formControlName="email" autocomplete="email" />
                  @if (invalid('email')) { <span class="err">A valid email, please.</span> }
                </label>
              </div>

              <div class="grid sm:grid-cols-2 gap-5">
                <label class="block">
                  <span class="label">Phone <em class="opt">(optional)</em></span>
                  <input class="field" type="tel" formControlName="phone" autocomplete="tel" />
                </label>
                <label class="block">
                  <span class="label">I'm enquiring about</span>
                  <select class="field" formControlName="enquiryType">
                    <option value="Viewing">A viewing</option>
                    <option value="Tenancy">A future tenancy</option>
                    <option value="General">A general enquiry</option>
                    <option value="Press">Press / partnerships</option>
                  </select>
                </label>
              </div>

              <label class="block">
                <span class="label">Property of interest</span>
                <select class="field" formControlName="property">
                  <option value="Any / the portfolio">Any / the portfolio</option>
                  @for (p of properties; track p.id) {
                    <option [value]="p.name">{{ p.name }} ({{ p.ref }})</option>
                  }
                </select>
              </label>

              <label class="block">
                <span class="label">Message</span>
                <textarea class="field min-h-[130px] resize-y" formControlName="message"
                          placeholder="Tell us a little about what you're looking for."></textarea>
                @if (invalid('message')) { <span class="err">A short message helps us reply well.</span> }
              </label>

              <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" formControlName="consent" class="mt-1 h-4 w-4 accent-[color:var(--color-oak)]" />
                <span class="text-[13.5px]" style="color: var(--color-slate);">
                  I'm happy for Zenith Properties to contact me about this enquiry. My details are never shared.
                </span>
              </label>
              @if (invalid('consent')) { <span class="err block">Please tick to continue.</span> }

              <button type="submit" class="btn btn-primary w-full">Send enquiry</button>
              <p class="text-[12.5px] text-center" style="color: var(--color-muted);">
                Demo form — no data leaves your browser yet. Connect an endpoint to go live.
              </p>
            </form>
          } @else {
            <div class="text-center py-10">
              <span class="inline-flex h-16 w-16 items-center justify-center rounded-full mb-6" style="background: var(--color-sage-soft);">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#5b6b52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <h2 class="text-3xl mb-3">Thank you, {{ sentName() }}.</h2>
              <p class="max-w-sm mx-auto" style="color: var(--color-slate);">
                Your enquiry is noted. In the live site this would reach us by email and CRM — we'd reply
                personally within two working days.
              </p>
              <div class="mt-8 flex flex-wrap justify-center gap-3">
                <a [href]="mailtoLink()" class="btn btn-oak">Also send by email</a>
                <a routerLink="/portfolio" class="btn btn-ghost">Back to portfolio</a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .label { display:block; font-size:0.82rem; font-weight:500; margin-bottom:0.4rem; color: var(--color-slate); }
    .label .opt { font-style: normal; color: var(--color-muted); font-weight:400; }
    .field {
      width:100%; font-family: var(--font-body); font-size:1rem; color: var(--color-ink);
      background: var(--color-canvas); border:1px solid var(--color-line-strong);
      border-radius: 12px; padding: 0.75rem 0.85rem; transition: border-color .2s, box-shadow .2s;
    }
    .field:focus { outline:none; border-color: var(--color-oak); box-shadow: 0 0 0 3px rgba(185,138,84,0.15); }
    .err { display:block; margin-top:0.35rem; font-size:0.8rem; color:#a3502f; }
  `],
})
export class EnquireComponent {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(PropertyService);
  readonly properties = this.svc.showcased();

  readonly submitted = signal(false);
  readonly sentName = signal('');

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    enquiryType: ['Viewing', Validators.required],
    property: ['Any / the portfolio', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
    consent: [false, Validators.requiredTrue],
  });

  readonly assurances = [
    { title: 'Answered personally', body: 'No call centres, no chatbots — a real reply from the team.' },
    { title: 'Private by default', body: 'Your details stay with us and are never sold or shared.' },
    { title: 'No pressure', body: "If it isn't the right fit, we'll say so kindly and quickly." },
  ];

  invalid(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  mailtoLink(): string {
    const v = this.form.getRawValue();
    const subject = encodeURIComponent(`Enquiry (${v.enquiryType}) — ${v.property}`);
    const body = encodeURIComponent(
      `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || '—'}\nInterest: ${v.enquiryType}\nProperty: ${v.property}\n\n${v.message}`,
    );
    return `mailto:hello@zenithproperties.co.uk?subject=${subject}&body=${body}`;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: POST this.form.getRawValue() to your endpoint (Formspree / API / CRM).
    this.sentName.set(this.form.getRawValue().name ?? '');
    this.submitted.set(true);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
