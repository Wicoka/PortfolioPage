import { isDevMode, NgModule } from '@angular/core';
import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

export const AVAILABLE_LANGS = [
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'hu', label: 'Magyar', flag: '🇭🇺' },
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: AVAILABLE_LANGS.map((lang) => lang.id),
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
