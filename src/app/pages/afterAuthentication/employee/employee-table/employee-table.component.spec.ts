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
import { ConfirmationService } from 'primeng/api';
import { User } from '../../../../models/employee.model';

import { EmployeeTableComponent } from './employee-table.component';
import { EmployeeService } from '../../../../service/employee.service';
import { ConfirmDialogService } from '../../../../service/confirmDailog.service';

describe('EmployeeTableComponent', () => {
  let component: EmployeeTableComponent;
  let fixture: ComponentFixture<EmployeeTableComponent>;
  let router: Router;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    role: 'admin',
    name: 'Test User'
  } as User;

  const mockEmployees = [
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@test.com', 
      department: 'IT', 
      status: true,
      dob: '1990-01-01',
      imageUrl: 'assets/images/profile.png',
      phone: '1234567890'
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      email: 'jane@test.com', 
      department: 'HR', 
      status: false,
      dob: '1985-05-15',
      imageUrl: 'assets/images/profile.png',
      phone: '0987654321'
    }
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
      navigate: jasmine.createSpy('navigate')
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
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: { 
          isAuthenticated: () => true,
          getCurrentUser: () => mockUser,
          getRole: () => 'admin' as any,
          clearStorage: jasmine.createSpy('clearStorage')
        } },
        { provide: DestroyRef, useValue: { onDestroy: jasmine.createSpy('onDestroy') } },
        { provide: FormBuilder, useValue: { 
          group: jasmine.createSpy('group').and.callFake((config: any) => new FormBuilder().group(config))
        } },
        { provide: SpinnerService, useValue: { 
          addToLoader: jasmine.createSpy('addToLoader'),
          removeFromLoader: jasmine.createSpy('removeFromLoader')
        } },
        { provide: ConfirmationService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeTableComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees', () => {
    // ✅ Use DOM testing instead of protected access
    const tableRows = fixture.debugElement.queryAll(By.css('p-table tbody tr'));
    expect(tableRows.length).toBeGreaterThan(0);
  });

  it('should render table with correct number of paginated rows', () => {
    const tableRows = fixture.debugElement.queryAll(By.css('p-table tbody tr'));
    expect(tableRows.length).toBe(2); // pageSize = 2
  });

  it('should navigate to edit page', () => {
    component.onEdit(mockEmployees[0]);
    expect(router.navigate).toHaveBeenCalledWith(['/manage-employee/edit-employee', '1']);
  });

  it('should navigate to view page', () => {
    component.onView(mockEmployees[0]);
    expect(router.navigate).toHaveBeenCalledWith(['/manage-employee/view-employee', '1']);
  });

  it('should delete employee', fakeAsync(() => {
    const spinnerService = TestBed.inject(SpinnerService) as any;
    const employeeService = TestBed.inject(EmployeeService) as any;
    
    component.onDelete(mockEmployees[0]);
    tick();
    
    expect(employeeService.deleteEmployee).toHaveBeenCalledWith('1');
    expect(spinnerService.addToLoader).toHaveBeenCalledWith('delete employee');
    expect(spinnerService.removeFromLoader).toHaveBeenCalledWith('delete employee');
  }));

  it('should show table when data exists', () => {
    const table = fixture.debugElement.query(By.css('p-table'));
    expect(table).toBeTruthy();
  });

  it('should show Add Employee button when admin', () => {
    // ✅ Test via DOM - checks userRole() === 'admin'
    const button = fixture.debugElement.query(By.css('.btn-primary'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Add Employee');
  });

  it('should show View, Edit, Delete buttons for admin', () => {
    const viewButtons = fixture.debugElement.queryAll(By.css('p-button[icon="pi pi-eye"]'));
    const editButtons = fixture.debugElement.queryAll(By.css('p-button[icon="pi pi-pencil"]'));
    const deleteButtons = fixture.debugElement.queryAll(By.css('p-button[icon="pi pi-trash"]'));
    
    expect(viewButtons.length).toBeGreaterThan(0);
    expect(editButtons.length).toBeGreaterThan(0);
    expect(deleteButtons.length).toBeGreaterThan(0);
  });
});
