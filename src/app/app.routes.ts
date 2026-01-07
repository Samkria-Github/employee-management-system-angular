import { Routes } from '@angular/router';

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
    //  canActivate: [AuthGuard],
    loadChildren: () =>
      import("./pages/afterAuthentication/afterAuth-route").then((m) => m.routes),
  }
];
