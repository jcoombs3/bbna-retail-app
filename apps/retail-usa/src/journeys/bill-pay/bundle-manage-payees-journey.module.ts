import { NgModule } from '@angular/core';
import {
  ManagePayeesJourneyModule,
  ManagePayeesCommunicationService,
  ManagePayeesJourneyConfiguration,
  ManagePayeesJourneyConfigurationToken,
} from '@backbase/manage-payees-journey-ang';
import { BillpayCommunication } from '../../communication/billpay-communication.service';

@NgModule({
  imports: [ManagePayeesJourneyModule.forRoot()],
  providers: [
    {
      provide: ManagePayeesJourneyConfigurationToken,
      useValue: <ManagePayeesJourneyConfiguration>{
        notificationDismissTime: 3000,
        multipleBillsMode: true,
      },
    },
    {
      provide: ManagePayeesCommunicationService,
      useExisting: BillpayCommunication,
    },
  ],
})
export class ManagePayeesJourneyBundleModule {}
