import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private oAuthService: OAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error?.status === 401 && !this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow();
          return of(error);
        } else {
          return throwError(error);
        }
      }),
    );
  }
}
