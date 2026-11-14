import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { scatter } from '../../particles';

// 30 December to 2 January: gold and midnight violet, falling confetti.
@Component({
  selector: 'app-new-year-theme',
  template: `
    <span
      *ngFor="let piece of confetti"
      class="ny__confetti"
      [style.left.%]="piece.left"
      [style.width.rem]="piece.size * 0.6"
      [style.height.rem]="piece.size * 1.1"
      [style.animation-duration.s]="piece.duration"
      [style.animation-delay.s]="piece.delay"
    ></span>
  `,
  styleUrls: ['./new-year-theme.component.scss'],
  // The styles re-theme the whole page, keyed on <html data-season="new-year">.
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewYearThemeComponent {
  readonly confetti = scatter(30, 7, 14);
}
