import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { BaseClass } from '../../../../shared/class/baseClass';
import { employee } from '../../../../models/employee.model';
import { EmployeeService } from '../../../../service/employee.service';
import { CalendarModule } from 'primeng/calendar';

/**
 * AddEditComponent - Add/Edit employee form with image preview and validation
 * Features: Reactive forms, image preview, auto-populate for edit mode
 * husky: git add . && git commit -m "feat: add-edit employee form with reactive signals"
 */

@Component({
  selector: 'employee-management-add-edit',
  imports: [ 
    ButtonModule,
    TableModule,
    RouterModule,
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent extends BaseClass {
  // Form state signals
  protected addEditEmployeeForm: FormGroup;
  protected submitted = signal(false);
  protected previewUrl = signal<string | ArrayBuffer | null>(null);
  
  // Route input for edit mode
  protected id = input.required<string>();

  // Services and data
  private employeeService = inject(EmployeeService);
  protected employees = computed(() => this.employeeService.getEmployees());

  /**
   * Dynamic image source: preview → existing image → default
   * husky: Updates automatically when previewUrl or employees change
   */
  protected imageSrc = computed(
    () =>
      this.previewUrl() ||
      (this.id()
        ? this.employees().find((e: employee) => e.id === this.id())?.imageUrl
        : 'assets/images/profile.png') ||
      'assets/images/profile.png'
  );

  constructor() {
    super();
    
    // Initialize reactive form with validation
    this.addEditEmployeeForm = this.formBuilder.group({
      image: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      department: ['', [Validators.required]],
    });

    /**
     * Auto-populate form for edit mode or reset for add mode
     * Triggers when: id() changes or employees() updates
     */
    effect(() => {
      if (this.id()) {
        const editingEmployee = this.employees().find(
          (e: employee) => e.id === this.id()
        );

        if (editingEmployee) {
          this.addEditEmployeeForm.patchValue({
            name: editingEmployee.name,
            email: editingEmployee.email,
            dob: editingEmployee.dob ? new Date(editingEmployee.dob) : null,
            department: editingEmployee.department,
          });
          this.previewUrl.set(editingEmployee.imageUrl);
        }
      } else {
        this.addEditEmployeeForm.reset();
        this.previewUrl.set(null);
      }
    });
  }

  /**
   * Handle image file upload with preview
   * husky: Converts file to dataURL for immediate preview
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      this.addEditEmployeeForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl.set(e.target?.result || null);
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Submit handler - Add or Update employee
   * husky: Handles both add/edit modes with proper data transformation
   */
  onSubmit(): void {
    this._spinnerService.addToLoader('add employee');
    this.submitted.set(true);
    
    if (this.addEditEmployeeForm.valid) {
      const formValue = this.addEditEmployeeForm.value;
      const commonData = {
        name: formValue.name,
        email: formValue.email,
        dob: formValue.dob instanceof Date 
          ? formValue.dob.toISOString().split('T')[0] 
          : formValue.dob,
        department: formValue.department,
        imageUrl: this.previewUrl() as string,
      };

      if (this.id()) {
        // Update existing employee
        this.employeeService.updateEmployee({
          ...commonData,
          id: this.id(),
          status: this.employees().find((e: employee) => e.id === this.id())?.status || true,
        });
      } else {
        // Add new employee
        this.employeeService.addEmployee(commonData);
      }
      
      this._spinnerService.removeFromLoader('add employee');
      this.router.navigate(['/manage-employee']);
    }
  }
}
