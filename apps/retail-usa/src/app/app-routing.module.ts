/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export an Angular module named
 * `AppRoutingModule`.
 *
 *
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BankingComponent } from './banking/banking.component';
import { UserContextGuard } from './user-context/user-context.guard';
import { EntitlementsGuard } from '@backbase/foundation-ang/entitlements';
import { PERMISSIONS } from './auth/permissions';

//TODO: Find a more elegant solution to decide what landing page to choose
// in the event that the default one is not available due to entitlements

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'my-accounts',
  },
  {
    path: 'select-context',
    loadChildren: () => import('./user-context/user-context.module').then((m) => m.UserContextModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: BankingComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-accounts',
      },
      {
        path: 'my-accounts',
        loadChildren: () =>
          import(
            '../journeys/accounts/accounts-transactions-wrapper/wrapper-accounts-transactions-journey.module'
          ).then((m) => m.AccountsTransactionsJourneyBundleModule),
        data: {
          entitlements: PERMISSIONS.canViewMyAccounts,
          cssClasses: ['container-fluid', 'container'],
          redirectTo: 'transfers/make-a-transfer',
        },
      },
      {
        path: 'transfers',
        data: { cssClasses: ['container--fixed-width mx-auto'] },
        children: [
          {
            path: 'scheduled-transfers',
            loadChildren: () =>
              import('../journeys/transfers/upcoming-and-history-payments.module').then(
                (m) => m.ManageUpcomingAndHistoricalPaymentsJourneyBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewScheduledTransfers,
            },
          },
          {
            path: 'connected-accounts',
            loadChildren: () =>
              import('../journeys/transfers/connect-external-accounts-journey.module').then(
                (m) => m.ConnectExternalAccountsJourneyBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewConnectedAccounts,
            },
          },
          {
            path: '',
            loadChildren: () =>
              import(
                '../journeys/transfers/wrapper-initiate-payment-journey/initiate-payment-wrapper-bundle.module'
              ).then((m) => m.InitiatePaymentWrapperBundleModule),
          },
        ],
      },
      {
        path: 'billpay',
        children: [
          {
            path: 'pay-bills',
            loadChildren: () =>
              import('../journeys/bill-pay/bundle-pay-bills-journey.module').then((m) => m.PayBillsJourneyBundleModule),
            data: {
              entitlements: PERMISSIONS.canViewPayABill,
              cssClasses: ['container-fluid', 'container'],
              redirectTo: 'pending-bills',
            },
          },
          {
            path: 'pending-bills',
            loadChildren: () =>
              import('../journeys/bill-pay/bundle-manage-bill-payments-journey.module').then(
                (m) => m.ManageBillPaymentsJourneyBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewPendingPayments,
              cssClasses: ['container--fixed-width mx-auto'],
              redirectTo: 'history-bills',
            },
          },
          {
            path: 'history-bills',
            loadChildren: () =>
              import('../journeys/bill-pay/bundle-manage-bill-payments-history-journey.module').then(
                (m) => m.ManageBillPaymentsHistoryJourneyBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewHistoryPayments,
              cssClasses: ['container--fixed-width mx-auto'],
              redirectTo: 'manage-payees',
            },
          },
          {
            path: 'manage-payees',
            loadChildren: () =>
              import('../journeys/bill-pay/bundle-manage-payees-journey.module').then(
                (m) => m.ManagePayeesJourneyBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewPendingPayments,
              cssClasses: ['container--fixed-width mx-auto'],
              redirectTo: 'insights',
            },
          },
        ],
      },
      {
        path: 'insights',
        data: { cssClasses: ['container--fixed-width mx-auto'] },
        children: [
          {
            path: 'cashflow',
            loadChildren: () =>
              import('../journeys/insights/bundle-turnovers.module').then((m) => m.TurnoversJourneyBundleModule),
          },
          {
            path: 'income-analysis',
            loadChildren: () =>
              import('../journeys/insights/bundle-income-analysis.module').then((m) => m.IncomeAnalysisBundleModule),
          },
          {
            path: 'spending-analysis',
            loadChildren: () =>
              import('../journeys/insights/bundle-spending-analysis.module').then(
                (m) => m.SpendingAnalysisBundleModule,
              ),
          },
        ],
      },
      {
        path: 'self-service',
        data: { cssClasses: ['container--fixed-width mx-auto'] },
        children: [
          {
            path: 'profile',
            loadChildren: () =>
              import('../journeys/self-service/bundle-profile-journey.module').then(
                (m) => m.SelfServiceJourneyBundleModule,
              ),
          },
          {
            path: 'authorized-users',
            loadChildren: () =>
              import('../journeys/self-service/bundle-authorized-users.module').then(
                (m) => m.AuthorizedUsersJourneyBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewAuthorizedUsers,
            },
          },
          {
            path: 'manage-cards',
            loadChildren: () =>
              import('../journeys/self-service/bundle-cards-management-journey.module').then(
                (m) => m.CardsManagementJourneyBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewManageCards,
            },
          },
          {
            path: 'product-list',
            loadChildren: () =>
              import('../journeys/self-service/bundle-actions-retail-notification-preferences-journey.module').then(
                (m) => m.ActionsRetailNotificationPreferencesJourneyBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewManageNotifications,
            },
          },
          {
            path: 'manage-contacts',
            loadChildren: () =>
              import('../journeys/self-service/bundle-contact-journey.module').then(
                (m) => m.ContactManagerJourneyBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewManageContacts,
            },
          },
          {
            path: 'stop-checks',
            loadChildren: () =>
              import('../journeys/self-service/wrapper-stop-checks-journey/bundle-stop-checks-wrapper.module').then(
                (m) => m.StopChecksJourneyWrapperBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewStopChecks,
            },
          },
          {
            path: 'download-statements',
            loadChildren: () =>
              import('../journeys/self-service/bundle-accounts-statement-retail-journey.module').then(
                (m) => m.AccountStatementRetailJourneyBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewDownloadStatements,
            },
          },
        ],
      },
      {
        path: 'more',
        data: { cssClasses: ['container--fixed-width mx-auto'] },
        children: [
          {
            path: 'budgets',
            loadChildren: () =>
              import('../journeys/more/bundle-budget.module').then((m) => m.BudgetJourneyBundleModule),
            data: {
              entitlements: PERMISSIONS.canViewBudgets,
            },
          },
          {
            path: 'messages',
            loadChildren: () =>
              import('../journeys/more/bundle-messages-client-inbox-journey-bundle.module').then(
                (m) => m.MessagesClientInboxJourneyBundleModule,
              ),
            data: {
              entitlements: PERMISSIONS.canViewMessages,
            },
          },
          {
            path: 'find-us',
            loadChildren: () =>
              import('../journeys/more/bundle-places.module').then((m) => m.PlacesJourneyBundleModule),
            data: {
              entitlements: PERMISSIONS.canViewPlaces,
            },
          },
        ],
      },
    ],
    canActivate: [AuthGuard, UserContextGuard],
    canActivateChild: [EntitlementsGuard],
  },
  {
    path: 'consent',
    loadChildren: () =>
      import('../journeys/consent/bundle-consent-journey.module').then((m) => m.ConsentJourneyBundleModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: 'my-accounts' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
