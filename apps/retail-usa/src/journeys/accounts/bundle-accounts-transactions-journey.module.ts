import { NgModule, Provider } from '@angular/core';
import {
  AccountsTransactionsJourneyModule,
  AccountsTransactionsJourneyConfigurationToken,
  AccountsTransactionsJourneyConfiguration,
  AccountsPaymentsCommunication,
} from '@backbase/accounts-transactions-journey-ang';
import { AccountsInitiatePaymentCommunication } from '../../communication/accounts-initiate-payment-communication.service';

const AccountsTransactionsConfigProvider: Provider = {
  provide: AccountsTransactionsJourneyConfigurationToken,
  useValue: {
    showCheckImages: true,
    disputeTopicId: '',
    inquireTopicId: '',
  } as Partial<AccountsTransactionsJourneyConfiguration>,
};

@NgModule({
  imports: [AccountsTransactionsJourneyModule.forRoot()],
  providers: [
    AccountsTransactionsConfigProvider,
    { provide: AccountsPaymentsCommunication, useExisting: AccountsInitiatePaymentCommunication },
  ],
})
export class AccountsTransactionsJourneyBundleModule {}
