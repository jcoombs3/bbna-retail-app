import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { RestrictedDatesHttpService, RestrictedDates } from '../../../../transfers-dates-http-ang/src';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ExcludedDatesService {
  restrictedDates$: Observable<RestrictedDates> = this.restrictedDatesHttpService.restrictedDatesGet().pipe(
    shareReplay()
  );

  startDate$ = this.restrictedDates$.pipe(map((dates: RestrictedDates) => dates.startDate));
  endDate$ = this.restrictedDates$.pipe(map((dates: RestrictedDates) => dates.endDate));
  isDateExcluded$: Observable<(date: string) => boolean> = this.restrictedDates$.pipe(
    map((dates) => {
      return (date: string) => dates.restrictedDates.includes(date);
    })
  )

  constructor(private restrictedDatesHttpService: RestrictedDatesHttpService) { }

  excludedDateValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> | null => {
      const selectedDate = new Date(control.value);
      let month = selectedDate.getUTCMonth() + 1;
      let day = selectedDate.getUTCDate();
      let year = selectedDate.getUTCFullYear();
      return this.isDateExcluded$.pipe(
       map((validFn: (date: string) => boolean) => {
        const errors = validFn(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`)
        ? { excludedDate: { value: control.value } } : null;      
        return errors;
       }))
    };
  }
}
