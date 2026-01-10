import { Component, computed, effect, inject, input, signal, WritableSignal } from '@angular/core';
import { employee } from '../../../../models/employee.model';
import { EmployeeService } from '../../../../service/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

/**
 * EmployeeDetailViewComponent - Displays single employee details
 * Features: Reactive employee lookup by ID, real-time data updates
 * husky: git add . && git commit -m "feat: employee detail view with reactive signals"
 */

@Component({
  selector: 'employee-management-employee-detail-view',
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './employee-detail-view.component.html',
  styleUrl: './employee-detail-view.component.scss'
})
export class EmployeeDetailViewComponent {
  // Input binding for employee ID from parent route
  protected id = input.required<string>();
  
  // Services
  private employeeService = inject(EmployeeService);
  
  // Computed employees list from service
  protected employees = computed(() => this.employeeService.getEmployees());
  
  // husky: Reactive employee data signal - updates when ID or employees change
  protected empData: WritableSignal<employee | undefined> = signal(undefined);

  constructor() {
    /**
     * Effect chain: id() → employees() → find employee → empData()
     * Automatically updates when:
     * 1. Route ID changes
     * 2. Employee list updates (add/edit/delete)
     */
    effect(() => {
      const employeeId = this.id();
      const foundEmp = this.employees().find((e: employee) => e.id === employeeId);    
      this.empData.set(foundEmp);
    });
  }
}
