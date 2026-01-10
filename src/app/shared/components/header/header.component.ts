// header.component.ts
/**
 * HeaderComponent - Application header with theme toggle, user info, and logout
 * Features: Dark mode toggle, reactive user state, role display, logout functionality
 * husky: git add . && git commit -m "feat: header component with theme toggle and user signals"
 */

import { Component, inject, effect, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { BaseClass } from '../../class/baseClass';
import { ThemeService } from '../../../service/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/employee.model';

@Component({
  selector: 'employee-management-header',
  standalone: true,
  imports: [CommonModule, ButtonModule, ToggleSwitchModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends BaseClass {
  // Services
  protected themeService = inject(ThemeService);
  
  // Theme state
  protected isDarkMode = false;
  
  // User state signals
  protected currentUser = signal<User | null>(null);
  protected userRole = signal<'admin' | 'subadmin' | null>(null);

  constructor() {
    super();
    
    /**
     * Reactive effect syncs header state with services
     * Updates: theme, current user, user role
     * husky: Automatically reflects auth and theme changes
     */
    effect(() => {
      this.isDarkMode = this.themeService.isDarkMode();
      const user = this._authService.getCurrentUser();
      this.currentUser.set(user);
      this.userRole.set(this._authService.getRole());
    });
  }

  /**
   * Toggle between light/dark theme
   * husky: Persists theme preference via ThemeService
   */
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  /**
   * Computed user display name
   * Returns user name or fallback 'User'
   */
  get userName(): string {
    return this.currentUser()?.name || 'User';
  }

  /**
   * Computed role display (uppercase)
   * Returns role or 'GUEST' fallback
   */
  get roleDisplay(): string {
    return this.userRole()?.toUpperCase() || 'GUEST';
  }

  /**
   * Logout handler with loading state
   * husky: Clears auth storage and redirects to login
   */
  logout(): void {
    this._spinnerService.addToLoader('logout');
    setTimeout(() => {    
      this._authService.clearStorage();
      this._spinnerService.removeFromLoader('logout');
      this.router.navigate(['/']);
    }, 2000);
  }
}
