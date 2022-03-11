import { Component } from '@angular/core';
import { QuickActionLink } from '../quick-actions.component';

@Component({
  selector: 'bb-accounts-transactions-journey-wrapper',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <router-outlet></router-outlet>
        </div>
        <div class="col-md-4 pt-5">
          <div class="card bb-block--xl">
            <bb-quick-transfer-journey></bb-quick-transfer-journey>
          </div>
          <div class="card">
            <bb-quick-actions [links]="quickActionLinks"></bb-quick-actions>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccountsTransactionsJourneyWrapperComponent {
  quickActionLinks: QuickActionLink[] = [
    {
      menuIcon: 'settings',
      title: $localize`:Link Title|Manage accounts@@accounts.quick-actions.span.manageAccounts:Manage Accounts`,
      url: '/my-accounts/manage',
    },
    {
      menuIcon: 'flight',
      title: $localize`:Link Title|Set travel notice@@accounts.quick-actions.span.setTravelNotice:Set Travel Notice`,
      url: '/self-service/manage-cards/travel-notice',
    },
    {
      menuIcon: 'receipt',
      title: $localize`:Link Title|Pay a bill@@accounts.quick-actions.span.payABill:Pay a Bill`,
      url: '/billpay/pay-bills',
    },
    {
      menuIcon: 'description',
      title: $localize`:Link Title|Download statements@@accounts.quick-actions.span.downloadStatements:Download Statements`,
      url: '/self-service/download-statements',
    },
    {
      menuIcon: 'notifications-active',
      title: $localize`:Link Title|Manage notifications@@accounts.quick-actions.span.manageNotifications:Manage Notifications`,
      url: '/self-service/product-list/manage-notifications',
    },
    {
      menuIcon: 'room',
      title: $localize`:Link Title|Find branches and ATMS@@accounts.quick-actions.span.findBranchedAndATMS:Find Branches and ATMS`,
      url: '/more/find-us',
    },
  ];
}
