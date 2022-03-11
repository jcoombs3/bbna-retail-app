import { Injectable } from '@angular/core';
import { AccountsPaymentsCommunication } from '@backbase/accounts-transactions-journey-ang';
import {
  InitiatePaymentJourneyCommunicationService,
  InitiatePaymentJourneyComponentApi,
  TriggerInitiatePaymentPayload,
  PaymentMode,
  INTERNAL_TRANSFER,
} from '@backbase/initiate-payment-journey-ang';
import { RoutableModalService } from '../app/retail/routable-modal/routable-modal.service';

const cashAdvanceModalName = 'quick-action-cash-advance';
const repayModalName = 'quick-action-repay';

@Injectable({
  providedIn: 'root',
})
export class AccountsInitiatePaymentCommunication
  implements AccountsPaymentsCommunication, InitiatePaymentJourneyCommunicationService
{
  private initiatePaymentApi: InitiatePaymentJourneyComponentApi | undefined;
  private paymentPayload: TriggerInitiatePaymentPayload | undefined;

  constructor(private readonly routableModal: RoutableModalService) {}

  init(initiatePaymentApi: InitiatePaymentJourneyComponentApi) {
    this.initiatePaymentApi = initiatePaymentApi;
    this.setPaymentConfiguration();
  }

  reset() {
    this.paymentPayload = undefined;
  }

  closeEvent(): void {
    this.routableModal.closeModal();
  }

  headerNavigationAction(value: any): void {
    this.routableModal.openModal(value);
  }

  repayEvent(arrangementId: string) {
    this.paymentPayload = this.getPaymentPayload({ counterparty: arrangementId });
    this.setPaymentConfiguration();
    this.routableModal.openModal(repayModalName);
  }

  cashAdvanceEvent(arrangementId: string) {
    this.paymentPayload = this.getPaymentPayload({ originator: arrangementId });
    this.setPaymentConfiguration();
    this.routableModal.openModal(cashAdvanceModalName);
  }

  private setPaymentConfiguration() {
    if (this.initiatePaymentApi && this.paymentPayload) {
      this.initiatePaymentApi.setupData(this.paymentPayload);
    }
  }

  private getPaymentPayload(id: { originator?: string; counterparty?: string }): TriggerInitiatePaymentPayload {
    return {
      payment: {
        version: undefined,
        id: undefined,
        status: undefined,
        paymentType: INTERNAL_TRANSFER.paymentType,
        requestedExecutionDate: new Date().toISOString(),
        originatorAccount: { arrangementId: id.originator, identification: undefined },
        transferTransactionInformation: {
          counterpartyAccount: { arrangementId: id.counterparty, identification: undefined },
          instructedAmount: { amount: '', currencyCode: '' },
          counterparty: undefined,
        },
      },
      options: {
        paymentMode: PaymentMode.CREATE_PAYMENT,
      },
    };
  }
}
