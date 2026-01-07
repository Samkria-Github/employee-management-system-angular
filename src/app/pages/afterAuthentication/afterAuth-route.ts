
import { Routes } from "@angular/router"; 
import { EmployeeTableComponent } from "./employee-table/employee-table.component";
import { EmployeeDetailViewComponent } from "./employee-detail-view/employee-detail-view.component";
import { AddEditComponent } from "./add-edit/add-edit.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'employee',
        pathMatch: 'full'
    },
    {
        path: 'employee',
        component: EmployeeTableComponent
    },    
    {
        path: 'employee/detail-view',
        component: EmployeeDetailViewComponent
    },
    {
        path: 'employee/add-employee',
        component: AddEditComponent
    },
    {
        path: 'employee/edit-employee',
        component: AddEditComponent
    },
];