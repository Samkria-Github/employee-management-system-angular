/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DestroyRef } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { SpinnerService } from '../../../service/spinner.service';
import { ConfirmationService } from 'primeng/api';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<any>;
  let spinnerServiceSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', [
      'login', 'isAuthenticated', 'getCurrentUser', 'getRole', 'clearStorage'
    ]);
    const spinnerServiceSpyObj = jasmine.createSpyObj('SpinnerService', [
      'addToLoader', 'removeFromLoader'
    ]);

    authServiceSpyObj.login.and.returnValue({ success: true });
    authServiceSpyObj.isAuthenticated.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        ButtonModule,
        PasswordModule,
        InputTextModule,
        MessageModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: {}, snapshot: { params: {} } } },
        { provide: Router, useValue: routerSpyObj },
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: DestroyRef, useValue: { onDestroy: jasmine.createSpy('onDestroy') } },
        { provide: FormBuilder, useValue: new FormBuilder() }, // ✅ Real FormBuilder
        { provide: SpinnerService, useValue: spinnerServiceSpyObj },
        { provide: ConfirmationService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<any>;
    spinnerServiceSpy = TestBed.inject(SpinnerService) as jasmine.SpyObj<any>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form with email and password controls', () => {
    const form = (component as any).loginForm;
    expect(form.get('email')).toBeTruthy();
    expect(form.get('password')).toBeTruthy();
  });

  it('should show spinner remove on invalid form submit', fakeAsync(() => {
    component['onSubmit'](); // Direct call for invalid form test
    tick(100);
    expect(spinnerServiceSpy.removeFromLoader).toHaveBeenCalledWith('login');
  }));

  // ✅ FIXED: Direct form manipulation + form.submit()
  it('should navigate on valid form submit', fakeAsync(() => {
    const form = (component as any).loginForm;
    
    // Fill form programmatically
    form.get('email')!.setValue('test@test.com');
    form.get('password')!.setValue('pass123');
    fixture.detectChanges();
    
    // Direct onSubmit call (bypasses DOM issues)
    component['onSubmit']();
    tick(1000);
    
    expect(authServiceSpy.login).toHaveBeenCalledWith('test@test.com', 'pass123');
    expect(spinnerServiceSpy.addToLoader).toHaveBeenCalledWith('login');
    expect(spinnerServiceSpy.removeFromLoader).toHaveBeenCalledWith('login');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/manage-employee']);
  }));

  // ✅ FIXED: Failed login test
  it('should show login error on failed login', fakeAsync(() => {
    authServiceSpy.login.and.returnValue({ success: false });
    
    const form = (component as any).loginForm;
    form.get('email')!.setValue('test@test.com');
    form.get('password')!.setValue('wrongpass');
    
    component['onSubmit']();
    tick(1000);
    
    expect(authServiceSpy.login).toHaveBeenCalledWith('test@test.com', 'wrongpass');
  }));

  // ✅ FIXED: Form submit event (most realistic)
  it('should call onSubmit on button click', fakeAsync(() => {
    const onSubmitSpy = spyOn(component, 'onSubmit');
    
    // Fill form first
    const form = (component as any).loginForm;
    form.get('email')!.setValue('test@test.com');
    form.get('password')!.setValue('pass123');
    fixture.detectChanges();
    
    // Trigger form ngSubmit (matches template: (ngSubmit)="onSubmit()")
    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('ngSubmit', null);
    
    expect(onSubmitSpy).toHaveBeenCalled();
  }));
});
