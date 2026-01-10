
import { Routes } from "@angular/router"; 
import { EmployeeTableComponent } from "./employee-table/employee-table.component";
import { AddEditComponent } from "./add-edit/add-edit.component";
import { roleGuard } from "../../../core/guards/role.guard";
import { EmployeeDetailViewComponent } from "./employee-detail-view/employee-detail-view.component";
export const routes: Routes = [
  {
    path: '',
    component: EmployeeTableComponent
  },
   {
    path: 'add-employee',
    component: AddEditComponent,
    canActivate: [roleGuard]
  },
  {
    path: 'edit-employee/:id',
    component: AddEditComponent,
    canActivate: [roleGuard] 
  },
  {
    path: 'view-employee/:id',
    component: EmployeeDetailViewComponent
  }
];