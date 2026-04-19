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
    subtitle: `A backtester application where trading robots can be created,
    configured, and evaluated for crypto trading strategies.`,
    description: `This project focused on a backtester application designed for
    creating and testing crypto trading robots. The product allowed users to
    define trading logic, configure strategy parameters, and evaluate
    historical performance in a structured environment before moving toward
    live market usage.`,
    outcome:
      'Enabled strategy experimentation and faster decision-making through a clearer workflow for building and validating trading robots.',
    tags: ['Angular', 'Crypto', 'Backtesting', 'Product UX'],
    image: 'assets/robot.png',
  },
  {
    id: 2,
    title: 'Agricultural Monitoring Platform',
    category: 'AgriTech Operations',
    subtitle: `An agricultural application for registering devices and monitoring
    the values they send back from the fields.`,
    description: `This application supported agricultural operations by making it
    possible to register field devices and monitor incoming values from remote
    environments. The interface had to help users keep track of device status,
    incoming measurements, and operational context in a way that remained
    easy to understand.`,
    outcome:
      'Improved visibility into field data and device activity with a cleaner monitoring interface for day-to-day operations.',
    tags: ['Angular', 'Monitoring', 'IoT', 'Dashboard Design'],
    image: 'assets/language-exam.png',
  },
  {
    id: 3,
    title: 'Modern CNC Machine Interface',
    category: 'Industrial UI',
    subtitle: `Implementation of modern interfaces for CNC machines with strong
    focus on clarity, usability, and operator workflows.`,
    description: `This work involved implementing modern user interfaces for CNC
    machines where clarity, speed, and operator confidence were essential.
    The challenge was to translate complex machine workflows into interfaces
    that felt contemporary, understandable, and efficient in real industrial
    contexts.`,
    outcome:
      'Delivered a more modern machine-facing experience that supported better operator usability and clearer industrial workflows.',
    tags: ['Angular', 'Industrial UX', 'Machine UI', 'Frontend Implementation'],
    image: 'assets/robot.png',
  },
  {
    id: 4,
    title: 'Robotic Application Platform',
    category: 'Industrial Product Platform',
    subtitle: `This is an automated platform for building, running, monitoring, and
      re-deploying collaborative applications.`,
    description: `This is an automated platform for building, running, monitoring, and
    re-deploying collaborative applications. It automates the process of
    getting a robotic application up and running, allowing deployment
    directly on the manufacturing floor, with zero programming and zero
    simulations. With this, complete applications can be deployed in just
    a few hours.`,
    outcome:
      'Reduced deployment complexity for robotics teams and enabled much faster rollout on the manufacturing floor.',
    tags: ['Angular', 'Automation', 'Industrial UX', 'Platform Thinking'],
    image: 'assets/robot.png',
  },
  {
    id: 5,
    title: 'AI Powered Webshop',
    category: 'Commerce Personalization',
    subtitle: `An AI-powered webshop can recommend new or similar products based on
    user behavior.`,
    description: `An AI-powered webshop can recommend new or similar products based on
    user behavior. This improves the user experience and increases sales
    by offering personalized recommendations tailored to the user's
    preferences. We used AWS personalize to build a recommendation engine
    for a webshop. The engine was trained on a dataset of 5000 products.`,
    outcome:
      'Combined modern commerce UX with AI-driven recommendation logic to improve discovery and relevance.',
    tags: ['Angular', 'AI', 'AWS Personalize', 'E-commerce'],
    image: 'assets/webshop-2.png',
  },
  {
    id: 6,
    title: 'Language Exam',
    category: 'EdTech Experience',
    subtitle: `This online language exam web application is designed to allow users
    to take language proficiency exams remotely.`,
    description: `This online language exam web application is designed to allow users
    to take language proficiency exams remotely. Built using the Angular
    framework for the front-end and ASP.NET Core for the back-end, the
    application provides a seamless user experience with intuitive
    navigation and responsive design. Users can easily sign up, choose
    their preferred language and level, and take the exam online from any
    device with internet access.`,
    outcome:
      'Delivered a reliable remote exam flow with responsive UI and clear task progression for learners.',
    tags: ['Angular', 'ASP.NET Core', 'Responsive UI', 'Remote Testing'],
    image: 'assets/language-exam.png',
  },
];
