import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';

// Where the glow rests before the first pointer move (viewport ratios).
const START_X = 0.5;
const START_Y = 0.3;
// Share of the remaining distance covered per frame; lower = lazier follow.
const EASING = 0.08;
const SETTLE_THRESHOLD = 0.0005;

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

@Component({
  selector: 'app-ambient-background',
  template: `
    <div class="ambient__blob ambient__blob--primary"></div>
    <div class="ambient__blob ambient__blob--secondary"></div>
  `,
  styleUrls: ['./ambient-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Purely decorative.
  host: { 'aria-hidden': 'true' },
})
export class AmbientBackgroundComponent implements OnInit, OnDestroy {
  private current = { x: START_X, y: START_Y };
  private target = { x: START_X, y: START_Y };
  private frameId?: number;
  private lastHue?: number;

  private readonly onPointerMove = (event: PointerEvent): void => {
    this.target = {
      x: clamp01(event.clientX / window.innerWidth),
      y: clamp01(event.clientY / window.innerHeight),
    };
    this.requestFrame();
  };

  constructor(private readonly zone: NgZone) {}

  ngOnInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      window.addEventListener('pointermove', this.onPointerMove, {
        passive: true,
      });
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('pointermove', this.onPointerMove);

    if (this.frameId !== undefined) {
      cancelAnimationFrame(this.frameId);
    }
  }

  private requestFrame(): void {
    if (this.frameId === undefined) {
      this.frameId = requestAnimationFrame(() => this.step());
    }
  }

  private step(): void {
    this.frameId = undefined;

    const dx = this.target.x - this.current.x;
    const dy = this.target.y - this.current.y;
    const settled =
      Math.abs(dx) < SETTLE_THRESHOLD && Math.abs(dy) < SETTLE_THRESHOLD;

    this.current = settled
      ? { ...this.target }
      : {
          x: this.current.x + dx * EASING,
          y: this.current.y + dy * EASING,
        };

    this.apply();

    if (!settled) {
      this.requestFrame();
    }
  }

  private apply(): void {
    const style = document.documentElement.style;
    const { x, y } = this.current;
    // Blue on the left, pink on the right; moving down cools it a bit. Kept within 215..320:
    // .gradient-text uses this hue for headline text, and cyan/green would fail contrast.
    const hue = Math.round(225 + x * 95 - y * 10);

    style.setProperty('--pointer-x', x.toFixed(4));
    style.setProperty('--pointer-y', y.toFixed(4));

    if (hue !== this.lastHue) {
      style.setProperty('--hue', String(hue));
      this.lastHue = hue;
    }
  }
}
