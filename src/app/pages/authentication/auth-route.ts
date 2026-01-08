import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "../../core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authRequired: false } 
  }  
];