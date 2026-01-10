// login.component.ts
/**
 * LoginComponent - Employee management login form
 * Features: Reactive form validation, auth service integration, error handling
 * husky: git add . && git commit -m "feat: login component with reactive signals"
 */

import { Component, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { BaseClass } from '../../../shared/class/baseClass';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'employee-management-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, 
    ButtonModule, PasswordModule, 
    InputTextModule, MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseClass {
  // Form state signals
  protected loginForm: FormGroup;
  protected submitted = signal(false);
  protected loginError = signal(false);

  constructor() {
    super();
    
    // Initialize login form with validation
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Login handler with loading states and error handling
   * husky: Integrates with auth service and navigates on success
   */
  onSubmit(): void {
    this._spinnerService.addToLoader('login');
    this.submitted.set(true);
    this.loginError.set(false);
    
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      setTimeout(() => {
        const result = this._authService.login(email, password);
        
        this._spinnerService.removeFromLoader('login');
        
        if (result.success) {
          localStorage.setItem(environment.storageKey, 'Token');
          this.router.navigate(['/manage-employee']);
        } else {
          this.loginError.set(true);
        }
      }, 1000);
    } else {
      this._spinnerService.removeFromLoader('login');
    }
  }
}
