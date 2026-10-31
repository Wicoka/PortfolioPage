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

// Degrees of tilt away from the resting position that move the glow from its rest point to an edge.
const TILT_RANGE = 18;
// How fast the resting position follows the way the phone is held (per event, ~60 events/s),
// so the effect reacts to tilting rather than to the absolute angle.
const TILT_RECENTER = 0.01;
// Set on <html> once tilt data arrives; CSS uses it for effects that would otherwise need hover.
const TILT_CLASS = 'has-tilt';

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

interface TiltBaseline {
  beta: number;
  gamma: number;
  angle: number;
}

// iOS 13+ only hands out orientation data after this is called from a user gesture.
type OrientationPermissionRequest = () => Promise<'granted' | 'denied'>;

@Component({
  selector: 'app-ambient-background',
  template: `
    <div class="ambient__blob ambient__blob--primary"></div>
    <div class="ambient__blob ambient__blob--secondary"></div>
  `,
  styleUrls: ['./ambient-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmbientBackgroundComponent implements OnInit, OnDestroy {
  private current = { x: START_X, y: START_Y };
  private target = { x: START_X, y: START_Y };
  private frameId?: number;
  private lastHue?: number;
  private tiltBaseline?: TiltBaseline;
  private tiltActive = false;

  private readonly onPointerMove = (event: PointerEvent): void => {
    this.target = {
      x: clamp01(event.clientX / window.innerWidth),
      y: clamp01(event.clientY / window.innerHeight),
    };
    this.requestFrame();
  };

  private readonly onOrientation = (event: DeviceOrientationEvent): void => {
    const { beta, gamma } = event;

    // Desktop browsers may fire one event with no data.
    if (beta === null || gamma === null) {
      return;
    }

    const angle = screenAngle();

    if (!this.tiltBaseline || this.tiltBaseline.angle !== angle) {
      this.tiltBaseline = { beta, gamma, angle };
    }

    const baseline = this.tiltBaseline;
    baseline.beta += (beta - baseline.beta) * TILT_RECENTER;
    baseline.gamma += (gamma - baseline.gamma) * TILT_RECENTER;

    const [dx, dy] = toScreenAxes(gamma - baseline.gamma, beta - baseline.beta, angle);

    if (!this.tiltActive) {
      // Touch drags would fight the sensor, so tilt takes over completely.
      this.tiltActive = true;
      window.removeEventListener('pointermove', this.onPointerMove);
      document.documentElement.classList.add(TILT_CLASS);
    }

    this.target = {
      x: clamp01(START_X + dx / (2 * TILT_RANGE)),
      y: clamp01(START_Y + dy / (2 * TILT_RANGE)),
    };
    this.requestFrame();
  };

  private readonly requestTiltPermission = (): void => {
    this.removePermissionListeners();
    const request = (
      DeviceOrientationEvent as unknown as {
        requestPermission?: OrientationPermissionRequest;
      }
    ).requestPermission;

    // The orientation listener is already attached; once granted, events simply start arriving.
    request?.call(DeviceOrientationEvent).catch(() => undefined);
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

      if (this.supportsTilt()) {
        window.addEventListener('deviceorientation', this.onOrientation, {
          passive: true,
        });

        if (needsOrientationPermission()) {
          window.addEventListener('touchend', this.requestTiltPermission);
          window.addEventListener('click', this.requestTiltPermission);
        }
      }
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('deviceorientation', this.onOrientation);
    this.removePermissionListeners();
    document.documentElement.classList.remove(TILT_CLASS);

    if (this.frameId !== undefined) {
      cancelAnimationFrame(this.frameId);
    }
  }

  // Phones and tablets only: laptops with motion sensors keep the mouse.
  private supportsTilt(): boolean {
    return (
      'DeviceOrientationEvent' in window &&
      window.matchMedia('(hover: none) and (pointer: coarse)').matches
    );
  }

  private removePermissionListeners(): void {
    window.removeEventListener('touchend', this.requestTiltPermission);
    window.removeEventListener('click', this.requestTiltPermission);
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

function needsOrientationPermission(): boolean {
  return (
    typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown })
      .requestPermission === 'function'
  );
}

// Current screen rotation in degrees: 0, 90, 180 or 270.
function screenAngle(): number {
  const angle =
    screen.orientation?.angle ??
    (window as unknown as { orientation?: number }).orientation ??
    0;
  return ((angle % 360) + 360) % 360;
}

// beta/gamma are relative to the device; map them to screen x/y for the current rotation.
function toScreenAxes(gamma: number, beta: number, angle: number): [number, number] {
  switch (angle) {
    case 90:
      return [beta, -gamma];
    case 180:
      return [-gamma, -beta];
    case 270:
      return [-beta, gamma];
    default:
      return [gamma, beta];
  }
}
