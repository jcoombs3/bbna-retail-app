import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InitiatePaymentJourneyWrapperComponent } from './initiate-payment-journey.component';
import { PERMISSIONS } from '../../../app/auth/permissions';

@NgModule({
  declarations: [InitiatePaymentJourneyWrapperComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InitiatePaymentJourneyWrapperComponent,
        children: [
          {
            path: 'make-a-transfer',
            loadChildren: () =>
              import('../internal-transfer-bundle.module').then((m) => m.InternalTransferJourneyBundleModule),
          },
        ],
        data: {
          modalTitle: $localize`:@@routable-modal.modal-title.payments-internal-transfer:Make a Transfer`,
          entitlements: PERMISSIONS.canCreateA2A,
        },
      },
      {
        path: '',
        component: InitiatePaymentJourneyWrapperComponent,
        children: [
          {
            path: 'money-to-member',
            loadChildren: () =>
              import('../intrabank-transfer-bundle.module').then((m) => m.IntrabankTransferJourneyBundleModule),
          },
        ],
        data: {
          modalTitle: $localize`:@@routable-modal.modal-title.payments-intrabank-transfer:Send Money to Member`,
          entitlements: PERMISSIONS.canCreateA2A,
        },
      },
      {
        path: '',
        component: InitiatePaymentJourneyWrapperComponent,
        children: [
          {
            path: 'money-to-someone',
            loadChildren: () => import('../p2p-transfer-bundle.module').then((m) => m.P2PTransferJourneyBundleModule),
          },
        ],
        data: {
          modalTitle: $localize`:@@routable-modal.modal-title.payments-intrabank-transfer:Send Money to Someone`,
          entitlements: PERMISSIONS.canCreateA2A,
        },
      },
    ]),
  ],
})
export class InitiatePaymentWrapperBundleModule {}
