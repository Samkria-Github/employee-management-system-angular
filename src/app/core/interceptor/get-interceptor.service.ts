import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface ApiResponse {
  status: string;
  message?: string;
  statusCode?: number;
}

export const responseInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  
  return next(req).pipe(
    delay(0),
    tap({
      next: (event: HttpEvent<unknown>) => {
       if (event instanceof HttpResponse) {
          const body = event.body as ApiResponse;
          if (body?.status === 'SUCCESS') {
            console.log('Success:', body.message);
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Request failed:', error.message);
        
        if (error.status === 401 || error.status === 403) {
          localStorage.clear();
          router.navigate(['/']);
        }
      }
    })
  );
};
