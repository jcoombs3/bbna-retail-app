import { NgModule } from '@angular/core';
import {
  ManageUpcomingAndHistoricalPaymentsCommunicationService,
  ManageUpcomingAndHistoricalPaymentsJourneyModule,
} from '@backbase/manage-upcoming-and-historical-payments-journey-ang';
import { PaymentsCommunicationService } from '../../communication/payments-communication.service';

@NgModule({
  imports: [ManageUpcomingAndHistoricalPaymentsJourneyModule.forRoot()],
  providers: [
    {
      provide: ManageUpcomingAndHistoricalPaymentsCommunicationService,
      useExisting: PaymentsCommunicationService,
    },
  ],
})
export class ManageUpcomingAndHistoricalPaymentsJourneyBundleModule {}
