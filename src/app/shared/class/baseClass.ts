import { DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { SpinnerService } from '../../service/spinner.service';
import { ConfirmDialogService } from '../../service/confirmDailog.service';

export class BaseClass {
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public _authService = inject(AuthService);
  public confirmationService = inject(ConfirmDialogService);
  public destroyRef$ = inject(DestroyRef);
  public formBuilder = inject(FormBuilder);
  public _spinnerService = inject(SpinnerService);
}