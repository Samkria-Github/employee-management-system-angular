
import { Routes } from "@angular/router"; 

export const routes: Routes = [
  {
        path: '',
        redirectTo: 'employee',
        pathMatch: 'full'
    },
    {
        path: 'manage-employee',
        loadChildren: () => import('./employee/employee-route').then(m => m.routes)
    },
];