import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgsRevealConfig } from 'ngx-scrollreveal';
import Typed from 'typed.js';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';
import { MainPageService } from './main-page.service';
import { Project } from './models/project.model';

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

  projects: Project[] = [];

  date = new Date();
  experience = this.date.getFullYear() - 2018;

  constructor(
    private readonly mainPageService: MainPageService,
    public dialog: MatDialog,
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
    this.projects = this.mainPageService.getProjects();
  }

  downloadCV(): void {
    this.mainPageService.downloadCV();
  }

  openProjectDialog(id: number): void {
    const project = this.projects.find((project) => project.id === id);
    if (!project) return;
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      data: project,
    });

    dialogRef.afterClosed().subscribe();
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
