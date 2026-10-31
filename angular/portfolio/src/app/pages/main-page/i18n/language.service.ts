import { Injectable } from '@angular/core';
import {
  FALLBACK_LANGUAGE,
  isLanguage,
  Language,
  LANGUAGES,
  PageCopy,
  TRANSLATIONS,
} from './translations';

const STORAGE_KEY = 'portfolio.language';

/**
 * Holds the active language and its copy. Starts with the visitor's earlier pick,
 * then the device language, then English.
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  readonly languages = LANGUAGES;

  private currentLanguage: Language = FALLBACK_LANGUAGE;

  constructor() {
    this.apply(
      this.readStoredLanguage() ?? this.detectDeviceLanguage() ?? FALLBACK_LANGUAGE
    );
  }

  get current(): Language {
    return this.currentLanguage;
  }

  get copy(): PageCopy {
    return TRANSLATIONS[this.currentLanguage];
  }

  setLanguage(language: Language): void {
    if (language === this.currentLanguage) {
      return;
    }

    this.apply(language);

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Storage can be blocked (private mode, disabled cookies); the choice just won't stick.
    }
  }

  private apply(language: Language): void {
    this.currentLanguage = language;
    document.documentElement.lang = language;
    document.title = TRANSLATIONS[language].documentTitle;
  }

  // navigator.languages is the device's preference order, e.g. ['de-AT', 'en-US'];
  // the first one we support wins, matched on the primary subtag.
  private detectDeviceLanguage(): Language | null {
    const preferred = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    for (const tag of preferred) {
      const primary = tag?.split('-')[0].toLowerCase();

      if (isLanguage(primary)) {
        return primary;
      }
    }

    return null;
  }

  private readStoredLanguage(): Language | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return isLanguage(stored) ? stored : null;
    } catch {
      return null;
    }
  }
}
