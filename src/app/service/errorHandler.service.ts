import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      // HTTP errors
      console.error('HTTP Error:', {
        status: error.status,
        message: error.message,
        url: error.url
      });
      // Show toast, log to service, etc.
    } else if (error instanceof Error) {
      // Runtime/Template errors
      console.error('App Error:', error.message, error.stack);
    } else {
      console.error('Unknown Error:', error);
    }
  }
}
