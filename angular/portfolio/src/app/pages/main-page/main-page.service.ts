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
    category: 'FinTech Tooling',
    subtitle: 'Build and test crypto trading robots.',
    description: 'Configure strategies and check their historical performance.',
    outcome: 'Faster strategy testing and validation.',
    tags: ['Angular', 'Crypto', 'Backtesting', 'Product UX'],
    image: 'assets/robot.png',
  },
  {
    id: 2,
    title: 'Agricultural Monitoring Platform',
    category: 'AgriTech Operations',
    subtitle: 'Register devices and monitor live field data.',
    description: 'Track device status and measurements in one clear dashboard.',
    outcome: 'Clearer daily monitoring.',
    tags: ['Angular', 'Monitoring', 'IoT', 'Dashboard Design'],
    image: 'assets/language-exam.png',
  },
  {
    id: 3,
    title: 'Modern CNC Machine Interface',
    category: 'Industrial UI',
    subtitle: 'Clear interfaces for complex CNC workflows.',
    description: 'Modern machine controls built for speed and operator confidence.',
    outcome: 'Simpler, faster operator workflows.',
    tags: ['Angular', 'Industrial UX', 'Machine UI', 'Frontend Implementation'],
    image: 'assets/robot.png',
  },
  {
    id: 4,
    title: 'Robotic Application Platform',
    category: 'Industrial Product Platform',
    subtitle: 'Build and deploy robotic applications without code.',
    description: 'Run and monitor automation directly on the factory floor.',
    outcome: 'Deployment cut from days to hours.',
    tags: ['Angular', 'Automation', 'Industrial UX', 'Platform Thinking'],
    image: 'assets/robot.png',
  },
  {
    id: 5,
    title: 'AI Powered Webshop',
    category: 'Commerce Personalization',
    subtitle: 'Personalized product discovery with AI.',
    description: 'AWS Personalize recommendations trained on 5,000 products.',
    outcome: 'More relevant product recommendations.',
    tags: ['Angular', 'AI', 'AWS Personalize', 'E-commerce'],
    image: 'assets/webshop-2.png',
  },
  {
    id: 6,
    title: 'Language Exam',
    category: 'EdTech Experience',
    subtitle: 'Take language exams from any device.',
    description: 'A responsive exam flow built with Angular and ASP.NET Core.',
    outcome: 'A clear, reliable remote exam flow.',
    tags: ['Angular', 'ASP.NET Core', 'Responsive UI', 'Remote Testing'],
    image: 'assets/language-exam.png',
  },
];
