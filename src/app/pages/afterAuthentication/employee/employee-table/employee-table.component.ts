/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * EmployeeTableComponent - Manages employee listing with search, filter, pagination and CRUD actions
 * Features: 2 items per page, department filtering, search, sorting, admin actions
 * husky: git add . && git commit -m "feat: update employee table pagination"
 */

import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, TablePageEvent } from 'primeng/table';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { RouterModule } from "@angular/router";
import { BaseClass } from '../../../../shared/class/baseClass';
import { Department, employee } from '../../../../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { EmployeeService } from '../../../../service/employee.service';
import { ConfirmDialogService } from '../../../../service/confirmDailog.service';

@Component({
  selector: 'employee-management-employee-table',
  imports: [CommonModule, ButtonModule, Select, FormsModule, RouterModule, TableModule, IconFieldModule, InputTextModule, InputIconModule, SearchComponent, NoDataFoundComponent],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent extends BaseClass implements OnInit {
  // Department dropdown options
  protected department: Department[] | undefined;
  protected employeeService = inject(EmployeeService);
  protected confirmationService = inject(ConfirmDialogService);
  
  // Filter signals
  protected selectedDepartment = signal<Department | null>(null);    
  protected searchTerm = signal('');
  
  // Pagination signals - FIXED 2 items per page
  protected pageSize = signal<number>(2);
  protected currentPage = signal<number>(1);
  
  // Sorting signals
  protected sortField = signal<string>('');
  protected sortOrder = signal<number>(1);
  
  // Data signals
  protected totalRecords = signal<number>(0);
  protected users = signal<employee[]>([]);
  protected userRole = signal<'admin' | 'subadmin' | null>(null);

  // husky: Automatically updates totalRecords when filteredUsers changes (search/filter/sort)

  /**
   * Filters, sorts employees based on search term, department, and sort criteria
   * Chain: users() → filteredUsers() → totalRecordsComputed() → totalRecords()
   */
  protected filteredUsers = computed(() => {
    let data = this.users();
    const term = this.searchTerm().toLowerCase().trim();
    const dept = this.selectedDepartment()?.code || '';

    // Apply search filter
    if (term) {
      data = data.filter(user =>
        (user.name ?? '').toLowerCase().includes(term) ||
        (user.email ?? '').toLowerCase().includes(term) ||
        (user.department ?? '').toLowerCase().includes(term)
      );
    }

    // Apply department filter
    if (dept) {
      data = data.filter(user => user.department === dept);
    }

    // Apply sorting
    const field = this.sortField();
    const order = this.sortOrder();
    if (field) {
      data.sort((a: any, b: any) => {
        const valA = (a[field] ?? '').toString().toLowerCase();
        const valB = (b[field] ?? '').toString().toLowerCase();
        if (valA < valB) return -1 * order;
        if (valA > valB) return 1 * order;
        return 0;
      });
    }
    
    return data;
  });

  /** Computes total filtered records for pagination */
  protected totalRecordsComputed = computed(() => this.filteredUsers().length);

  /**
   * Paginates filtered users: 2 items per page
   * Page 1: items 0-1, Page 2: items 2-3, etc.
   */
  protected paginatedUsers = computed(() => {
    const all = this.filteredUsers();
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size;
    return all.slice(start, start + size);
  });

  constructor() {
    super();
    
    // husky: Effect syncs totalRecords with filtered data and updates user role
    effect(() => {
      this.totalRecords.set(this.totalRecordsComputed());
      this.userRole.set(this._authService.getRole());
    });
  }

  ngOnInit(): void {
    // Load initial data and setup departments
    this.users.set(this.employeeService.getEmployees());
    this.department = [
      { name: 'All Departments', code: '' },
      { name: 'Sales', code: 'Sales' },
      { name: 'HR', code: 'HR' },
      { name: 'IT', code: 'IT' },
      { name: 'Finance', code: 'Finance' }
    ];
  }

  /** Search handler - resets to page 1 */
  search(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  /** Delete employee with confirmation */
  onDelete(user: employee): void {
    this.confirmationService.showDeleteDialog('Delete', `Are you sure you want to delete ${user.name}'? This action cannot be undone.`).then((result: any) => {
      if (result) {
        this._spinnerService.addToLoader('delete employee');
        this.employeeService.deleteEmployee(user.id);
        this.users.set(this.employeeService.getEmployees()); // Triggers filteredUsers recompute
        this._spinnerService.removeFromLoader('delete employee');
      }
    });
  }

  /** Navigate to edit employee page */
  onEdit(user: employee): void {
    const userId = user.id;   
    this.router.navigate(['/manage-employee/edit-employee', userId]);
  }

  /** Navigate to view employee page */
  onView(user: employee): void {
    const userId = user.id;   
    this.router.navigate(['/manage-employee/view-employee', userId]);
  }

  /** Handle pagination - maintains fixed pageSize of 2 */
  pageOutput(event: TablePageEvent) {
    const page = Math.floor(event.first / event.rows) + 1;
    this.currentPage.set(page);
  }

  /** Sort handler - resets to page 1 */
  onSort(event: any): void {
    this.sortField.set(event.sortField);
    this.sortOrder.set(event.sortOrder);
    this.currentPage.set(1);
  }

  /** Department filter change - resets to page 1 */
  onDepartmentChange(event: any): void {
    this.selectedDepartment.set(event.value);
    this.currentPage.set(1);
  }
}
