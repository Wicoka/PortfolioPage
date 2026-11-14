import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { scatter } from '../../particles';

// Good Friday to Easter Monday: spring green, painted eggs bobbing along the bottom edge and a
// nest of whole eggs in the side margins of wide screens.
@Component({
  selector: 'app-easter-theme',
  template: `
    <span
      *ngFor="let egg of eggs"
      class="easter__egg"
      [style.left.%]="egg.left"
      [style.width.rem]="egg.size * 3"
      [style.height.rem]="egg.size * 4"
      [style.animation-duration.s]="egg.duration"
      [style.animation-delay.s]="egg.delay"
    ></span>
    <span *ngFor="let n of nest" class="easter__nest-egg easter__nest-egg--{{ n }}"></span>
  `,
  styleUrls: ['./easter-theme.component.scss'],
  // The styles re-theme the whole page, keyed on <html data-season="easter">.
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EasterThemeComponent {
  readonly eggs = scatter(12, 3, 6);
  // Full-size eggs in the side margins of wide screens; positions in the stylesheet.
  readonly nest = [1, 2, 3, 4];
}
