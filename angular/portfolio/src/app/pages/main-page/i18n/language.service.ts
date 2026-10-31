import { Injectable } from '@angular/core';
import {
  DEFAULT_LANGUAGE,
  isLanguage,
  Language,
  LANGUAGES,
  PageCopy,
  TRANSLATIONS,
} from './translations';

const STORAGE_KEY = 'portfolio.language';

/**
 * Holds the active language and its copy. English unless the visitor picked
 * something else before; the browser language is deliberately not used.
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  readonly languages = LANGUAGES;

  private currentLanguage: Language = DEFAULT_LANGUAGE;

  constructor() {
    this.apply(this.readStoredLanguage() ?? DEFAULT_LANGUAGE);
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

  private readStoredLanguage(): Language | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return isLanguage(stored) ? stored : null;
    } catch {
      return null;
    }
  }
}
