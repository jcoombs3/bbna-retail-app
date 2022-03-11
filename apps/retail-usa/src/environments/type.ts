import { Provider } from '@angular/core';

export interface Environment {
  production: boolean;
  animation: boolean;
  mockProviders: Provider[];
  landingPageUrl: string;
  baseHref: string;
  apiRoot: string;
  localize?: boolean;
  googleApiKey: string;
}
