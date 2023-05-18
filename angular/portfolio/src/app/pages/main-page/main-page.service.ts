import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './models/project.model';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
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
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Robotic Application Platform',
    subtitle: `This is an automated platform for building, running, monitoring, and
      re-deploying collaborative applications.`,
    description: `This is an automated platform for building, running, monitoring, and
    re-deploying collaborative applications. It automates the process of
    getting a robotic application up and running, allowing deployment
    directly on the manufacturing floor, with zero programming and zero
    simulations. With this, complete applications can be deployed in just
    a few hours.`,
    image: 'assets/robot.png',
  },
  {
    id: 2,
    title: 'AI Powered Webshop',
    subtitle: `An AI-powered webshop can recommend new or similar products based on
    user behavior.`,
    description: `An AI-powered webshop can recommend new or similar products based on
    user behavior. This improves the user experience and increases sales
    by offering personalized recommendations tailored to the user's
    preferences. We used AWS personalize to build a recommendation engine
    for a webshop. The engine was trained on a dataset of 5000 products.`,
    image: 'assets/webshop-2.png',
  },
  {
    id: 3,
    title: 'Language Exam',
    subtitle: `This online language exam web application is designed to allow users
    to take language proficiency exams remotely.`,
    description: `This online language exam web application is designed to allow users
    to take language proficiency exams remotely. Built using the Angular
    framework for the front-end and ASP.NET Core for the back-end, the
    application provides a seamless user experience with intuitive
    navigation and responsive design. Users can easily sign up, choose
    their preferred language and level, and take the exam online from any
    device with internet access.`,
    image: 'assets/language-exam.png',
  },
];
