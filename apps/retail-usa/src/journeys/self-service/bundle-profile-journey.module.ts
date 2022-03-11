import { NgModule, Provider } from '@angular/core';
import {
  IdentitySelfServiceJourneyModule,
  IdentitySelfServiceJourneyConfigurationToken,
  IdentitySelfServiceJourneyConfiguration,
} from '@backbase/identity-self-service-journey-ang';
import { DeepPartial } from '@backbase/identity-common-ang';

const ProfileConfigProvider: Provider = {
  provide: IdentitySelfServiceJourneyConfigurationToken,
  useValue: {
    userManageProfile: {
      maxEmailAddresses: 2,
      maxPhoneNumbers: 3,
      maxPostalAddresses: 1,
    },
  } as DeepPartial<IdentitySelfServiceJourneyConfiguration>,
};
@NgModule({
  imports: [IdentitySelfServiceJourneyModule.forRoot()],
  providers: [ProfileConfigProvider],
})
export class SelfServiceJourneyBundleModule {}
