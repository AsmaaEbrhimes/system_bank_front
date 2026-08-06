import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from './Interceptor/Error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SuccessInterceptor } from './Interceptor/Sussess.interceptor';
import { LoaderInterceptor } from './Interceptor/loding-spaner.interceptor';
import { AuthInterceptor } from './Interceptor/authcathion.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
    providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: SuccessInterceptor,
      multi: true,
    },

      {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ],
})
export class CoreModule {}
