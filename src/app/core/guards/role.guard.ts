import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";

// src/app/guards/role.guard.ts
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAdmin()) {
    return true;
  }
  if (authService.isSubAdmin()) {
    const currentPath = route.routeConfig?.path || '';
    if (currentPath === 'manage-employee' || currentPath === '') {
      return true;
    }
    router.navigate(['/manage-employee'], { replaceUrl: true });
    return false;
  }
  router.navigate(['/auth/login']);
  return false;
};
