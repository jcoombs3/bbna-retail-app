import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class ExcludedDatesService {
  excludedDates = ['2022-02-10', '2022-02-11', '2022-02-12', '2022-02-13'];
  startDate = new Date().toISOString();
  endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();

  isDateValid(date: string) {
    return this.excludedDates.includes(date);
  }

  excludedDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      var month = selectedDate.getUTCMonth() + 1;
      var day = selectedDate.getUTCDate();
      var year = selectedDate.getUTCFullYear();
      return this.isDateValid(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`)
        ? { excludedDate: { value: control.value } }
        : null;
    };
  }

  pastDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);
      const startDate = new Date(this.startDate).setHours(0, 0, 0, 0);
      return selectedDate < startDate ? { pastDate: { value: control.value } } : null;
    };
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);
      const endDate = new Date(this.endDate).setHours(0, 0, 0, 0);
      return endDate < selectedDate ? { futureDate: { value: control.value } } : null;
    };
  }
}
