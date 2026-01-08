import { DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

export class BaseClass {
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public _authService = inject(AuthService);
  public destroyRef$ = inject(DestroyRef);
  public formBuilder = inject(FormBuilder)
}