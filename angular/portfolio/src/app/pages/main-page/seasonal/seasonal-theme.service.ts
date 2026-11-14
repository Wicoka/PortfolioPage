import { Injectable } from '@angular/core';
import { resolveSeasonalTheme, SeasonalThemeId } from './seasonal-theme.model';

/**
 * The active seasonal look. Writes it to <html data-season="…">, which is the only thing
 * the theme components' styles key on. The date is read once, on load.
 */
@Injectable({
  providedIn: 'root',
})
export class SeasonalThemeService {
  readonly active: SeasonalThemeId | null = resolveSeasonalTheme(new Date());

  constructor() {
    const root = document.documentElement;

    if (this.active) {
      root.dataset['season'] = this.active;
    } else {
      delete root.dataset['season'];
    }
  }
}
