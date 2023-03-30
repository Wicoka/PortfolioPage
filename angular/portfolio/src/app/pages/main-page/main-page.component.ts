import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  // TODO - Add Typed.js
  // https://www.jsdelivr.com/package/npm/typed.js
  // https://boxicons.com/usage

  date = new Date();

  constructor() {}
  ngOnInit(): void {
    const typed = new Typed('#element', {
      strings: ['Frontend Developer', 'Team Leader', 'Casual Gamer'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
    });
  }
}
