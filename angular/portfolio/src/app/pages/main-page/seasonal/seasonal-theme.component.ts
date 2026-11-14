import { Component } from '@angular/core';
import { SeasonalThemeId } from './seasonal-theme.model';
import { SeasonalThemeService } from './seasonal-theme.service';

/**
 * Fixed, decorative layer between the ambient background and the page. Renders the active
 * theme's component; that component carries both the decoration and the theme's styles.
 */
@Component({
  selector: 'app-seasonal-theme',
  template: `
    <ng-container [ngSwitch]="active">
      <!-- REMOVE-AFTER-2026-12 -->
      <app-gta-theme *ngSwitchCase="'gta'"></app-gta-theme>
      <app-christmas-theme *ngSwitchCase="'christmas'"></app-christmas-theme>
      <app-new-year-theme *ngSwitchCase="'new-year'"></app-new-year-theme>
      <app-easter-theme *ngSwitchCase="'easter'"></app-easter-theme>
      <app-halloween-theme *ngSwitchCase="'halloween'"></app-halloween-theme>
    </ng-container>
  `,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }

      :host > * {
        position: absolute;
        inset: 0;
        display: block;
      }

      // System colours repaint fills and glyphs in CanvasText, the same colour as the text
      // on top of them, so the decoration would only get in the way.
      @media (forced-colors: active) {
        :host {
          display: none;
        }
      }
    `,
  ],
  host: { 'aria-hidden': 'true' },
})
export class SeasonalThemeComponent {
  constructor(private readonly seasonalTheme: SeasonalThemeService) {}

  get active(): SeasonalThemeId | null {
    return this.seasonalTheme.active;
  }
}
