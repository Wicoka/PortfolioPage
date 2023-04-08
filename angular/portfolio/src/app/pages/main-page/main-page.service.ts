import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
