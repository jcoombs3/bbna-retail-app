import { Routes } from '@angular/router';

export const RoutableModalParamName = 'openedModal';
export const RoutableModalOutletName = 'routable-modal-content';

export const ROUTABLE_MODAL_ROUTES: Routes = [
  {
    path: '',
    outlet: RoutableModalOutletName,
    children: [
      {
        path: 'quick-action-cash-advance',
        loadChildren: () =>
          import('../../../journeys/quick-actions/quick-actions-cash-advance-bundle.module').then(
            (m) => m.QuickActionsCashAdvanceBundleModule,
          ),
        data: {
          modalTitle: $localize`:@@routable-modal.modal-title.quick-action-cash-advance:Cash advance`,
        },
      },
      {
        path: 'quick-action-repay',
        loadChildren: () =>
          import('../../../journeys/quick-actions/quick-actions-repay-bundle.module').then(
            (m) => m.QuickActionsRepayBundleModule,
          ),
        data: {
          modalTitle: $localize`:@@routable-modal.modal-title.quick-action-repay:Repay credit card`,
        },
      },
    ],
  },
];
