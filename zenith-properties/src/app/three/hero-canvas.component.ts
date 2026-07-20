import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  afterNextRender,
  inject,
} from '@angular/core';
import * as THREE from 'three';

/**
 * Hero backdrop — a slow, soft field of drifting orbs in the portfolio's
 * oak + sage palette over the light canvas. Deliberately restrained: this is
 * ambient depth, not a light show. Pointer moves the field with a little
 * parallax.
 *
 * • Runs its RAF loop OUTSIDE the Angular zone (no change-detection thrash).
 * • Caps devicePixelRatio at 2.
 * • Honours prefers-reduced-motion (renders one static frame, no loop).
 * • Fully disposes GL resources on destroy.
 */
@Component({
  selector: 'app-hero-canvas',
  standalone: true,
  template: '',
  host: {
    class: 'block absolute inset-0 overflow-hidden',
    'aria-hidden': 'true',
  },
})
export class HeroCanvasComponent implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private points?: THREE.Points;
  private texture?: THREE.Texture;
  private frameId = 0;
  private ro?: ResizeObserver;
  private disposed = false;

  private readonly pointer = { x: 0, y: 0 };
  private readonly target = { x: 0, y: 0 };
  private readonly onPointerMove = (e: PointerEvent) => {
    const r = this.host.nativeElement.getBoundingClientRect();
    this.target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    this.target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };

  constructor() {
    afterNextRender(() => this.init());
  }

  private init(): void {
    const el = this.host.nativeElement;
    const width = el.clientWidth || window.innerWidth;
    const height = el.clientHeight || window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio?.(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    el.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    this.camera.position.z = 14;

    // ---- Particle field ----
    const COUNT = 150;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);

    const palette = [
      new THREE.Color('#b98a54'), // oak
      new THREE.Color('#7e8f76'), // sage
      new THREE.Color('#d9c3a1'), // light oak
      new THREE.Color('#c7d0c0'), // light sage
      new THREE.Color('#ffffff'), // highlight
    ];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      scales[i] = 0.4 + Math.random() * 1.6;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    this.texture = this.makeSoftSprite();

    const material = new THREE.PointsMaterial({
      size: 0.5,
      map: this.texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.NormalBlending,
    });

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);

    // ---- Resize ----
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(el);

    const reduced =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      this.renderer.render(this.scene, this.camera);
      return;
    }

    window.addEventListener('pointermove', this.onPointerMove, { passive: true });

    this.zone.runOutsideAngular(() => {
      const clock = new THREE.Clock();
      const loop = () => {
        if (this.disposed) return;
        const t = clock.getElapsedTime();

        // slow drift
        if (this.points) {
          this.points.rotation.y = t * 0.03;
          this.points.rotation.x = Math.sin(t * 0.12) * 0.05;
          this.points.position.y = Math.sin(t * 0.25) * 0.4;
        }

        // eased pointer parallax
        this.pointer.x += (this.target.x - this.pointer.x) * 0.04;
        this.pointer.y += (this.target.y - this.pointer.y) * 0.04;
        if (this.camera) {
          this.camera.position.x = this.pointer.x * 1.6;
          this.camera.position.y = -this.pointer.y * 1.0;
          this.camera.lookAt(0, 0, 0);
        }

        this.renderer!.render(this.scene!, this.camera!);
        this.frameId = requestAnimationFrame(loop);
      };
      this.frameId = requestAnimationFrame(loop);
    });
  }

  /** Soft radial-gradient sprite so each point reads as a gentle orb. */
  private makeSoftSprite(): THREE.Texture {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const g = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2,
    );
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.7)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.Texture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  private resize(): void {
    if (!this.renderer || !this.camera) return;
    const el = this.host.nativeElement;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.disposed) this.renderer.render(this.scene!, this.camera);
  }

  ngOnDestroy(): void {
    this.disposed = true;
    cancelAnimationFrame(this.frameId);
    this.ro?.disconnect();
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', this.onPointerMove);
    }
    this.points?.geometry.dispose();
    (this.points?.material as THREE.Material | undefined)?.dispose();
    this.texture?.dispose();
    this.renderer?.dispose();
    if (this.renderer?.domElement?.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
