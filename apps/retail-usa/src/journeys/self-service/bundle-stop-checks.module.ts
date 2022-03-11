import { NgModule } from '@angular/core';
import {
  StopChecksJourneyConfiguration,
  StopChecksJourneyConfigurationToken,
  StopChecksJourneyModule,
} from '@backbase/stop-checks-journey-ang';

@NgModule({
  imports: [StopChecksJourneyModule.forRoot()],
  providers: [
    {
      provide: StopChecksJourneyConfigurationToken,
      useValue: { shouldDisplayHeading: false } as StopChecksJourneyConfiguration,
    },
  ],
})
export class StopChecksJourneyBundleModule {}
