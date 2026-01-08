import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainComponent } from './layout/main/main.component';

export const routes: Routes = [
      {
    path: "",
    pathMatch: "full",
    redirectTo: "auth/login",
  }, 
  {
    path: "auth",
    loadChildren: () =>
      import("./pages/authentication/auth-route").then((m) => m.routes),
  },
  {
    path: "",
    canActivate: [AuthGuard],
    data: { authRequired: true },
    component: MainComponent,
    loadChildren: () => import("./pages/afterAuthentication/afterAuth-route").then((m) => m.routes)
  }
];
