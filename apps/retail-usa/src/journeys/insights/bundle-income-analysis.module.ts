import { NgModule, Provider } from '@angular/core';
import {
  AnalysisType,
  IncomeSpendingAnalysisJourneyModule,
  IncomeSpendingAnalysisJourneyConfiguration,
  IncomeSpendingAnalysisJourneyConfigurationToken,
} from '@backbase/income-spending-analysis-journey-ang';

const IncomeAnalysisConfigProvider: Provider = {
  provide: IncomeSpendingAnalysisJourneyConfigurationToken,
  useValue: <IncomeSpendingAnalysisJourneyConfiguration>{
    analysisType: AnalysisType.INCOME,
  },
};

@NgModule({
  imports: [IncomeSpendingAnalysisJourneyModule.forRoot()],
  providers: [IncomeAnalysisConfigProvider],
})
export class IncomeAnalysisBundleModule {}
