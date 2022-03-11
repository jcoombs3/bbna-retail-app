import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@backbase/ui-ang/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

/**
 * This is just a temporary solution to handle logout in bb-user-context-menu-widget
 *
 * TODO: remove this func once bb-user-context-menu-widget has an update regarding logout feature
 * @param oAuthService
 */
const logoutFactoryService = (oAuthService: OAuthService) => {
  return {
    goToLoginPage: () => oAuthService.initLoginFlow(),
    logout: () => oAuthService.revokeTokenAndLogout(),
  };
};

enum RouteCustomDataProps {
  title = 'title',
  cssClasses = 'cssClasses',
}
interface RouteCustomData {
  [RouteCustomDataProps.cssClasses]: Array<string>;
  [RouteCustomDataProps.title]: string;
}

@Component({
  selector: 'bb-retail-layout',
  templateUrl: './retail-layout.component.html',
})
export class RetailLayoutComponent implements OnInit {
  readonly notificationsAllowedRoutes = 'conversation-view, arrangement-view, transaction-view';

  /**
   * This is just a temporary solution.
   *
   * TODO: enable "spa" redirection.
   *       it needs some improvement within bb-user-context-menu-widget.
   *       Current behaviour:
   *          Context selection modal is not closed automatically when context has been selected successfully
   *          if selectContextRedirectPage="spa:example-page".
   *       Workaround: Reload the page using selectContextRedirectPage="abs:current-page".
   */
  readonly selectContextRedirect = `abs:${location.href.split(location.host)[1]}`;
  routeData$?: Observable<RouteCustomData>;

  constructor(
    public readonly layoutService: LayoutService,
    public readonly activatedRoute: ActivatedRoute,
    public readonly titleService: Title,

    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.routeData$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(this.activatedRoute),
      map(() => this.retrieveRouteData(Object.keys(RouteCustomDataProps))),
      tap(({ title }) => title && this.titleService.setTitle(title)),
    );
  }

  private retrieveRouteData(props: string[]): RouteCustomData {
    const getData = (prop, route): string | undefined => route.snapshot.data[prop];

    return props.reduce((result, prop) => {
      let route = this.activatedRoute;
      while (!getData(prop, route) && route.firstChild) {
        route = route.firstChild;
      }
      return { ...result, [prop]: getData(prop, route) };
    }, {} as RouteCustomData);
  }
}
