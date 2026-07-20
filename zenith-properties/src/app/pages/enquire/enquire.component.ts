import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-enquire',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RevealDirective],
  template: `
    <section class="pb-20 pt-40 md:pb-28 md:pt-48" style="background: var(--color-canvas);">
      <div class="container-wide grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
        <div data-reveal>
          <p class="eyebrow">Contact</p>
          <p class="mt-5 index-label">Private and direct</p>
        </div>
        <div>
          <h1 class="max-w-5xl text-[clamp(4.2rem,8.8vw,8.8rem)]" data-reveal>Let’s discuss<br><em class="font-normal">what comes next.</em></h1>
          <p class="mt-10 max-w-2xl text-[1.08rem]" style="color: var(--color-slate);" data-reveal [revealDelay]="80">
            ZenithStay welcomes direct conversations with lenders, investors, agents, vendors and professional partners. Tell us where your interest sits and we will respond personally.
          </p>
        </div>
      </div>
    </section>

    <section class="pb-24 md:pb-36" style="background: var(--color-canvas);">
      <div class="container-wide grid gap-14 lg:grid-cols-[.62fr_1.38fr]">
        <aside class="border-t pt-6" style="border-color: var(--color-line-strong);" data-reveal>
          <p class="index-label mb-5">Direct contact</p>
          <div class="space-y-3">
            <a href="mailto:admin&#64;zenithstayproperties.co.uk" class="block break-words display-serif text-2xl">admin&#64;zenithstayproperties.co.uk</a>
            <a href="tel:+447944015213" class="block text-[14px]" style="color: var(--color-slate);">07944 015 213</a>
            <a href="https://www.instagram.com/Zenithstay/" target="_blank" rel="noopener noreferrer"
               class="block text-[14px]" style="color: var(--color-slate);">Instagram · &#64;Zenithstay</a>
          </div>
          <p class="mt-8 max-w-sm text-[13px]" style="color: var(--color-muted);">
            Information submitted through this page is used only to respond to your enquiry. Please do not include sensitive financial or personal information in an initial message.
          </p>
          <div class="mt-12 border-t pt-6" style="border-color: var(--color-line);">
            <p class="index-label mb-4">Relevant conversations</p>
            <ul class="space-y-2 text-[14px]" style="color: var(--color-slate);">
              <li>Lending and development finance</li>
              <li>Investment and joint ventures</li>
              <li>Property sourcing and acquisitions</li>
              <li>Professional and delivery partnerships</li>
            </ul>
          </div>
        </aside>

        <form [formGroup]="form" (ngSubmit)="submit()" class="border-t" style="border-color: var(--color-ink);" novalidate data-reveal [revealDelay]="80">
          <div class="grid md:grid-cols-2">
            <label class="field-wrap md:border-r">
              <span class="label">Name</span>
              <input class="field" type="text" formControlName="name" autocomplete="name" placeholder="Your full name" />
              @if (invalid('name')) { <span class="error">Please enter your name.</span> }
            </label>
            <label class="field-wrap">
              <span class="label">Email</span>
              <input class="field" type="email" formControlName="email" autocomplete="email" placeholder="you&#64;company.com" />
              @if (invalid('email')) { <span class="error">Please enter a valid email.</span> }
            </label>
          </div>
          <div class="grid md:grid-cols-2">
            <label class="field-wrap md:border-r">
              <span class="label">Organisation <span style="color: var(--color-muted);">(optional)</span></span>
              <input class="field" type="text" formControlName="organisation" autocomplete="organization" placeholder="Company or organisation" />
            </label>
            <label class="field-wrap">
              <span class="label">Area of interest</span>
              <select class="field" formControlName="interest">
                <option value="Lending and finance">Lending and finance</option>
                <option value="Investment partnership">Investment partnership</option>
                <option value="Property opportunity">Property opportunity</option>
                <option value="Professional partnership">Professional partnership</option>
                <option value="General enquiry">General enquiry</option>
              </select>
            </label>
          </div>
          <label class="field-wrap block">
            <span class="label">Message</span>
            <textarea class="field min-h-[180px] resize-y" formControlName="message" placeholder="A short introduction and the reason for getting in touch"></textarea>
            @if (invalid('message')) { <span class="error">Please include a short message.</span> }
          </label>
          <div class="flex flex-col gap-5 border-b py-6 sm:flex-row sm:items-center sm:justify-between" style="border-color: var(--color-line-strong);">
            <label class="flex max-w-xl items-start gap-3 text-[12px]" style="color: var(--color-muted);">
              <input type="checkbox" formControlName="consent" class="mt-1 h-4 w-4 accent-[color:var(--color-ink)]" />
              <span>I consent to ZenithStay Properties Limited using these details to respond to this enquiry.</span>
            </label>
            <button type="submit" class="btn btn-primary shrink-0">Prepare email</button>
          </div>
          @if (invalid('consent')) { <p class="error mt-3">Please confirm consent before continuing.</p> }
          <p class="mt-4 text-[11px]" style="color: var(--color-muted);">Submitting opens your email application with the message prepared for review before sending.</p>
        </form>
      </div>
    </section>

    <section class="py-20 md:py-28" style="background: var(--color-mist);">
      <div class="container-wide grid gap-10 md:grid-cols-2 md:items-center">
        <div data-reveal><p class="eyebrow mb-5">Before you write</p><h2 class="text-[clamp(3rem,5vw,5rem)]">Looking for the project record?</h2></div>
        <div data-reveal [revealDelay]="70"><p class="max-w-lg" style="color: var(--color-slate);">Our project case studies document the delivery standard behind ZenithStay’s growing residential portfolio.</p><a routerLink="/portfolio" class="btn btn-ghost mt-7">View projects</a></div>
      </div>
    </section>
  `,
  styles: [`
    .field-wrap { display: block; padding: 1.45rem 0; border-bottom: 1px solid var(--color-line-strong); }
    @media (min-width: 768px) { .field-wrap { padding: 1.45rem; } }
    .label { display: block; margin-bottom: .55rem; color: var(--color-muted); font-size: .66rem; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; }
    .field { width: 100%; border: 0; outline: 0; background: transparent; color: var(--color-ink); font: 400 1rem var(--font-body); }
    .field::placeholder { color: #9a9e98; }
    .error { display: block; margin-top: .45rem; color: #8c3f2d; font-size: .72rem; }
  `],
})
export class EnquireComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly acceptedInterests = new Set([
    'Lending and finance',
    'Investment partnership',
    'Property opportunity',
    'Professional partnership',
    'General enquiry',
  ]);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    organisation: [''],
    interest: ['Lending and finance', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
    consent: [false, Validators.requiredTrue],
  });

  constructor() {
    const interest = this.route.snapshot.queryParamMap.get('interest');
    if (interest && this.acceptedInterests.has(interest)) {
      this.form.controls.interest.setValue(interest);
    }
  }

  invalid(control: string): boolean {
    const value = this.form.get(control);
    return !!value && value.invalid && (value.touched || value.dirty);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const subject = encodeURIComponent(`${value.interest} — ${value.name}`);
    const body = encodeURIComponent(
      `Name: ${value.name}\nEmail: ${value.email}\nOrganisation: ${value.organisation || '—'}\nInterest: ${value.interest}\n\n${value.message}`,
    );
    if (typeof window !== 'undefined') {
      window.location.href = `mailto:admin@zenithstayproperties.co.uk?subject=${subject}&body=${body}`;
    }
  }
}
