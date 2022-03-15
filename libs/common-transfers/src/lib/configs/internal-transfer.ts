import { Validators, ValidatorFn } from '@angular/forms';
import {
  PaymentTypeConfig,
  defaultInitiatorConfig,
  defaultCounterPartyConfig,
  defaultRemittanceInfoConfig,
  ProductKinds,
  internalTransferOnDestroyHook,
  PaymentFormGroup,
  PaymentBaseFields,
  PaymentComponents,
  ScheduleFields,
  Frequencies,
  scheduleFrequencyToggleDependants,
  pastDateValidator,
  scheduleStartDateOnInitHook,
  scheduleStartDateOnDestroyHook,
  ScheduleEndType,
  scheduleEndTypeToggleDependants,
  endDateAfterStartDateValidator,
  scheduleEndDateOnInitHook,
  minValueTwoValidator,
  maxValueTwoHundredValidator,
} from '@backbase/payment-orders-ang';
import { PayordDateComponent } from '../components/payord-date.component';

export const customScheduleConfig: PaymentFormGroup = {
  name: PaymentBaseFields.schedule,
  fields: [
    {
      name: PaymentComponents.scheduleHeader,
      type: PaymentComponents.scheduleHeader,
      options: {
        label: $localize`:@@default-config.schedule-header:Delivery`,
      },
    },
    {
      name: ScheduleFields.frequency,
      type: PaymentComponents.select,
      options: {
        label: $localize`:@@default-config.frequency-label:Frequency`,
        validators: [Validators.required],
        options: [
          {
            label: $localize`:@@default-config.once-frequency-label:Once`,
            value: Frequencies.ONCE,
          },
          {
            label: $localize`:@@default-config.daily-frequency-label:Daily`,
            value: Frequencies.DAILY,
          },
          {
            label: $localize`:@@default-config.weekly-frequency-label:Weekly`,
            value: Frequencies.WEEKLY,
          },
          {
            label: $localize`:@@default-config.biweekly-frequency-label:Biweekly`,
            value: Frequencies.BIWEEKLY,
          },
          {
            label: $localize`:@@default-config.monthly-frequency-label:Monthly`,
            value: Frequencies.MONTHLY,
          },
          {
            label: $localize`:@@default-config.quarterly-frequency-label:Quarterly`,
            value: Frequencies.QUARTERLY,
          },
          {
            label: $localize`:@@default-config.annually-frequency-label:Annually`,
            value: Frequencies.YEARLY,
          },
        ],
        defaultValue: Frequencies.ONCE,
        cssClasses: ['d-inline-block', 'col-md-6', 'align-top'],
        dependants: [ScheduleFields.endType],
        activateDependantsOn: scheduleFrequencyToggleDependants,
      },
    },
    {
      type: 'customDate',
      name: ScheduleFields.startDate,
      options: {
        label: $localize`:@@default-config.start-date-label:Start on`,
        cssClasses: ['d-inline-block', 'col-md-6', 'align-top'],
        validators: [Validators.required, pastDateValidator],
        defaultValue: new Date().toISOString(),
        validationMessages: [
          {
            name: 'pastDate',
            message: $localize`:@@default-config.past-date-error-message:Start date cannot be in the past`,
          },
        ],
      },
      hooks: {
        onInit: scheduleStartDateOnInitHook,
        onDestroy: scheduleStartDateOnDestroyHook,
      },
    },
    {
      name: ScheduleFields.endType,
      type: PaymentComponents.radio,
      options: {
        label: $localize`:@@default-config.end-type-label:End`,
        preselect: true,
        isConditionalMandatory: true,
        cssClasses: ['d-inline-block', 'col-md-2', 'align-top', 'bb-schedule__end-type'],
        defaultValue: ScheduleEndType.NEVER,
        options: [
          {
            label: $localize`:@@default-config.never-end-type-label:Never`,
            value: ScheduleEndType.NEVER,
          },
          {
            label: $localize`:@@default-config.on-date-end-type-label:On date`,
            value: ScheduleEndType.ON,
          },
          {
            label: $localize`:@@default-config.after-end-type-label:After`,
            value: ScheduleEndType.AFTER,
          },
        ],
        dependants: [ScheduleFields.endDate, ScheduleFields.repeat],
        activateDependantsOn: scheduleEndTypeToggleDependants,
      },
    },
    {
      type: PaymentComponents.date,
      name: ScheduleFields.endDate,
      options: {
        cssClasses: ['d-inline-block', 'col-md-10', 'align-top', 'bb-schedule__end-date'],
        validators: [endDateAfterStartDateValidator as ValidatorFn],
        validationMessages: [
          {
            name: 'required',
            message: $localize`:@@default-config.end-date-required-message:End date is required`,
          },
          {
            name: 'lessThanStartDate',
            message: $localize`:@@default-config.end-date-less-start-date-message:End date cannot be before start date`,
          },
        ],
        isConditionalMandatory: true,
      },
      hooks: {
        onInit: scheduleEndDateOnInitHook,
      },
    },
    {
      name: ScheduleFields.repeat,
      type: PaymentComponents.number,
      options: {
        isConditionalMandatory: true,
        description: $localize`:@@default-config.repeat-schedule-description:times`,
        min: 2,
        max: 200,
        defaultValue: 2,
        validators: [minValueTwoValidator, maxValueTwoHundredValidator],
        validationMessages: [
          {
            name: 'required',
            message: $localize`:@@default-config.repeat-schedule-required-message:Value is required`,
          },
          {
            name: 'min',
            message: $localize`:@@default-config.repeat-schedule-min--ocurrences-message:Value is below the minimum allowed occurrences (2)`,
          },
          {
            name: 'max',
            message: $localize`:@@default-config.repeat-schedule-max--ocurrences-message:Value exceeds maximum allowed occurances (200)`,
          },
        ],
        cssClasses: ['d-inline-block', 'col-md-9', 'align-top', 'px-0', 'bb-schedule__repeat'],
      },
    },
  ],
};

export const INTERNAL_TRANSFER: PaymentTypeConfig = {
  fields: [defaultInitiatorConfig, defaultCounterPartyConfig, defaultRemittanceInfoConfig, customScheduleConfig],
  name: $localize`:@@internal-config.name:Internal Transfer`,
  paymentType: 'INTERNAL_TRANSFER',
  businessFunction: 'A2A Transfer',
  options: {
    paymentTypes: {
      internal: 'INTERNAL_TRANSFER',
      external: 'EXTERNAL_A2A',
    },
    disabledCombinations: [
      { from: ProductKinds.loanAccount, to: ProductKinds.loanAccount },
      { from: ProductKinds.creditCard, to: ProductKinds.creditCard },
    ],
  },
  hooks: {
    onDestroy: internalTransferOnDestroyHook,
  },
  customFields: {
    customDate: PayordDateComponent,
  },
};
