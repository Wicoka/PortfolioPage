import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgsRevealModule } from 'ngx-scrollreveal';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, FormsModule, MainPageRoutingModule, NgsRevealModule],
})
export class MainPageModule {}
