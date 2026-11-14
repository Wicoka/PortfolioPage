import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { scatter } from '../../particles';

// 25 to 31 October: always dark, pumpkin orange and violet, a moon, bats crossing it and
// jack-o'-lanterns in the bottom corners.
@Component({
  selector: 'app-halloween-theme',
  template: `
    <div class="halloween__moon"></div>
    <svg
      *ngFor="let bat of bats"
      class="halloween__bat"
      viewBox="0 0 64 28"
      focusable="false"
      [style.top.%]="bat.left * 0.6"
      [style.width.rem]="bat.size * 6.4"
      [style.animation-duration.s]="bat.duration"
      [style.animation-delay.s]="bat.delay"
    >
      <path
        d="M32 8c2-4 4-6 4-6l1 5c4-1 8 0 12 2 4-4 10-6 15-5-5 3-8 8-8 14-4-3-9-4-13-2-3 2-6 6-11 10-5-4-8-8-11-10-4-2-9-1-13 2 0-6-3-11-8-14 5-1 11 1 15 5 4-2 8-3 12-2l1-5s2 2 4 6Z"
      />
    </svg>
    <svg
      *ngFor="let pumpkin of pumpkins"
      class="halloween__pumpkin halloween__pumpkin--{{ pumpkin }}"
      viewBox="0 0 100 90"
      focusable="false"
    >
      <!-- Colours inline, like the illustrations: the stylesheet sits at the 2 kB budget. -->
      <path fill="#4d6b2a" d="M46 22c0-8 3-14 9-19l5 4c-5 4-7 9-7 15Z" />
      <ellipse fill="#d9590b" cx="30" cy="56" rx="26" ry="32" />
      <ellipse fill="#d9590b" cx="70" cy="56" rx="26" ry="32" />
      <ellipse fill="#ee7417" cx="50" cy="56" rx="22" ry="34" />
      <path
        class="pumpkin__face"
        d="M28 48l9-13 9 13Zm26 0 9-13 9 13Zm-8 10 4-6 4 6Zm-18 6c8 14 36 14 44 0-6 3-9 3-11 1l-3 5-4-5h-8l-4 5-3-5c-2 2-5 2-11-1Z"
      />
    </svg>
  `,
  styleUrls: ['./halloween-theme.component.scss'],
  // The styles re-theme the whole page, keyed on <html data-season="halloween">.
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalloweenThemeComponent {
  readonly bats = scatter(8, 14, 26);
  // Positions live in the stylesheet (.halloween__pumpkin--<n>).
  readonly pumpkins = [1, 2, 3];
}
