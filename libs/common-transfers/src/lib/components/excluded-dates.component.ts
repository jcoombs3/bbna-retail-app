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

  validationLabel = 'Start on';
  validationMessages = [
    { name: 'excludedDate', message: 'Cannot transfer on this day' },
    {
      name: 'pastDate',
      message: 'Start date cannot be in the past',
    },
    {
      name: 'futureDate',
      message: 'Start date cannot be this far in the future',
    },
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

    this.control.setValidators([
      Validators.required,
      this.excludedDateService.excludedDateValidator(),
      this.excludedDateService.futureDateValidator(),
      this.excludedDateService.pastDateValidator(),
    ]);
    this.control.updateValueAndValidity();
    this.validationControl = this.group.controls[this.config?.name] as FormControl;
    triggerHook(PaymentFormFieldHooks.onInit, this);
  }

  markDisabled(ngb: NgbDate) {
    const { year, month, day } = ngb;
    const date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    return this.excludedDateService.isDateValid(date);
  }

  get minDate(): NgbDateStruct {
    if(!this.excludedDateService.startDate) return undefined;
    const today = new Date(this.excludedDateService.startDate);
    return { year: today.getUTCFullYear(), month: today.getUTCMonth() + 1, day: today.getUTCDate() };
  }

  get maxDate(): NgbDateStruct {
    if(!this.excludedDateService.endDate) return undefined;
    const today = new Date(this.excludedDateService.endDate);
    return { year: today.getUTCFullYear(), month: today.getUTCMonth() + 1, day: today.getUTCDate() };
  }

  ngOnDestroy() {
    triggerHook(PaymentFormFieldHooks.onDestroy, this);
  }
}
