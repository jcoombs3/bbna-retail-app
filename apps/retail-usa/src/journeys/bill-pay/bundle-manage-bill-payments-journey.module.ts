import { NgModule } from '@angular/core';
import {
  ManageBillPaymentsJourneyModule,
  ManageBillPaymentsJourneyConfiguration,
  ManageBillPaymentsJourneyConfigurationToken,
  ManageBillPaymentsCommunicationService,
} from '@backbase/manage-bill-payments-journey-ang';
import { BillpayCommunication } from '../../communication/billpay-communication.service';

@NgModule({
  imports: [ManageBillPaymentsJourneyModule.forRoot()],
  providers: [
    {
      provide: ManageBillPaymentsJourneyConfigurationToken,
      useValue: <ManageBillPaymentsJourneyConfiguration>{
        pageTitle: 'Pending Payments',
      },
    },
    {
      provide: ManageBillPaymentsCommunicationService,
      useExisting: BillpayCommunication,
    },
  ],
})
export class ManageBillPaymentsJourneyBundleModule {}
