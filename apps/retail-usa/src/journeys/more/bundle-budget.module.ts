import { NgModule, Provider } from '@angular/core';
import {
  BudgetJourneyModule,
  BudgetJourneyConfigurationToken,
  BudgetJourneyConfiguration,
} from '@backbase/budget-journey-ang';

const BudgetConfigProvider: Provider = {
  provide: BudgetJourneyConfigurationToken,
  useValue: {
    showPercentage: false,
    budgetSafeZoneLimit: 80,
    notificationDismissTime: 5,
    maxBudgets: undefined,
  } as Partial<BudgetJourneyConfiguration>,
};

@NgModule({
  imports: [BudgetJourneyModule.forRoot()],
  providers: [BudgetConfigProvider],
})
export class BudgetJourneyBundleModule {}
