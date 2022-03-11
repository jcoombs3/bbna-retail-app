import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private oAuthService: OAuthService) {}

  canActivate(): boolean {
    if (this.oAuthService.hasValidAccessToken()) {
      return true;
    }
    this.oAuthService.initLoginFlow();
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
