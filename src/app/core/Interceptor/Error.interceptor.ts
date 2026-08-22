import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Core } from '../Servies/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private core: Core) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.extractErrorMessage(error);

        this.core._Error?.next(errorMessage);
        setTimeout(() => {
          this.core._Error?.next('');
        }, 5000);
        return throwError(() => error);
      }),
    );
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    const errBody = error.error;

    if (errBody?.errors) {
      return Object.values(errBody.errors).flat().join('\n');
    }

    if (typeof errBody === 'string') return errBody;
    return errBody?.message || errBody?.title || 'حدث خطأ غير متوقع';
  }
}
