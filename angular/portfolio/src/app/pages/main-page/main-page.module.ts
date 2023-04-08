import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgsRevealModule } from 'ngx-scrollreveal';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, MainPageRoutingModule, NgsRevealModule],
})
export class MainPageModule {}
