/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from 'primeng/button';
import { DestroyRef } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { SpinnerService } from '../../../service/spinner.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        ButtonModule,
        PasswordModule,
        InputTextModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: {}, snapshot: { params: {} } } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
        { provide: DestroyRef, useValue: { onDestroy: jasmine.createSpy('onDestroy') } },
        { provide: SpinnerService, useValue: { 
          addToLoader: jasmine.createSpy('addToLoader'),
          removeFromLoader: jasmine.createSpy('removeFromLoader')
        } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form with email and password', () => {
    const form = (component as any).loginForm;
    expect(form.get('email')).toBeTruthy();
    expect(form.get('password')).toBeTruthy();
  });

  it('should show email error on submit when empty', fakeAsync(() => {
    const submitted = (component as any).submitted;
    if (submitted && typeof submitted.set === 'function') {
      submitted.set(true);
    } else {
      (component as any).submitted = true;
    }
    
    (component as any).onSubmit();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.error_msg'));
    expect(error).toBeTruthy();
  }));

  it('should navigate on valid form submit', fakeAsync(() => {
    const form = (component as any).loginForm;
    
    form.get('email').setValue('test@test.com');
    form.get('password').setValue('pass123');
    fixture.detectChanges();
    
    expect(form.valid).toBeTrue();
    
    const submitted = (component as any).submitted;
    if (submitted && typeof submitted.set === 'function') {
      submitted.set(true);
    } else {
      (component as any).submitted = true;
    }
    
    (component as any).onSubmit();
    tick(1000);

    expect(router.navigate).toHaveBeenCalledWith(['/manage-employee']);
  }));

  it('should call submit on button click', () => {
    spyOn(component, 'onSubmit');
    
    // 🔥 ULTIMATE PRIME NG FIX - Direct DOM button click
    const buttonElement = fixture.nativeElement.querySelector('p-button button');
    if (buttonElement) {
      buttonElement.click();
    } else {
      const anyButton = fixture.nativeElement.querySelector('button');
      if (anyButton) {
        anyButton.click();
      }
    }
    
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
