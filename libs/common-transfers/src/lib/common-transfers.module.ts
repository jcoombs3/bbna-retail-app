import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcludedDatesComponent } from './components/excluded-dates.component';
import { PayordFormBuilderAngModule } from '@backbase/payord-form-builder-ang';
import { ExcludedDatesService } from './services/excluded-dates.service';
import { TransfersRestrictedDatesApiModule, TransfersRestrictedDatesConfiguration } from '@backbase/transfers-dates-http-ang';

@NgModule({
  declarations: [ExcludedDatesComponent],
  imports: [CommonModule, PayordFormBuilderAngModule, TransfersRestrictedDatesApiModule.forRoot(() => new TransfersRestrictedDatesConfiguration())],
  providers: [ExcludedDatesService],
  exports: [ExcludedDatesComponent],
})
export class CommonTransfersModule {}
