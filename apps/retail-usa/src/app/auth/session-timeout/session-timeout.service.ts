import { Injectable, NgZone } from '@angular/core';
import { Countdown } from '@backbase/foundation-ang/web-sdk';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
/**
 * SessionTimeoutService used to call logout and session services for session management.
 */
export class SessionTimeoutService {
  /**
   * SessionTimeoutService constructor
   * @param logoutService Auth factory used to manage logout.
   * @param sessionService Auth factory used to manage session.
   * @param ngZone Service for executing work inside or outside of the Angular zone.
   */
  constructor(private readonly ngZone: NgZone, private oAuthService: OAuthService) {}

  /**
   * Calls the auth logout service to log the user out.
   * @returns a promise from the logout service.
   */
  logout() {
    return this.oAuthService.revokeTokenAndLogout();
  }

  /**
   * Calls the auth session service to register a countdown object for managing session.
   * @param countdown a `Countdown` object that allows a controller to register functions to auth session actions.
   */
  registerCountdown(countdown: Countdown) {
    this.ngZone.runOutsideAngular(() => {
      // TODO: implement method
    });
  }

  /**
   * Calls the auth session service to refresh the user's session.
   * @returns a promise from the session service.
   */
  refresh() {
    return this.ngZone.runOutsideAngular(() => {
      // TODO: implement method
    });
  }

  /**
   * Calls the auth logout service to send the user to the login page.
   */
  goToLoginPage() {
    this.oAuthService.initLoginFlow();
  }
}
