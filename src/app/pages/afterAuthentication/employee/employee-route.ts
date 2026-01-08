
import { Routes } from "@angular/router"; 
import { EmployeeTableComponent } from "./employee-table/employee-table.component";
import { AddEditComponent } from "./add-edit/add-edit.component";
import { EmployeeDetailViewComponent } from "./employee-detail-view/employee-detail-view.component";
export const routes: Routes = [
    {
    path: '',
    component: EmployeeTableComponent
  },
  {
    path: 'edit-employee',
    component: AddEditComponent
  },
  {
    path: 'add-employee',
    component:AddEditComponent 
  },
  {
    path: 'view-employee',
    component:EmployeeDetailViewComponent 
  },
];