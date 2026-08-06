import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Core } from '../Servies/core';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {
  constructor(
    private core: Core,
  ) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {

        if (req.method !== 'GET' && event.status === 200) {
          const serverMessage = event.body?.message;
          if (serverMessage) {
            this.core._Sussess.next(serverMessage);
            setTimeout(() => {
            this.core._Sussess.next("");
            }, 4000);
          }
        }
      }
    }),
  );
}
}
