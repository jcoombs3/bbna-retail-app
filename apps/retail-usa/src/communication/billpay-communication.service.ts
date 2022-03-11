import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayBillsCommunicationService } from '@backbase/pay-bills-journey-ang';
import { ManagePayeesCommunicationService } from '@backbase/manage-payees-journey-ang';
import { ManageBillPaymentsCommunicationService } from '@backbase/manage-bill-payments-journey-ang';

@Injectable({
  providedIn: 'root',
})
export class BillpayCommunication
  implements ManagePayeesCommunicationService, PayBillsCommunicationService, ManageBillPaymentsCommunicationService
{
  constructor(private router: Router, private readonly route: ActivatedRoute) {}

  navigateToRecurringPayment(id: string): void {
    this.router.navigate(['billpay/pay-bills'], { relativeTo: this.route.firstChild });
  }
  navigateToOneOffPayment(id: string): void {
    this.router.navigate(['billpay/pay-bills'], { relativeTo: this.route.firstChild });
  }

  navigateToEditRecurringPayment(id: string) {
    this.router.navigate(['billpay/pay-bills/recurring/edit/' + id], { relativeTo: this.route.firstChild });
  }

  navigateToEditOneOffPayment(id: string) {
    console.log(this.route);
    this.router.navigate(['billpay/pay-bills/one-off/edit/' + id], { relativeTo: this.route.firstChild });
  }

  navigateToPaymentsList() {
    this.router.navigate(['billpay/pending-bills'], { relativeTo: this.route.firstChild });
  }

  navigateToPaymentsHistory() {
    this.router.navigate(['billpay/history-bills'], { relativeTo: this.route.firstChild });
  }

  navigateToPayeesList() {
    this.router.navigate(['billpay/pay-bills'], { relativeTo: this.route.firstChild });
  }
  navigateToAddPayee() {
    this.router.navigate(['billpay/manage-payees/payees'], { relativeTo: this.route.firstChild });
  }
  navigateToPayeeSummary(payeeID: string) {
    this.router.navigate(['billpay/manage-payees/payee-summary', { payeeID }], { relativeTo: this.route.firstChild });
  }
  navigateToEditElectronicPayee(payeeID: string) {
    this.router.navigate(['billpay/manage-payees/payees/electronic/edit/' + payeeID], {
      relativeTo: this.route.firstChild,
    });
  }
  navigateToEditManualPayee(payeeID: string) {
    this.router.navigate(['billpay/manage-payees/payees/manual/edit/' + payeeID], {
      relativeTo: this.route.firstChild,
    });
  }
  navigateToPayverisEbillEnrol(payeeID: string) {
    this.router.navigate(['billpay/manage-payees/ebills', { payeeID }], { relativeTo: this.route.firstChild });
  }
  navigateToMultiplePaymentsForm() {
    this.router.navigate(['billpay/pay-bills'], { relativeTo: this.route.firstChild });
  }
  navigateToMainAppPage() {
    this.router.navigate(['accounts']);
  }
}
