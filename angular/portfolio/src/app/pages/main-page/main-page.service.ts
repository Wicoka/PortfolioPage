import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language, ProjectId, TRANSLATIONS } from './i18n/translations';
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

  getProjects(language: Language): Project[] {
    const copy = TRANSLATIONS[language].projects;
    return projects.map((project) => ({ ...project, ...copy[project.id] }));
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

// Language-independent project data; titles and descriptions live in i18n/translations.ts.
interface ProjectMeta {
  id: ProjectId;
  tags: string[];
  // Decorative illustration (16:10, adapts to dark mode on its own).
  image: string;
}

const projects: ProjectMeta[] = [
  {
    id: 1,
    tags: ['Angular', 'Crypto', 'Backtesting'],
    image: 'assets/illustrations/backtester.svg',
  },
  {
    id: 2,
    tags: ['Angular', 'IoT', 'Dashboards'],
    image: 'assets/illustrations/field-monitoring.svg',
  },
  {
    id: 3,
    tags: ['Angular', 'Industrial UX', 'Machine UI'],
    image: 'assets/illustrations/machine-interface.svg',
  },
];
