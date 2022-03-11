import { AbstractControl } from '@angular/forms';
import {
  CounterPartyFields,
  InitiatorFields,
  PaymentBaseFields,
  PaymentComponents,
  PaymentFormGroup,
  PaymentTypeConfig,
  RemittanceInfoFields,
  ScheduleFields,
  Frequencies,
  INTERNAL_TRANSFER,
} from '@backbase/initiate-payment-journey-ang';
import {
  defaultNumbersFormat,
  defaultUseShortCurrencyValue,
  getConfiguration,
  getOptions,
} from './initiate-payment-helpers';

const creditLimitExceededValidator = (control: AbstractControl) => {
  let validationResult = null;
  const selectedValue = parseFloat(control.value.amount);
  if (control.root) {
    const fromControl = control.root.get(PaymentBaseFields.initiator);
    const creditLimit = fromControl?.value?.accountData?.creditLimit;
    if (creditLimit !== undefined && selectedValue > creditLimit) {
      validationResult = { creditLimitExceeded: true };
    }
  }
  return Promise.resolve(validationResult);
};

const getFromAccountForm = (useShortCurrency = defaultUseShortCurrencyValue): PaymentFormGroup => ({
  name: PaymentBaseFields.initiator,
  fields: [
    {
      ...getConfiguration(InitiatorFields.initiatorAccountGroup),
      options: {
        ...getOptions(InitiatorFields.initiatorAccountGroup),
        cssClasses: getOptions(InitiatorFields.initiatorAccountGroup).cssClasses.concat(['bb-heading-3']),
        productKinds: [
          {
            productKind: 'Credit Card',
            balance: {
              apiField: 'bookedBalance',
              label: $localize`:@@cash-advance-modal.account.total-owed:Total owed`,
            },
          },
        ],
        mapItems: (accounts) => accounts,
        showCurrencySymbol: useShortCurrency,
        productNumberFormat: defaultNumbersFormat,
      },
    },
  ],
});

const getToAccountForm = (useShortCurrency = defaultUseShortCurrencyValue): PaymentFormGroup => ({
  name: PaymentBaseFields.counterparty,
  fields: [
    {
      ...getConfiguration(CounterPartyFields.counterPartyAccountGroup),
      options: {
        ...getOptions(CounterPartyFields.counterPartyAccountGroup),
        cssClasses: getOptions(CounterPartyFields.counterPartyAccountGroup).cssClasses.concat(['bb-heading-3']),
        productKinds: [
          { productKind: 'Savings Account', balance: { apiField: 'availableBalance' } },
          { productKind: 'Current Account', balance: { apiField: 'bookedBalance' } },
        ],
        dependants: [],
        preselect: true,
        showCurrencySymbol: useShortCurrency,
        productNumberFormat: defaultNumbersFormat,
      },
    },
  ],
});

const getPaymentDetailsForm = (): PaymentFormGroup => ({
  name: PaymentBaseFields.remittanceInfo,
  fields: [
    {
      ...getConfiguration(RemittanceInfoFields.amountCurrencyGroup),
      options: {
        ...getOptions(RemittanceInfoFields.amountCurrencyGroup),
        label: $localize`:@@cash-advance-modal.details.amount:Amount`,
        asyncValidators: [creditLimitExceededValidator],
        validationMessages: getOptions(RemittanceInfoFields.amountCurrencyGroup).validationMessages.concat([
          {
            name: 'creditLimitExceeded',
            message: $localize`:@@cash-advance-modal.details.error.credit-limit-exceeded:Please enter an amount below your remaining cash credit limit`,
          },
        ]),
      },
    },
  ],
});

const getDeliveryForm = (): PaymentFormGroup => ({
  name: PaymentBaseFields.schedule,
  fields: [
    {
      ...getConfiguration(PaymentComponents.alert),
      options: {
        ...getOptions(PaymentComponents.alert),
        alerts: {
          overdue: getOptions(PaymentComponents.alert).alerts.overdue,
        },
      },
    },
    {
      ...getConfiguration(ScheduleFields.startDate),
      options: {
        ...getOptions(ScheduleFields.startDate),
        label: $localize`:@@cash-advance-modal.delivery.execution-date.title:Execution date`,
      },
    },
    {
      ...getConfiguration(ScheduleFields.frequency),
      options: { options: [{ value: Frequencies.ONCE }], defaultValue: Frequencies.ONCE },
      hidden: true,
    },
  ],
});

export const cashAdvancePaymentTypeConfig: PaymentTypeConfig = {
  ...INTERNAL_TRANSFER,
  fields: [getFromAccountForm(), getToAccountForm(), getPaymentDetailsForm(), getDeliveryForm()],
};
