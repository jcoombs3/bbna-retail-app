import { NgModule, Provider } from '@angular/core';
import {
  ActionsRetailNotificationPreferencesJourneyModule,
  ActionsRetailNotificationPreferencesJourneyConfiguration,
  ActionsRetailNotificationPreferencesJourneyToken,
  ActionsRetailNotificationPreferencesJourneyConfigService,
} from '@backbase/actions-retail-notification-preferences-journey-ang';

const RetailActionsConfigProvider: Provider = {
  provide: ActionsRetailNotificationPreferencesJourneyToken,
  useValue: {
    notificationDismissTime: 5,
    specificationIDs: '1, 4',
  } as ActionsRetailNotificationPreferencesJourneyConfiguration,
};

@NgModule({
  imports: [ActionsRetailNotificationPreferencesJourneyModule.forRoot()],
  providers: [ActionsRetailNotificationPreferencesJourneyConfigService, RetailActionsConfigProvider],
})
export class ActionsRetailNotificationPreferencesJourneyBundleModule {}
