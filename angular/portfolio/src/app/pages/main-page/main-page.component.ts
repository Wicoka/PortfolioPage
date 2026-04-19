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
import { NgsRevealConfig } from 'ngx-scrollreveal';
import Typed from 'typed.js';
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

  navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Value' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  heroPills = [
    'Angular Specialist',
    'UX-aware Frontend Delivery',
    'AI-ready Product Thinking',
  ];

  credibilityMetrics = [
    { value: 'Angular', label: 'Primary framework' },
    { value: 'UI/UX', label: 'Design-sensitive execution' },
    { value: 'Remote + Hybrid', label: 'Collaboration ready' },
  ];

  valueCards: ContentCard[] = [
    {
      title: 'Product-grade frontend engineering',
      description:
        'I build interfaces that are fast, resilient, and ready for real users, not just demos.',
    },
    {
      title: 'Design sensitivity with technical discipline',
      description:
        'My UI decisions are shaped by usability, visual hierarchy, and implementation quality at the same time.',
    },
    {
      title: 'Calm leadership under delivery pressure',
      description:
        'I can contribute as an individual engineer, lead a team, or mentor others without losing momentum.',
    },
  ];

  servicesCards: ContentCard[] = [
    {
      title: 'Web Development',
      description:
        'I create and maintain modern web experiences with a strong focus on interaction quality, responsiveness, and long-term maintainability.',
    },
    {
      title: 'Team Leading',
      description:
        'I help teams align on execution, communicate clearly, and keep delivery moving while maintaining quality standards.',
    },
    {
      title: 'Mentoring',
      description:
        'I support growth through practical guidance, technical coaching, and the kind of feedback that improves confidence and output.',
    },
    {
      title: 'AI-enhanced Product Work',
      description:
        'I am comfortable integrating AI concepts into product experiences when they improve relevance, speed, or decision-making for users.',
    },
  ];

  workPrinciples: ContentCard[] = [
    {
      title: 'Craft matters',
      description:
        'The strongest products feel clear, refined, and intentional in both micro-interactions and architecture.',
    },
    {
      title: 'Speed needs structure',
      description:
        'Good delivery comes from reusable components, predictable patterns, and focused execution.',
    },
    {
      title: 'Teams scale through clarity',
      description:
        'Strong communication, ownership, and thoughtful mentoring make ambitious products possible.',
    },
  ];

  stackGroups: StackGroup[] = [
    {
      title: 'Frontend',
      items: ['Angular', 'TypeScript', 'Responsive UI', 'Component Systems'],
    },
    {
      title: 'Product Thinking',
      items: ['UX/UI Awareness', 'Interaction Design', 'Performance', 'Accessibility'],
    },
    {
      title: 'Modern Delivery',
      items: ['Team Leadership', 'Mentoring', 'Cross-functional Work', 'AI Features'],
    },
  ];

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

  readonly date = new Date();
  readonly experience = this.date.getFullYear() - 2018;

  private typedInstance?: Typed;

  constructor(
    private readonly mainPageService: MainPageService,
    config: NgsRevealConfig
  ) {
    config.duration = 1200;
    config.reset = false;
    config.distance = '48px';
    config.delay = 120;
  }

  ngOnInit(): void {
    this.typedInstance = new Typed('#typer', {
      strings: [
        'Frontend Engineer',
        'Team Leader',
        'Casual Gamer',
      ],
      typeSpeed: 70,
      backSpeed: 34,
      backDelay: 1300,
      loop: true,
    });

    this.projects = this.mainPageService.getProjects();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateActiveSection(), 0);
  }

  ngOnDestroy(): void {
    this.typedInstance?.destroy();
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
          'Your message has been sent successfully. I will get back to you soon.';
        this.contactFormModel = this.createEmptyContactForm();
        form.resetForm(this.contactFormModel);
        this.isSubmitting = false;
      },
      error: () => {
        this.submitErrorMessage = 'Sending failed. Please try again later.';
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
