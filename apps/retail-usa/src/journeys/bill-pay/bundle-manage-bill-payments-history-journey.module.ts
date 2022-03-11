import { NgModule } from '@angular/core';
import {
  ManageBillPaymentsJourneyModule,
  ManageBillPaymentsJourneyConfigurationToken,
  ManageBillPaymentsJourneyConfiguration,
  PaymentsFilterStatus,
} from '@backbase/manage-bill-payments-journey-ang';

@NgModule({
  imports: [ManageBillPaymentsJourneyModule.forRoot()],
  providers: [
    {
      provide: ManageBillPaymentsJourneyConfigurationToken,
      useValue: <ManageBillPaymentsJourneyConfiguration>{
        pageFilter: PaymentsFilterStatus.HISTORICAL,
        pageTitle: 'History Payments',
      },
    },
  ],
})
export class ManageBillPaymentsHistoryJourneyBundleModule {}
