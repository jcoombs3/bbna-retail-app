import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RestrictedDatesHttpService, RestrictedDates } from '../../../../transfers-dates-http-ang/src';

@Injectable()
export class ExcludedDatesService {
  excludedDates = [];
  startDate = new Date().toString();
  endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();

  constructor(private restrictedDatesHttpService: RestrictedDatesHttpService) {
    this.restrictedDatesHttpService.restrictedDatesGet().subscribe((dates: RestrictedDates) => {
      this.startDate = dates.startDate;
      this.endDate = dates.endDate;
      this.excludedDates = dates.restrictedDates;
    });
  }

  isDateValid(date: string) {
    return this.excludedDates.includes(date);
  }

  excludedDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      let month = selectedDate.getUTCMonth() + 1;
      let day = selectedDate.getUTCDate();
      let year = selectedDate.getUTCFullYear();
      return this.isDateValid(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`)
        ? { excludedDate: { value: control.value } }
        : null;
    };
  }

  pastDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);
      const startDate = this.convertDateToUTC(new Date(this.startDate)).setHours(0, 0, 0, 0);
      return selectedDate < startDate ? { pastDate: { value: control.value } } : null;
    };
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);
      const endDate = this.convertDateToUTC(new Date(this.endDate)).setHours(0, 0, 0, 0);
      return endDate < selectedDate ? { futureDate: { value: control.value } } : null;
    };
  }

  private convertDateToUTC(date: Date) {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
  }
}
