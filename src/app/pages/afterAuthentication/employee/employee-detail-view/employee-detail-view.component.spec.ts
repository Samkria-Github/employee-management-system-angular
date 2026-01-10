/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DestroyRef } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { SpinnerService } from '../../../../service/spinner.service';

import { EmployeeDetailViewComponent } from './employee-detail-view.component';
import { EmployeeService } from '../../../../service/employee.service';
import { FormBuilder } from '@angular/forms';

describe('EmployeeDetailViewComponent', () => {
  let component: EmployeeDetailViewComponent;
  let fixture: ComponentFixture<EmployeeDetailViewComponent>;

  const mockEmployees = [
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@test.com', 
      department: 'IT', 
      dob: '1990-01-01', 
      status: true, 
      imageUrl: '' 
    }
  ];

  const employeeServiceMock = {
    getEmployees: () => mockEmployees
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmployeeDetailViewComponent,
        CommonModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceMock },
        { provide: ActivatedRoute, useValue: { params: {}, snapshot: { params: {} } } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
        { provide: DestroyRef, useValue: { onDestroy: jasmine.createSpy('onDestroy') } },
        { provide: FormBuilder, useValue: { 
          group: jasmine.createSpy('group').and.returnValue({ valid: true }) 
        } },
        { provide: SpinnerService, useValue: { 
          addToLoader: jasmine.createSpy('addToLoader'),
          removeFromLoader: jasmine.createSpy('removeFromLoader')
        } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have employee service injected', () => {
    expect((component as any).employeeService).toBeDefined();
  });

  it('should have employees computed signal', () => {
    expect((component as any).employees).toBeDefined();
  });

  it('should have empData signal', () => {
    expect((component as any).empData).toBeDefined();
  });

  it('should render title', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toContain('Employee Details');
  });
});
