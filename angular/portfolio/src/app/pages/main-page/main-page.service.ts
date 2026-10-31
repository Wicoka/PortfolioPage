import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './models/project.model';

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  private readonly contactEndpoint =
    'https://formsubmit.co/ajax/viktorszoke@viktorszoke.com';

  constructor(private http: HttpClient) {}

  downloadCV() {
    const fileUrl = 'assets/Viktor_Szoke_CV.pdf';
    const fileName = 'Viktor_Szoke_CV.pdf';

    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  }

  getProjects(): Project[] {
    return projects;
  }

  sendContactMessage(payload: ContactFormPayload): Observable<string> {
    return this.http.post(
      this.contactEndpoint,
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        _subject: payload.subject.trim() || `Website contact from ${payload.name}`,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      responseType: 'text',
      }
    );
  }
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Crypto Trading Backtester',
    category: 'Fintech',
    subtitle: 'Set up a trading bot, run it on past data, see if it would have made money.',
    description: 'Configure a strategy and check how it would have done historically.',
    outcome: 'Testing a strategy got a lot faster.',
    tags: ['Angular', 'Crypto', 'Backtesting'],
    image: 'assets/robot.png',
  },
  {
    id: 2,
    title: 'Agricultural Monitoring',
    category: 'Agritech',
    subtitle: 'Register devices out in the field and watch their data come in live.',
    description: 'Device status and measurements on one dashboard.',
    outcome: 'The daily check-in fits on one screen.',
    tags: ['Angular', 'IoT', 'Dashboards'],
    image: 'assets/language-exam.png',
  },
  {
    id: 3,
    title: 'CNC Machine Interface',
    category: 'Industrial',
    subtitle: 'A cleaner UI for CNC machines, made for the people standing next to them.',
    description: 'Modern machine controls that operators can trust.',
    outcome: 'Operators get through jobs faster.',
    tags: ['Angular', 'Industrial UX', 'Machine UI'],
    image: 'assets/robot.png',
  },
  {
    id: 4,
    title: 'Robotic Application Platform',
    category: 'Robotics',
    subtitle: 'Build robot apps without code, then run and monitor them on the factory floor.',
    description: 'No-code building, deployment and monitoring for robot applications.',
    outcome: 'Deployment went from days to hours.',
    tags: ['Angular', 'Automation', 'Platform'],
    image: 'assets/robot.png',
  },
  {
    id: 5,
    title: 'AI Webshop',
    category: 'E-commerce',
    subtitle: 'Product recommendations from AWS Personalize, trained on 5,000 products.',
    description: 'Personalized product discovery powered by AWS Personalize.',
    outcome: 'Recommendations that actually make sense.',
    tags: ['Angular', 'AWS Personalize', 'AI'],
    image: 'assets/webshop-2.png',
  },
  {
    id: 6,
    title: 'Language Exam',
    category: 'Edtech',
    subtitle: 'Take a language exam from any device. Angular on the front, ASP.NET Core behind it.',
    description: 'A responsive exam flow built with Angular and ASP.NET Core.',
    outcome: 'Remote exams that just work.',
    tags: ['Angular', 'ASP.NET Core', 'Responsive UI'],
    image: 'assets/language-exam.png',
  },
];
