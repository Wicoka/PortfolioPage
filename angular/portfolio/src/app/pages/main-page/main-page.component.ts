import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgsRevealConfig } from 'ngx-scrollreveal';
import { ContactFormPayload, MainPageService } from './main-page.service';
import { Project } from './models/project.model';

type SectionId = 'home' | 'work' | 'about' | 'contact';

interface NavItem {
  id: SectionId;
  label: string;
}

interface ContentCard {
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, AfterViewInit {
  @ViewChild('home') home?: ElementRef<HTMLElement>;
  @ViewChild('work') work?: ElementRef<HTMLElement>;
  @ViewChild('about') about?: ElementRef<HTMLElement>;
  @ViewChild('contact') contact?: ElementRef<HTMLElement>;

  readonly date = new Date();
  readonly experience = this.date.getFullYear() - 2018;

  navItems: NavItem[] = [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  stats: Stat[] = [
    { value: `${this.experience}+`, label: 'years in frontend' },
    { value: 'Angular', label: 'what I use most' },
    { value: 'Remote', label: 'or hybrid, both work' },
  ];

  services: ContentCard[] = [
    {
      title: 'Frontend',
      description: 'Angular apps that stay fast and easy to change.',
    },
    {
      title: 'Team lead',
      description: 'Clear priorities, honest code reviews, no drama.',
    },
    {
      title: 'Mentoring',
      description: 'Helping juniors get good faster.',
    },
    {
      title: 'AI features',
      description: 'Only where they actually help the user.',
    },
  ];

  toolbox = [
    'Angular',
    'TypeScript',
    'Component systems',
    'Responsive UI',
    'Accessibility',
    'Performance',
    'Interaction design',
  ];

  socialLinks: SocialLink[] = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/viktor-szőke-2a680112a/',
      icon: 'bxl-linkedin',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/szoke.viktor95/',
      icon: 'bxl-instagram-alt',
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com/Wicoka00',
      icon: 'bxl-twitter',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/100000383629148',
      icon: 'bxl-facebook',
    },
  ];

  projects: Project[] = [];
  contactFormModel: ContactFormPayload = this.createEmptyContactForm();
  isSubmitting = false;
  submitSuccessMessage = '';
  submitErrorMessage = '';
  mobileMenuOpen = false;
  activeSection: SectionId = 'home';
  isHeaderElevated = false;

  private readonly prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  constructor(
    private readonly mainPageService: MainPageService,
    config: NgsRevealConfig
  ) {
    config.duration = this.prefersReducedMotion ? 0 : 900;
    config.distance = this.prefersReducedMotion ? '0px' : '24px';
    config.easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
    config.reset = false;
    config.delay = 0;
  }

  ngOnInit(): void {
    this.projects = this.mainPageService.getProjects();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateActiveSection(), 0);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isHeaderElevated = window.scrollY > 8;
    this.updateActiveSection();
  }

  downloadCV(): void {
    this.mainPageService.downloadCV();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // Header links are plain fragment links (so the URL and history stay right);
  // CSS scroll-behavior and scroll-padding-top handle the smooth scroll and header offset.
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  scrollToElement(id: SectionId): void {
    this.mobileMenuOpen = false;
    this.sectionRef(id)?.nativeElement.scrollIntoView({
      behavior: this.prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

  submitContactForm(form: NgForm): void {
    if (form.invalid || this.isSubmitting) {
      form.control.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccessMessage = '';
    this.submitErrorMessage = '';

    this.mainPageService.sendContactMessage(this.contactFormModel).subscribe({
      next: () => {
        this.submitSuccessMessage = "Got it, thanks. I'll get back to you soon.";
        this.contactFormModel = this.createEmptyContactForm();
        form.resetForm(this.contactFormModel);
        this.isSubmitting = false;
      },
      error: () => {
        this.submitErrorMessage =
          "That didn't go through. Mind trying again in a bit?";
        this.isSubmitting = false;
      },
    });
  }

  private sectionRef(id: SectionId): ElementRef<HTMLElement> | undefined {
    switch (id) {
      case 'home':
        return this.home;
      case 'work':
        return this.work;
      case 'about':
        return this.about;
      case 'contact':
        return this.contact;
    }
  }

  private createEmptyContactForm(): ContactFormPayload {
    return {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };
  }

  private updateActiveSection(): void {
    const sections: SectionId[] = ['home', 'work', 'about', 'contact'];
    const scrolledToBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    // The last section is often shorter than the viewport, so it would never reach the probe line.
    if (scrolledToBottom) {
      this.activeSection = 'contact';
      return;
    }

    const probe = 180;

    for (const id of sections) {
      const element = this.sectionRef(id)?.nativeElement;

      if (!element) {
        continue;
      }

      const { top, bottom } = element.getBoundingClientRect();

      if (probe >= top && probe < bottom) {
        this.activeSection = id;
      }
    }
  }
}
