import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgsRevealModule } from 'ngx-scrollreveal';

import { AmbientBackgroundComponent } from './components/ambient-background/ambient-background.component';
import { SpotlightDirective } from './directives/spotlight.directive';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    AmbientBackgroundComponent,
    SpotlightDirective,
  ],
  imports: [CommonModule, FormsModule, MainPageRoutingModule, NgsRevealModule],
})
export class MainPageModule {}
