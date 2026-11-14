import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { scatter } from '../../particles';

// Advent to Boxing Day: red and pine green, falling snow.
@Component({
  selector: 'app-christmas-theme',
  template: `
    <span
      *ngFor="let flake of flakes"
      class="xmas__flake"
      [style.left.%]="flake.left"
      [style.width.rem]="flake.size * 0.8"
      [style.height.rem]="flake.size * 0.8"
      [style.animation-duration.s]="flake.duration"
      [style.animation-delay.s]="flake.delay"
    ></span>
  `,
  styleUrls: ['./christmas-theme.component.scss'],
  // The styles re-theme the whole page, keyed on <html data-season="christmas">.
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChristmasThemeComponent {
  readonly flakes = scatter(28, 10, 22);
}
