/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { DestroyRef } from '@angular/core';
import { AuthService } from './service/auth.service';
import { EmployeeService } from './service/employee.service';
import { SpinnerService } from './service/spinner.service';

import { AppComponent } from './app.component';
import { FormBuilder } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        NoopAnimationsModule,
        RouterOutlet,
        RouterModule.forRoot([])
      ],
      providers: [
        ConfirmationService,
        MessageService,
        { provide: ActivatedRoute, useValue: { params: {}, snapshot: { params: {} } } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
        { provide: DestroyRef, useValue: { onDestroy: jasmine.createSpy('onDestroy') } },
        { provide: FormBuilder, useValue: { 
          group: jasmine.createSpy('group').and.callFake((config: any) => new FormBuilder().group(config))
        } },
        { provide: SpinnerService, useValue: { 
          addToLoader: jasmine.createSpy('addToLoader'),
          removeFromLoader: jasmine.createSpy('removeFromLoader')
        } },
        { provide: EmployeeService, useValue: { getEmployees: () => [] } }
      ]
    }).compileComponents();
  });

 it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should have the 'Employee-Management' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toEqual('Employee-Management');
  });

  it('should render app structure', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    expect(compiled.innerHTML.length).toBeGreaterThan(0);
  });

});
