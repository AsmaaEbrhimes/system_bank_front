import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Core } from '../Servies/core';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor(private core: Core) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.core._loading.next(true);
    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.core._loading.next(false);
        }
      })
    );
  }
}
