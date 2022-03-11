import { NgModule } from '@angular/core';
import {
  INITIATE_PAYMENT_CONFIG,
  INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
  InitiatePaymentJourneyModule,
  PayordOmniPaymentConfigProvider,
} from '@backbase/initiate-payment-journey-ang';
import { AccountsInitiatePaymentCommunication } from '../../communication/accounts-initiate-payment-communication.service';
import { repayPaymentTypeConfig } from './initiate-payment-repay-type';

@NgModule({
  imports: [InitiatePaymentJourneyModule.forRoot()],
  providers: [
    PayordOmniPaymentConfigProvider,
    {
      provide: INITIATE_PAYMENT_CONFIG,
      useValue: {
        paymentTypes: [repayPaymentTypeConfig],
        businessFunctions: [repayPaymentTypeConfig.businessFunction],
        options: {
          enablePaymentTemplateSelector: false,
          enableSavePaymentAsTemplate: false,
          pageSize: 100,
        },
      },
    },
    {
      provide: INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
      useExisting: AccountsInitiatePaymentCommunication,
    },
  ],
})
export class QuickActionsRepayBundleModule {}
