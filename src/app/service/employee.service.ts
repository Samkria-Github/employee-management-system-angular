import { Injectable } from '@angular/core';
import { employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly STORAGE_KEY = 'employees';

  getEmployees(): employee[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addEmployee(employee: Omit<employee, 'id' | 'status'>): employee {  // Exclude status too
  const employees = this.getEmployees();
  const newId = (employees.length + 101).toString();
  const newEmployee: employee = { ...employee, id: newId, status: true };  // Default status: true
  employees.unshift(newEmployee);
  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
  return newEmployee;
}

updateEmployee(updated: Partial<employee> & { id: string }): employee[] {  // Accept partial + required id
  const employees = this.getEmployees();
  const index = employees.findIndex(e => e.id === updated.id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updated };  // Merge updates
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
  }
  return employees;  // Return updated list
}

  deleteEmployee(id: string): void {
    const employees = this.getEmployees().filter(e => e.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
  }
}
