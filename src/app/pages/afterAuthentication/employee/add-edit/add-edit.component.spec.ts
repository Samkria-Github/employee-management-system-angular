/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { Router, ActivatedRoute } from '@angular/router';
import { DestroyRef } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { SpinnerService } from '../../../../service/spinner.service';

import { AddEditComponent } from './add-edit.component';
import { EmployeeService } from '../../../../service/employee.service';

describe('AddEditComponent', () => {
  let component: AddEditComponent;
  let fixture: ComponentFixture<AddEditComponent>;
  let employeeServiceMock: any;
  let spinnerServiceMock: any;

  const employeeServiceMockObj = {
    getEmployees: () => [],
    addEmployee: jasmine.createSpy('addEmployee'),
    updateEmployee: jasmine.createSpy('updateEmployee')
  };

  beforeEach(async () => {
    const spinnerServiceMockObj = {
      addToLoader: jasmine.createSpy('addToLoader'),
      removeFromLoader: jasmine.createSpy('removeFromLoader')
    };

    await TestBed.configureTestingModule({
      imports: [
        AddEditComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        ButtonModule,
        InputTextModule,
        CalendarModule
      ],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceMockObj },
        { provide: ActivatedRoute, useValue: { params: {}, snapshot: { params: {} } } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
        { provide: DestroyRef, useValue: { onDestroy: jasmine.createSpy('onDestroy') } },
        { provide: SpinnerService, useValue: spinnerServiceMockObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditComponent);
    component = fixture.componentInstance;
    employeeServiceMock = TestBed.inject(EmployeeService);
    spinnerServiceMock = TestBed.inject(SpinnerService);
    
    fixture.componentRef.setInput('id', null);  // Add mode
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form with required fields', () => {
    const form = (component as any).addEditEmployeeForm;
    expect(form.get('name')).toBeTruthy();
    expect(form.get('email')).toBeTruthy();
    expect(form.get('dob')).toBeTruthy();
    expect(form.get('department')).toBeTruthy();
  });

  it('should show validation errors on submit', fakeAsync(() => {
    (component as any).submitted.set(true);
    (component as any).onSubmit();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('.error_msg'));
    expect(errors.length).toBeGreaterThan(0);
  }));

  it('should call addEmployee on valid form submit', fakeAsync(() => {
    const form = (component as any).addEditEmployeeForm;
    
    // Fill ALL required fields
    form.get('name').setValue('John Doe');
    form.get('email').setValue('john@test.com');
    form.get('dob').setValue('1990-01-01');
    form.get('department').setValue('IT');
    form.get('image').setValue({ name: 'test.png' } as File); // Mock file
    
    fixture.detectChanges();  // ✅ Trigger change detection & effect
    
    // Verify form is now valid
    expect(form.valid).toBeTrue();
    
    (component as any).submitted.set(true);
    (component as any).onSubmit();

    expect(employeeServiceMock.addEmployee).toHaveBeenCalled();
    expect(spinnerServiceMock.addToLoader).toHaveBeenCalledWith('add employee');
    expect(spinnerServiceMock.removeFromLoader).toHaveBeenCalledWith('add employee');
  }));

  it('should have title', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toContain('Add Employee');
  });

  it('should have submit button', () => {
    const button = fixture.debugElement.query(By.css('p-button'));
    expect(button).toBeTruthy();
  });
});
