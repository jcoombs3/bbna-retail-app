import { Component, OnInit, ChangeDetectorRef, Input, NgZone } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SessionTimeoutService } from './session-timeout.service';
import { Countdown, SessionTimeoutTimeFormat } from './session-timeout.interface';
import { SessionTimeoutComponent as CoreSessionTimeoutComponent } from '@backbase/foundation-ang/core';

/**
 * SessionTimeoutComponent performs basic session logout and management.
 */
@Component({
  selector: 'bb-session-timeout-modal',
  templateUrl: './session-timeout.component.html',
  providers: [SessionTimeoutService],
})
export class SessionTimeoutComponent implements CoreSessionTimeoutComponent, OnInit {
  /**
   * The time before session expiry that the modal should appear.
   * Defaults to `300` (seconds)
   */
  @Input() inactivityModalTime = 300;

  /**
   * The options for the modal
   */
  readonly modalOptions: NgbModalOptions = {
    keyboard: false,
    backdrop: 'static',
    windowClass: 'session-timeout__modal',
    backdropClass: 'session-timeout__modal',
  };

  /**
   * Determines whether the modal is open.
   */
  isOpen = false;
  /**
   * The `SessionTimeoutTimeFormat` time format for the current remaining session time.
   */
  timeFormat: SessionTimeoutTimeFormat | undefined;
  /**
   * The `SessionTimeoutTimeFormat` options list.
   */
  formats = SessionTimeoutTimeFormat;
  /**
   * The amount of minutes remaining in the session.
   */
  minutesRemaining: number | undefined;
  /**
   * The amount of seconds remaining in the session.
   */
  secondsRemaining: number | undefined;

  /**
   * SessionTimeoutComponent constructor
   * @param sessionTimeoutService Factory that allows calls to web sdk endpoints for controlling session
   * @param cd Change Detector Ref factory
   * @param ngZone Service for executing work inside or outside of the Angular zone
   */
  constructor(
    private readonly sessionTimeoutService: SessionTimeoutService,
    private readonly cd: ChangeDetectorRef,
    private readonly ngZone: NgZone,
  ) {}

  /**
   * @internal (undocumented)
   */
  ngOnInit(): void {
    this.isOpen = false;
    const countdown: Countdown = {
      duration: this.inactivityModalTime,
      start: this.onStart,
      end: this.onEnd,
      reset: this.onReset,
      tick: this.onTick,
    };
    this.sessionTimeoutService.registerCountdown(countdown);
  }

  /**
   * Calls the Session Timeout Service to log the user out.
   * Once Logged out sends the user to the login page.
   * @returns a promise from the session timeout service
   */
  logout() {
    return this.sessionTimeoutService.logout().then(() => this.goToLoginPage());
  }

  /**
   * Calls the session Timeout Service to refresh the user's session.
   * @returns a promise from the session timeout service
   */
  continueSession() {
    return this.sessionTimeoutService.refresh();
  }

  private readonly onStart = () => {
    this.ngZone.run(() => {
      this.isOpen = true;
      this.cd.markForCheck();
    });
  };

  private readonly onEnd = () => {
    this.closeModal();
    return this.logout();
  };

  private readonly onReset = () => {
    this.closeModal();
  };

  private readonly onTick = (ttl: number) => {
    this.ngZone.run(() => {
      if (ttl < 60) {
        this.timeFormat = SessionTimeoutTimeFormat.Seconds;
        this.minutesRemaining = 0;
        this.secondsRemaining = ttl;
      } else if (ttl % 60 === 0) {
        this.timeFormat = SessionTimeoutTimeFormat.Minutes;
        this.minutesRemaining = ttl / 60;
        this.secondsRemaining = 0;
      } else {
        this.timeFormat = SessionTimeoutTimeFormat.Full;
        this.minutesRemaining = Math.floor(ttl / 60);
        this.secondsRemaining = ttl - this.minutesRemaining * 60;
      }
      this.cd.markForCheck();
    });
  };

  private goToLoginPage() {
    this.sessionTimeoutService.goToLoginPage();
  }

  private closeModal() {
    this.ngZone.run(() => {
      this.timeFormat = undefined;
      this.minutesRemaining = undefined;
      this.secondsRemaining = undefined;
      this.isOpen = false;
      this.cd.markForCheck();
    });
  }
}
