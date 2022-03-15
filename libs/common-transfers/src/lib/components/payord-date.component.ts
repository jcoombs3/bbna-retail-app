import { Component } from '@angular/core';
import { ӨPayordDateComponent } from '@backbase/payord-form-builder-ang';
import { ExcludedDatesService } from '../services/restricted-dates.service';

@Component({
  selector: 'bb-custom-payord-date',
  templateUrl: './payord-date.component.html',
  providers: [ExcludedDatesService],
})
export class PayordDateComponent extends ӨPayordDateComponent {
  dates = this.service.excludedDates;

  constructor(public service: ExcludedDatesService) {
    super();
  }
}
