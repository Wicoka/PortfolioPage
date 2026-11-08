import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { NgsRevealConfig } from 'ngx-scrollreveal';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Typed from 'typed.js';
import { AVAILABLE_LANGS } from '../../transloco/transloco-root.module';
import { ContactFormPayload, MainPageService } from './main-page.service';
import { Project } from './models/project.model';

interface NavItem {
  id: string;
  label: string;
}

interface ContentCard {
  title: string;
  description: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

interface StackGroup {
  title: string;
  items: string[];
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('home') home?: ElementRef<HTMLElement>;
  @ViewChild('about') about?: ElementRef<HTMLElement>;
  @ViewChild('services') services?: ElementRef<HTMLElement>;
  @ViewChild('portfolio') portfolio?: ElementRef<HTMLElement>;
  @ViewChild('contact') contact?: ElementRef<HTMLElement>;

  navItems: NavItem[] = [];
  heroPills: string[] = [];
  credibilityMetrics: Array<{ value: string; label: string }> = [];
  valueCards: ContentCard[] = [];
  servicesCards: ContentCard[] = [];
  workPrinciples: ContentCard[] = [];
  stackGroups: StackGroup[] = [];

  socialLinks: SocialLink[] = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/100000383629148',
      icon: 'bxl-facebook',
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com/Wicoka00',
      icon: 'bxl-twitter',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/szoke.viktor95/',
      icon: 'bxl-instagram-alt',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/viktor-szőke-2a680112a/',
      icon: 'bxl-linkedin',
    },
  ];

  projects: Project[] = [];
  contactFormModel: ContactFormPayload = this.createEmptyContactForm();
  isSubmitting = false;
  submitSuccessMessage = '';
  submitErrorMessage = '';
  mobileMenuOpen = false;
  activeSection = 'home';
  isHeaderElevated = false;
  activeLang = 'en';

  readonly availableLangs = AVAILABLE_LANGS;

  readonly date = new Date();
  readonly experience = this.date.getFullYear() - 2018;

  private typedInstance?: Typed;
  private translationSubscription?: Subscription;
  private viewInitialized = false;

  constructor(
    private readonly mainPageService: MainPageService,
    private readonly translocoService: TranslocoService,
    config: NgsRevealConfig
  ) {
    config.duration = 1200;
    config.reset = false;
    config.distance = '48px';
    config.delay = 120;
  }

  ngOnInit(): void {
    this.translationSubscription = this.translocoService.langChanges$
      .pipe(switchMap((lang) => this.translocoService.load(lang)))
      .subscribe(() => {
        this.activeLang = this.translocoService.getActiveLang();
        this.updateTranslatedContent();
        this.queueTypedInit();
      });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;

    setTimeout(() => {
      this.updateActiveSection();
      this.initTyped();
    }, 0);
  }

  ngOnDestroy(): void {
    this.typedInstance?.destroy();
    this.translationSubscription?.unsubscribe();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isHeaderElevated = window.scrollY > 24;
    this.updateActiveSection();
  }

  downloadCV(): void {
    this.mainPageService.downloadCV();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.mobileMenuOpen = false;
  }

  scrollToElement(element: string): void {
    this.mobileMenuOpen = false;

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
        this.submitSuccessMessage =
          this.translocoService.translate('contact.successMessage');
        this.contactFormModel = this.createEmptyContactForm();
        form.resetForm(this.contactFormModel);
        this.isSubmitting = false;
      },
      error: () => {
        this.submitErrorMessage = this.translocoService.translate(
          'contact.errorMessage'
        );
        this.isSubmitting = false;
      },
    });
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

  private initTyped(): void {
    if (!document.querySelector('#typer')) {
      return;
    }

    this.typedInstance?.destroy();

    this.typedInstance = new Typed('#typer', {
      strings: [
        this.translocoService.translate('hero.typed1'),
        this.translocoService.translate('hero.typed2'),
        this.translocoService.translate('hero.typed3'),
      ],
      typeSpeed: 70,
      backSpeed: 34,
      backDelay: 1300,
      loop: true,
    });
  }

  private queueTypedInit(): void {
    if (!this.viewInitialized) {
      return;
    }

    setTimeout(() => this.initTyped(), 0);
  }

  private updateTranslatedContent(): void {
    this.navItems = [
      { id: 'home', label: this.translocoService.translate('nav.home') },
      { id: 'about', label: this.translocoService.translate('nav.about') },
      { id: 'services', label: this.translocoService.translate('nav.services') },
      {
        id: 'portfolio',
        label: this.translocoService.translate('nav.portfolio'),
      },
      { id: 'contact', label: this.translocoService.translate('nav.contact') },
    ];

    this.heroPills = [
      this.translocoService.translate('hero.pill1'),
      this.translocoService.translate('hero.pill2'),
      this.translocoService.translate('hero.pill3'),
    ];

    this.credibilityMetrics = [1, 2, 3].map((index) => ({
      value: this.translocoService.translate(`proof.metric${index}.value`),
      label: this.translocoService.translate(`proof.metric${index}.label`),
    }));

    this.valueCards = [1, 2, 3].map((index) => ({
      title: this.translocoService.translate(`about.card${index}.title`),
      description: this.translocoService.translate(`about.card${index}.desc`),
    }));

    this.servicesCards = [1, 2, 3, 4].map((index) => ({
      title: this.translocoService.translate(`services.card${index}.title`),
      description: this.translocoService.translate(`services.card${index}.desc`),
    }));

    this.workPrinciples = [1, 2, 3].map((index) => ({
      title: this.translocoService.translate(`craft.principle${index}.title`),
      description: this.translocoService.translate(
        `craft.principle${index}.desc`
      ),
    }));

    this.stackGroups = [1, 2, 3].map((index) => ({
      title: this.translocoService.translate(`stack.group${index}.title`),
      items: [1, 2, 3, 4].map((itemIndex) =>
        this.translocoService.translate(
          `stack.group${index}.item${itemIndex}`
        )
      ),
    }));

    this.projects = this.mainPageService.getProjects().map((project) => {
      const tags = this.translocoService.translate<string[]>(
        `projects.${project.id}.tags`
      );

      return {
        ...project,
        category: this.translocoService.translate(
          `projects.${project.id}.category`
        ),
        title: this.translocoService.translate(`projects.${project.id}.title`),
        subtitle: this.translocoService.translate(
          `projects.${project.id}.subtitle`
        ),
        description: this.translocoService.translate(
          `projects.${project.id}.description`
        ),
        outcome: this.translocoService.translate(
          `projects.${project.id}.outcome`
        ),
        tags: Array.isArray(tags) ? tags : project.tags,
      };
    });
  }

  private updateActiveSection(): void {
    const sections: Array<{ id: string; ref?: ElementRef<HTMLElement> }> = [
      { id: 'home', ref: this.home },
      { id: 'about', ref: this.about },
      { id: 'services', ref: this.services },
      { id: 'portfolio', ref: this.portfolio },
      { id: 'contact', ref: this.contact },
    ];

    const scrollPosition = window.scrollY + 180;

    for (const section of sections) {
      const element = section.ref?.nativeElement;

      if (!element) {
        continue;
      }

      const offsetTop = element.offsetTop;
      const offsetBottom = offsetTop + element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        this.activeSection = section.id;
      }
    }
  }
}
