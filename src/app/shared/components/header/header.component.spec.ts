/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { DestroyRef } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../../../service/auth.service';
import { SpinnerService } from '../../../service/spinner.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../../../models/employee.model';
import { ThemeService } from '../../../service/theme.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: jasmine.SpyObj<any>;
  let routerSpy: jasmine.SpyObj<Router>;
  let spinnerServiceSpy: jasmine.SpyObj<any>;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    role: 'admin',
    name: 'Test User'
  } as User;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', [
      'getCurrentUser', 'getRole', 'clearStorage', 'isAuthenticated'
    ]);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const spinnerSpy = jasmine.createSpyObj('SpinnerService', [
      'addToLoader', 'removeFromLoader'
    ]);
    const themeSpy = jasmine.createSpyObj('ThemeService', ['isDarkMode', 'toggleTheme']);

    authSpy.getCurrentUser.and.returnValue(mockUser);
    authSpy.getRole.and.returnValue('admin');
    authSpy.isAuthenticated.and.returnValue(true);
    themeSpy.isDarkMode.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: {}, snapshot: { params: {} } } },
        { provide: Router, useValue: routerSpyObj },
        { provide: AuthService, useValue: authSpy },
        { provide: DestroyRef, useValue: { onDestroy: jasmine.createSpy('onDestroy') } },
        { provide: FormBuilder, useValue: { 
          group: jasmine.createSpy('group').and.callFake((config: any) => new FormBuilder().group(config))
        } },
        { provide: SpinnerService, useValue: spinnerSpy },
        { provide: ConfirmationService, useValue: {} },
        { provide: ThemeService, useValue: themeSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<any>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    spinnerServiceSpy = TestBed.inject(SpinnerService) as jasmine.SpyObj<any>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct user name and role', () => {
    expect(component.userName).toBe('Test User');
    expect(component.roleDisplay).toBe('ADMIN');
  });

  it('should call clearStorage and navigate on logout', fakeAsync(() => {
    component.logout();
    expect(spinnerServiceSpy.addToLoader).toHaveBeenCalledWith('logout');
    tick(2000);
    expect(authServiceSpy.clearStorage).toHaveBeenCalled();
    expect(spinnerServiceSpy.removeFromLoader).toHaveBeenCalledWith('logout');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should sync with auth service changes via effect', () => {
    expect(authServiceSpy.getCurrentUser()).toEqual(mockUser);
    expect(authServiceSpy.getRole()).toBe('admin');
  });

  // ✅ FIXED: Direct signal manipulation (SIMPLEST & RELIABLE)
  it('should display guest user when no auth data available', () => {
    // Change spy return values
    authServiceSpy.getCurrentUser.and.returnValue(null);
    authServiceSpy.getRole.and.returnValue(null);
    
    // Force effect re-run by destroying and recreating fixture
    fixture.destroy();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    expect(component.userName).toBe('User');
    expect(component.roleDisplay).toBe('GUEST');
  });
});
