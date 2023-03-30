import { Component } from '@angular/core';
import { inject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'portfolio';
  constructor() {
    inject();
  }
}
