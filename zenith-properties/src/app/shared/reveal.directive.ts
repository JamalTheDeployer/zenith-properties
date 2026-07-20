import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
} from '@angular/core';

/**
 * Gentle "reveal on scroll" — the core micro-interaction of the Scandi
 * direction. Elements fade + rise once as they enter the viewport.
 *
 * Usage:  <div data-reveal [revealDelay]="120"> … </div>
 *
 * Respects prefers-reduced-motion (the CSS in styles.css short-circuits the
 * animation) and degrades to visible if IntersectionObserver is unavailable.
 */
@Directive({
  selector: '[data-reveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Stagger, in ms. */
  readonly revealDelay = input<number>(0);

  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const el = this.host.nativeElement as HTMLElement;
    el.setAttribute('data-reveal', '');
    if (this.revealDelay()) {
      el.style.transitionDelay = `${this.revealDelay()}ms`;
    }

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            this.observer?.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
