import { NgModule } from '@angular/core';
import { BillpayCommunication } from '../../communication/billpay-communication.service';
import {
  PayBillsJourneyModule,
  PayBillsCommunicationService,
  PayBillsJourneyConfigurationToken,
} from '@backbase/pay-bills-journey-ang';
@NgModule({
  imports: [PayBillsJourneyModule.forRoot()],
  providers: [
    {
      provide: PayBillsJourneyConfigurationToken,
      useValue: {
        notificationDismissTime: 5000,
        paymentDetailsTitle: 'Payment Details',
        paymentDefaultCurrency: 'USD',
        multipleBillsMode: true,
        deliveryDateMessage: 'Delivered in 5 working days',
      },
    },
    {
      provide: PayBillsCommunicationService,
      useExisting: BillpayCommunication,
    },
  ],
})
export class PayBillsJourneyBundleModule {}
