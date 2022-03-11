import { NgModule, Provider } from '@angular/core';
import {
  ContactManagerJourneyModule,
  ContactManagerJourneyConfig,
  ContactManagerJourneyConfigurationToken,
} from '@backbase/contact-manager-journey-ang';

const ContactManagerConfigProviders: Provider = {
  provide: ContactManagerJourneyConfigurationToken,
  useValue: {
    createContactIBAN: false,
    createContactAccount: true,
    createContactPhone: true,
    createContactEmail: true,
  } as Partial<ContactManagerJourneyConfig>,
};

@NgModule({
  imports: [ContactManagerJourneyModule.forRoot()],
  providers: [ContactManagerConfigProviders],
})
export class ContactManagerJourneyBundleModule {}
