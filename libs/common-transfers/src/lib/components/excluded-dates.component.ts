import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import {
  PaymentFormFieldConfig,
  PaymentFormField,
  PaymentFormFieldOptions,
  Hideable,
  PaymentFormFieldHooks,
} from '@backbase/payment-orders-ang';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { registerFormControl } from '../helpers/form-helpers';
import { triggerHook } from '../helpers/hook-helpers';
import { ExcludedDatesService } from '../services/excluded-dates.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'bb-excluded-dates',
  templateUrl: './excluded-dates.component.html',
})
export class ExcludedDatesComponent implements PaymentFormField, OnInit, OnDestroy {
  options!: PaymentFormFieldOptions;
  config!: PaymentFormFieldConfig & Hideable;
  group!: FormGroup;
  control!: AbstractControl;
  validationControl!: FormControl;

  validationLabel = 'Execution date';
  validationMessages = [
    { name: 'excludedDate', message: 'Cannot transfer on this day' }
  ];
  classes = ['d-inline-block', 'col-md-6', 'align-top'];

  constructor(private excludedDateService: ExcludedDatesService) {}

  ngOnInit() {
    this.control = registerFormControl(
      this.group,
      this.config.name,
      this.options.validators,
      this.options.asyncValidators,
      this.options.defaultValue,
      this.config,
    ) as FormControl;

    this.classes = this.options.cssClasses.length ? this.options.cssClasses : this.classes;
    this.validationLabel = this.options.validationMessageLabel || this.validationLabel;
    this.validationMessages = [ ...this.validationMessages, ...this.options.validationMessages ];

    this.control.setValidators([
      Validators.required
    ]);
    this.control.setAsyncValidators([
      this.excludedDateService.excludedDateValidator()
    ])
    this.control.updateValueAndValidity();
    this.validationControl = this.group.controls[this.config?.name] as FormControl;
    triggerHook(PaymentFormFieldHooks.onInit, this);
  }

  markDisabled$ = this.excludedDateService.isDateValid$.pipe(
    map((isDateValidFn) => {
      return (ngb: NgbDate) => {
        const { year, month, day } = ngb;
        const date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        return isDateValidFn(date);
      }
    })
  )

  minDate$: Observable<NgbDateStruct> = this.excludedDateService.startDate$.pipe(
    map((startDate) => {
      const today = new Date(startDate);
      return { year: today.getUTCFullYear(), month: today.getUTCMonth() + 1, day: today.getUTCDate() };
    })
  )

  maxDate$: Observable<NgbDateStruct> = this.excludedDateService.endDate$.pipe(
    map((endDate) => {
      const today = new Date(endDate);
      return { year: today.getUTCFullYear(), month: today.getUTCMonth() + 1, day: today.getUTCDate() };
    })
  )

  ngOnDestroy() {
    triggerHook(PaymentFormFieldHooks.onDestroy, this);
  }
}
