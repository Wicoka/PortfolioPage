import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgsRevealModule } from 'ngx-scrollreveal';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';

@NgModule({
  declarations: [MainPageComponent, ProjectDialogComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    NgsRevealModule,
    MatDialogModule,
  ],
})
export class MainPageModule {}
