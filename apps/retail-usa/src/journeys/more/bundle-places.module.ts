import { NgModule, Provider } from '@angular/core';
import {
  PlacesJourneyModule,
  PlacesJourneyConfiguration,
  PlacesJourneyConfigurationToken,
} from '@backbase/places-journey-ang';
import { environment } from '../../environments/environment';

const PlacesConfigProvider: Array<Provider> = [
  {
    provide: PlacesJourneyConfigurationToken,
    useValue: {
      latitude: 40.72345,
      longitude: -73.9924,
      mapZoom: 12,
      apiKey: environment.googleApiKey,
      placeTypes: {
        branch: {
          iconName: 'account',
          markerUrl: 'branch-marker.svg',
        },
        atm: {
          iconName: 'credit-card',
          markerUrl: 'atm-marker.svg',
        },
      },
    } as Partial<PlacesJourneyConfiguration>,
  },
];

@NgModule({
  imports: [PlacesJourneyModule.forRoot()],
  providers: [PlacesConfigProvider],
})
export class PlacesJourneyBundleModule {}
