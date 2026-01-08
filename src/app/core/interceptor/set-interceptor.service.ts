import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export const setInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem(environment.storageKey) || '';
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-portal': 'web',
    'Authorization': `Bearer ${token}`
  });

  return next(req.clone({ headers }));
};
