import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../service/auth.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isAuthRequired = route.data['authRequired'] ?? true; // Default: protected

  if (authService.isAuthenticated()) {
    // Token exists
    if (isAuthRequired) {
      return true; // Allow protected routes
    } else {
      router.navigate(['/manage-employee']); // Redirect from public routes
      return false;
    }
  } else {
    // No token
    if (isAuthRequired) {
      router.navigate(['/auth/login']); // Redirect to login
      return false;
    } else {
      return true; // Allow public routes
    }
  }
};
