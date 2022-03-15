import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { PaymentFormFieldConfig } from '@backbase/payment-orders-ang';

export function registerFormControl(
  group: FormGroup,
  formControlName: string,
  validators?: Array<ValidatorFn>,
  asyncValidators?: Array<AsyncValidatorFn>,
  initialValue: any = '',
  config?: PaymentFormFieldConfig,
): AbstractControl {
  let formControl: AbstractControl;
  formControl = group.controls[formControlName];
  group.addControl(formControlName, new FormControl(initialValue, validators || [], asyncValidators || []));

  if (formControl) {
    resetValidators(formControl, validators, asyncValidators, config);
  } else {
    group.addControl(formControlName, new FormControl(initialValue, validators || [], asyncValidators || []));
    formControl = group.controls[formControlName];
  }

  return formControl;
}

export function resetValidators(
  formControl: AbstractControl,
  validators?: Array<ValidatorFn>,
  asyncValidators?: Array<AsyncValidatorFn>,
  config?: PaymentFormFieldConfig,
) {
  const computedValidators = validators ? [...validators] : [];

  if (!config?.hidden && config?.options?.isConditionalMandatory) {
    computedValidators.push(Validators.required);
  }

  formControl.markAsUntouched();
  formControl.clearValidators();
  formControl.clearAsyncValidators();
  formControl.setAsyncValidators(asyncValidators || []);
  formControl.setValidators(computedValidators);
}
