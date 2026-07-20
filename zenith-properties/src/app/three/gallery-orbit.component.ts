import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  afterNextRender,
  inject,
  input,
  output,
} from '@angular/core';
import * as THREE from 'three';
import { RoomImage } from '../core/property.model';

interface Panel {
  mesh: THREE.Mesh;
  material: THREE.MeshBasicMaterial;
  texture?: THREE.Texture;
  baseAngle: number;
}

/**
 * A curved 3D image carousel — the room photos are mapped onto planes arranged
 * around a cylinder. Drag / swipe to rotate with momentum; it snaps to the
 * nearest room and drifts gently when idle. The front-most room is emphasised
 * (scaled up, fully opaque) and its index is emitted so the parent can show a
 * caption and highlight a thumbnail.
 *
 * Interaction is pointer-based (mouse + touch). Honours reduced-motion by
 * disabling the idle drift. Disposes all GL resources on destroy.
 */
@Component({
  selector: 'app-gallery-orbit',
  standalone: true,
  template: '',
  host: {
    class: 'block relative w-full h-full cursor-grab active:cursor-grabbing touch-pan-y select-none',
  },
})
export class GalleryOrbitComponent implements OnDestroy {
  readonly images = input.required<RoomImage[]>();
  readonly autoplay = input<boolean>(true);
  readonly frontIndex = output<number>();

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private group?: THREE.Group;
  private panels: Panel[] = [];
  private frameId = 0;
  private ro?: ResizeObserver;
  private disposed = false;
  private reduced = false;

  private readonly RADIUS = 7.4;
  private step = 0;
  private current = 0;   // current group.rotation.y
  private target = 0;    // eased target
  private velocity = 0;
  private dragging = false;
  private dragStartX = 0;
  private dragStartRot = 0;
  private lastFront = -1;
  private idleTimer = 0;

  constructor() {
    afterNextRender(() => this.init());
  }

  /** Rotate so panel `i` faces the front (used by thumbnails / prev-next). */
  goTo(i: number): void {
    const n = this.panels.length;
    if (!n) return;
    const idx = ((i % n) + n) % n;
    // choose the equivalent target nearest to current to avoid long spins
    const raw = -idx * this.step;
    const k = Math.round((this.target - raw) / (Math.PI * 2));
    this.target = raw + k * Math.PI * 2;
    this.resetIdle();
  }

  next(): void { this.goTo(this.frontOf(this.target) + 1); }
  prev(): void { this.goTo(this.frontOf(this.target) - 1); }

  private frontOf(angle: number): number {
    const n = this.panels.length || 1;
    return ((Math.round(-angle / this.step) % n) + n) % n;
  }

  private init(): void {
    const el = this.host.nativeElement;
    const imgs = this.images();
    const width = el.clientWidth || 800;
    const height = el.clientHeight || 500;

    this.reduced =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    el.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.camera.position.set(0, 0, this.RADIUS + 5.4);
    this.camera.lookAt(0, 0, 0);

    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.step = (Math.PI * 2) / Math.max(imgs.length, 1);
    const loader = new THREE.TextureLoader();
    const PANEL_H = 3.2;

    imgs.forEach((room, i) => {
      const baseAngle = i * this.step;
      // start as a neutral panel; size corrected once the texture loads
      const geo = new THREE.PlaneGeometry(PANEL_H * 0.72, PANEL_H);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#eee9df'),
        transparent: true,
        opacity: 0,
        side: THREE.FrontSide,
        toneMapped: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        Math.sin(baseAngle) * this.RADIUS,
        0,
        Math.cos(baseAngle) * this.RADIUS,
      );
      mesh.rotation.y = baseAngle;
      this.group!.add(mesh);

      const panel: Panel = { mesh, material: mat, baseAngle };
      this.panels.push(panel);

      loader.load(room.image, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = this.renderer?.capabilities.getMaxAnisotropy?.() ?? 1;
        const img = tex.image as { width: number; height: number };
        const aspect = img.width && img.height ? img.width / img.height : 0.72;
        mesh.geometry.dispose();
        mesh.geometry = new THREE.PlaneGeometry(PANEL_H * aspect, PANEL_H);
        mat.map = tex;
        mat.color.set('#ffffff');
        mat.needsUpdate = true;
        panel.texture = tex;
        // fade in handled in the loop via targetOpacity logic
      });
    });

    // pointer interaction
    const dom = this.renderer.domElement;
    dom.addEventListener('pointerdown', this.onDown);
    window.addEventListener('pointermove', this.onMove, { passive: true });
    window.addEventListener('pointerup', this.onUp, { passive: true });

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(el);

    this.zone.runOutsideAngular(() => this.loop());
  }

  private readonly onDown = (e: PointerEvent) => {
    this.dragging = true;
    this.dragStartX = e.clientX;
    this.dragStartRot = this.current;
    this.velocity = 0;
    this.resetIdle();
  };

  private readonly onMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    const w = this.host.nativeElement.clientWidth || 1;
    const dx = (e.clientX - this.dragStartX) / w;
    const rot = this.dragStartRot + dx * 3.0; // sensitivity
    this.velocity = rot - this.current;
    this.current = rot;
    this.target = rot;
  };

  private readonly onUp = () => {
    if (!this.dragging) return;
    this.dragging = false;
    // fling then snap
    this.target = this.current + this.velocity * 8;
    const snapped = Math.round(-this.target / this.step) * -this.step;
    this.target = snapped;
    this.resetIdle();
  };

  private resetIdle(): void {
    this.idleTimer = 0;
  }

  private loop = (): void => {
    if (this.disposed) return;
    this.frameId = requestAnimationFrame(this.loop);

    // idle drift → advance one room every ~5s (unless reduced motion / dragging)
    if (this.autoplay() && !this.reduced && !this.dragging) {
      this.idleTimer += 1;
      if (this.idleTimer > 300) {
        this.target -= this.step;
        this.idleTimer = 0;
      }
    }

    if (!this.dragging) {
      this.current += (this.target - this.current) * 0.075;
    }
    if (this.group) this.group.rotation.y = this.current;

    // per-panel emphasis + fade-in
    for (const p of this.panels) {
      const worldAngle = p.baseAngle + this.current;
      const closeness = Math.cos(worldAngle); // 1 at front, -1 at back
      const s = 0.82 + Math.max(0, closeness) * 0.24;
      p.mesh.scale.setScalar(THREE.MathUtils.lerp(p.mesh.scale.x || s, s, 0.15));
      const wantOpacity = p.texture ? 0.32 + Math.max(0, closeness) * 0.68 : 0;
      p.material.opacity += (wantOpacity - p.material.opacity) * 0.1;
      // front panel renders last (on top)
      p.mesh.renderOrder = closeness;
    }

    // emit front index changes
    const front = this.frontOf(this.current);
    if (front !== this.lastFront) {
      this.lastFront = front;
      this.zone.run(() => this.frontIndex.emit(front));
    }

    this.renderer!.render(this.scene!, this.camera!);
  };

  private resize(): void {
    if (!this.renderer || !this.camera) return;
    const el = this.host.nativeElement;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  ngOnDestroy(): void {
    this.disposed = true;
    cancelAnimationFrame(this.frameId);
    this.ro?.disconnect();
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', this.onMove);
      window.removeEventListener('pointerup', this.onUp);
    }
    for (const p of this.panels) {
      p.mesh.geometry.dispose();
      p.material.dispose();
      p.texture?.dispose();
    }
    this.panels = [];
    this.renderer?.dispose();
    if (this.renderer?.domElement?.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
