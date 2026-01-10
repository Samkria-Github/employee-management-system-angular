import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { STATIC_USERS, User } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  public userRole = signal<'admin' | 'subadmin' | null>(null);
  public currentUser = signal<User | null>(null);

  isAuthenticated(): boolean {
    if (
      localStorage.getItem(environment.storageKey) &&
      localStorage.getItem(environment.storageKey) !== null
    ) {
      this.initializeUser();
      return true;
    }
    return false;
  }

  clearStorage(): void {
    localStorage.removeItem(environment.storageKey);
    this.userRole.set(null);
    this.currentUser.set(null);
  }

  
  login(email: string, password: string): { success: boolean; message?: string } {
    const user = STATIC_USERS.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );
    
    if (user) {
      localStorage.setItem(environment.currentUser, JSON.stringify(user));
      this.userRole.set(user.role);
      this.currentUser.set(user);
      return { success: true };
    }
    return { 
      success: false, 
      message: 'Invalid credentials. Please use demo accounts only.' 
    };
  }

  isAdmin(): boolean {
    return this.userRole() === 'admin';
  }

  isSubAdmin(): boolean {
    return this.isAdmin() || this.userRole() === 'subadmin';
  }

  canManageEmployees(): boolean {
    return this.isSubAdmin();
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  getRole(): 'admin' | 'subadmin' | null {
    return this.userRole();
  }

  private initializeUser(): void {
    try {
      const userData = localStorage.getItem(environment.currentUser);
      if (userData) {
        const user: User = JSON.parse(userData);
        const validUser = STATIC_USERS.find(u => u.id === user.id);
        if (validUser) {
          this.userRole.set(user.role);
          this.currentUser.set(user);
        } else {
          console.warn('Stored user not in static list - clearing');
          this.clearStorage();
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      this.clearStorage();
    }
  }
}
