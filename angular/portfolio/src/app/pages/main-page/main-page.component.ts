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
import { LanguageService } from './i18n/language.service';
import { Language, LanguageOption, PageCopy } from './i18n/translations';
import { ContactFormPayload, MainPageService } from './main-page.service';
import { Project } from './models/project.model';

type SectionId = 'home' | 'work' | 'about' | 'contact';

type NavKey = keyof PageCopy['nav'];
type SubmitStatus = 'success' | 'error' | null;

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

  readonly navItems: Array<SectionId & NavKey> = ['work', 'about', 'contact'];

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
  // A status rather than a message, so the text follows a language switch.
  submitStatus: SubmitStatus = null;
  mobileMenuOpen = false;
  activeSection: SectionId = 'home';
  isHeaderElevated = false;

  private readonly prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  constructor(
    private readonly mainPageService: MainPageService,
    private readonly languageService: LanguageService,
    config: NgsRevealConfig
  ) {
    config.duration = this.prefersReducedMotion ? 0 : 900;
    config.distance = this.prefersReducedMotion ? '0px' : '24px';
    config.easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
    config.reset = false;
    config.delay = 0;
  }

  get copy(): PageCopy {
    return this.languageService.copy;
  }

  get currentLanguage(): Language {
    return this.languageService.current;
  }

  get languages(): LanguageOption[] {
    return this.languageService.languages;
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateActiveSection(), 0);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isHeaderElevated = window.scrollY > 8;
    this.updateActiveSection();
  }

  setLanguage(language: Language): void {
    this.languageService.setLanguage(language);
    this.loadProjects();
  }

  // Lists are rebuilt on a language switch; tracking keeps the DOM nodes,
  // so ScrollReveal does not hide and re-animate cards that are already visible.
  trackById(_: number, item: { id: number }): number {
    return item.id;
  }

  trackByIndex(index: number): number {
    return index;
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
    this.submitStatus = null;

    this.mainPageService.sendContactMessage(this.contactFormModel).subscribe({
      next: () => {
        this.submitStatus = 'success';
        this.contactFormModel = this.createEmptyContactForm();
        form.resetForm(this.contactFormModel);
        this.isSubmitting = false;
      },
      error: () => {
        this.submitStatus = 'error';
        this.isSubmitting = false;
      },
    });
  }

  private loadProjects(): void {
    this.projects = this.mainPageService.getProjects(this.languageService.current);
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
