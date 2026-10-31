import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';

/**
 * Exposes the pointer position inside the host as `--spot-x` / `--spot-y` (px),
 * so CSS can draw a highlight that follows the cursor. Runs outside NgZone on purpose.
 */
@Directive({
  selector: '[appSpotlight]',
})
export class SpotlightDirective implements OnInit, OnDestroy {
  private readonly onPointerMove = (event: PointerEvent): void => {
    const host = this.element.nativeElement;
    const rect = host.getBoundingClientRect();

    host.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    host.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  constructor(
    private readonly element: ElementRef<HTMLElement>,
    private readonly zone: NgZone
  ) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.element.nativeElement.addEventListener(
        'pointermove',
        this.onPointerMove,
        { passive: true }
      );
    });
  }

  ngOnDestroy(): void {
    this.element.nativeElement.removeEventListener(
      'pointermove',
      this.onPointerMove
    );
  }
}
