import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
} from '@angular/router';
import { ServiceAgreementHttpService } from '@backbase/data-ang/accesscontrol';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserContextGuard implements CanActivate, CanActivateChild {
  private targetUrl: string | undefined;
  private cookieValid = false;

  constructor(private readonly router: Router, private readonly serviceAgreementService: ServiceAgreementHttpService) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.targetUrl = state.url;

    return (
      this.cookieValid ||
      this.validateUserContextCookie().pipe(map((isValid) => isValid || this.getSelectContextUrlTree()))
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  getTargetUrl() {
    return this.targetUrl;
  }

  private getSelectContextUrlTree(): UrlTree {
    return this.router.createUrlTree(['/select-context']);
  }

  private validateUserContextCookie(): Observable<boolean> {
    return this.serviceAgreementService.getServiceAgreementContext().pipe(
      map(() => {
        this.cookieValid = true;
        return this.cookieValid;
      }),
      catchError(() => {
        this.cookieValid = false;
        return of(this.cookieValid);
      }),
    );
  }
}
