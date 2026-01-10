/* eslint-disable @angular-eslint/prefer-inject */
// theme.service.ts - CORRECTED
import { Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal(false);

  constructor(@Inject(DOCUMENT) private document: Document) {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const theme: Theme = savedTheme === 'dark' ? 'dark' : 'light';
    
    this.isDarkMode.set(theme === 'dark');
    this.applyTheme(theme);
  }

  toggleTheme() {
    const newTheme: Theme = this.isDarkMode() ? 'light' : 'dark';
    this.isDarkMode.set(!this.isDarkMode());
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  private applyTheme(theme: Theme) {
    if (theme === 'dark') {
      this.document.documentElement.classList.add('p-dark-mode');
    } else {
      this.document.documentElement.classList.remove('p-dark-mode');
    }
  }
}
