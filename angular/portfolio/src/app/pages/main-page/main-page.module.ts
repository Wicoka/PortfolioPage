import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgsRevealModule } from 'ngx-scrollreveal';

import { AmbientBackgroundComponent } from './components/ambient-background/ambient-background.component';
import { SpotlightDirective } from './directives/spotlight.directive';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { SeasonalThemeComponent } from './seasonal/seasonal-theme.component';
import { ChristmasThemeComponent } from './seasonal/themes/christmas/christmas-theme.component';
import { EasterThemeComponent } from './seasonal/themes/easter/easter-theme.component';
import { GtaThemeComponent } from './seasonal/themes/gta/gta-theme.component';
import { HalloweenThemeComponent } from './seasonal/themes/halloween/halloween-theme.component';
import { NewYearThemeComponent } from './seasonal/themes/new-year/new-year-theme.component';

@NgModule({
  declarations: [
    MainPageComponent,
    AmbientBackgroundComponent,
    SpotlightDirective,
    SeasonalThemeComponent,
    // REMOVE-AFTER-2026-12
    GtaThemeComponent,
    ChristmasThemeComponent,
    NewYearThemeComponent,
    EasterThemeComponent,
    HalloweenThemeComponent,
  ],
  imports: [CommonModule, FormsModule, MainPageRoutingModule, NgsRevealModule],
})
export class MainPageModule {}
