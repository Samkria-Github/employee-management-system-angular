/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormBuilder } from '@angular/forms';
import { DestroyRef } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { SpinnerService } from '../../../../service/spinner.service';

import { EmployeeTableComponent } from './employee-table.component';
import { EmployeeService } from '../../../../service/employee.service';
import { ConfirmDialogService } from '../../../../service/confirmDailog.service';

describe('EmployeeTableComponent', () => {
  let component: EmployeeTableComponent;
  let fixture: ComponentFixture<EmployeeTableComponent>;
  let router: Router;

  // Simple mock data
  const mockEmployees = [
    { id: 1, name: 'John Doe', email: 'john@test.com', department: 'IT', status: true },
    { id: 2, name: 'Jane Smith', email: 'jane@test.com', department: 'HR', status: false }
  ];

  beforeEach(async () => {
    const employeeServiceMock = {
      getEmployees: () => mockEmployees,
      deleteEmployee: jasmine.createSpy('deleteEmployee')
    };

    const confirmServiceMock = {
      showDeleteDialog: () => Promise.resolve(true)
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')  // ✅ Single spy reference
    };

    await TestBed.configureTestingModule({
      imports: [
        EmployeeTableComponent,
        NoopAnimationsModule,
        ButtonModule,
        TableModule
      ],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceMock },
        { provide: ConfirmDialogService, useValue: confirmServiceMock },
        { provide: ActivatedRoute, useValue: { params: {}, snapshot: { params: {} } } },
        { provide: Router, useValue: routerMock },  // ✅ Single Router mock
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
        { provide: DestroyRef, useValue: { onDestroy: jasmine.createSpy('onDestroy') } },
        { provide: FormBuilder, useValue: { 
          group: jasmine.createSpy('group').and.callFake((config: any) => new FormBuilder().group(config))
        } },
        { provide: SpinnerService, useValue: { 
          addToLoader: jasmine.createSpy('addToLoader'),
          removeFromLoader: jasmine.createSpy('removeFromLoader')
        } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeTableComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees', () => {
    expect((component as any).users().length).toBe(2);
  });

  it('should search employees', () => {
    (component as any).search({ target: { value: 'John' } } as any);
    expect((component as any).searchTerm()).toBe('John');
    expect((component as any).currentPage()).toBe(1);
  });

  it('should navigate to edit page', () => {
    // ✅ FIXED: NO spyOn() - Router already has spy from provider
    (component as any).onEdit(mockEmployees[0]);
    expect(router.navigate).toHaveBeenCalledWith(['/manage-employee/edit-employee', 1]);
  });

  it('should navigate to view page', () => {
    // ✅ FIXED: NO spyOn() - Router already has spy from provider
    (component as any).onView(mockEmployees[0]);
    expect(router.navigate).toHaveBeenCalledWith(['/manage-employee/view-employee', 1]);
  });

  it('should delete employee', fakeAsync(() => {
    const deleteSpy = spyOn((component as any), 'onDelete');
    const deleteButton = fixture.debugElement.queryAll(By.css('p-button[icon="pi pi-trash"]'))[0];
    deleteButton.nativeElement.click();
    tick();
    expect(deleteSpy).toHaveBeenCalled();
  }));

  it('should show table when data exists', () => {
    const table = fixture.debugElement.query(By.css('p-table'));
    expect(table).toBeTruthy();
  });

  it('should show Add Employee button', () => {
    const button = fixture.debugElement.query(By.css('.btn-primary'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Add Employee');
  });
});
