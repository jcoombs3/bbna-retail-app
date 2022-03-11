import { NgModule } from '@angular/core';
import { ConsentJourneyModule } from '@backbase/consent-journey-ang';

@NgModule({
  imports: [ConsentJourneyModule.forRoot()],
})
export class ConsentJourneyBundleModule {}
