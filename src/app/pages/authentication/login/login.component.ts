import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from "primeng/checkbox";
import { BaseClass } from '../../../shared/class/baseClass';
import { PasswordModule } from "primeng/password";
import { FloatLabelModule } from "primeng/floatlabel";
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'employee-management-login',
  imports: [ReactiveFormsModule, ButtonModule, PasswordModule, FloatLabelModule, RouterModule, InputTextModule, Checkbox],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseClass {

  protected loginForm: FormGroup;

  constructor() {
    super();
     this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
   }

   onSubmit(): void {
    if (this.loginForm.valid) {
      setTimeout(() => {
        localStorage.setItem(environment.storageKey, 'Token')
        this.router.navigate(['/manage-employee'])
      }, 1000);
    }
   }
}
