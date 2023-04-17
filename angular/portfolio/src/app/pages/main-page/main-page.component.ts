import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgsRevealConfig } from 'ngx-scrollreveal';
import Typed from 'typed.js';
import { MainPageService } from './main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  // TODO - Change colors
  @ViewChild('home') home: ElementRef | undefined;
  @ViewChild('about') about: ElementRef | undefined;
  @ViewChild('services') services: ElementRef | undefined;
  @ViewChild('portfolio') portfolio: ElementRef | undefined;
  @ViewChild('contact') contact: ElementRef | undefined;

  date = new Date();
  experience = this.date.getFullYear() - 2018;

  constructor(
    private readonly mainPageService: MainPageService,
    config: NgsRevealConfig
  ) {
    config.duration = 2000;
    config.reset = false;
    config.distance = '80px';
    config.delay = 200;
  }

  ngOnInit(): void {
    const typed = new Typed('#typer', {
      strings: ['Frontend Developer', 'Team Leader', 'Casual Gamer'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
    });
  }

  downloadCV(): void {
    this.mainPageService.downloadCV();
  }

  scrollToElement(element: string): void {
    switch (element) {
      case 'home':
        this.home?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'about':
        this.about?.nativeElement.scrollIntoView({ behavior: 'smooth' });

        break;

      case 'services':
        this.services?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'portfolio':
        this.portfolio?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'contact':
        this.contact?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;

      default:
        break;
    }
  }
}
