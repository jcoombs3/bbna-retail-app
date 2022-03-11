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

const scheduleFrequency = [
  { label: $localize`:@@repay-modal.delivery.frequency.once:Once`, value: Frequencies.ONCE },
  { label: $localize`:@@repay-modal.delivery.frequency.monthly:Monthly`, value: Frequencies.MONTHLY },
];

const amountOptions = {
  cssClasses: ['pl-2'],
  creditCard: [
    {
      label: $localize`:@@repay-modal.details.amount-label.minimum-payment:Minimum repayment`,
      description: $localize`:@@repay-modal.details.amount-description.minimum-payment:The minimum you need to pay`,
      amountApiField: 'minimumPayment',
      scheduleFrequency,
    },
    {
      label: $localize`:@@repay-modal.details.amount-label.booked-balance:Consumed credit limit`,
      description: $localize`:@@repay-modal.details.amount-description.booked-balance:The balance plus any activity since the latest billing cycle`,
      amountApiField: 'bookedBalance',
      scheduleFrequency,
    },
    {
      label: $localize`:@@repay-modal.details.amount-label.custom-amount:Different amount`,
      description: $localize`:@@repay-modal.details.amount-description.custom-amount:Choose what you wish to repay`,
      scheduleFrequency,
      hasCustomAmountInput: true,
    },
  ],
};

const updateAmountOptions = (_: any, control?: AbstractControl) => {
  const items = [];
  const product = control && control.parent ? control.parent.value?.accountData?.defaultRecord : null;
  const productKindName = control && control.parent ? control.parent.value?.productKindName : null;
  const isAmountOptionsZero = amountOptions?.creditCard?.every((option) =>
    option?.amountApiField ? Number(product?.[<string>option.amountApiField]) === 0 : true,
  );

  if (productKindName === 'Credit Card' || productKindName === 'Loan') {
    items.push(RemittanceInfoFields.amountOptions);
    if (productKindName === 'Credit Card' && isAmountOptionsZero) {
      items.push(RemittanceInfoFields.amountCurrencyGroup);
    }
  } else {
    items.push(RemittanceInfoFields.description, RemittanceInfoFields.amountCurrencyGroup);
  }

  return [{ parent: PaymentBaseFields.remittanceInfo, items }];
};

const getToAccountForm = (useShortCurrency = defaultUseShortCurrencyValue): PaymentFormGroup => ({
  name: PaymentBaseFields.counterparty,
  fields: [
    {
      ...getConfiguration(CounterPartyFields.counterPartyAccountGroup),
      options: {
        ...getOptions(CounterPartyFields.counterPartyAccountGroup),
        cssClasses: getOptions(CounterPartyFields.counterPartyAccountGroup).cssClasses.concat(['bb-heading-3']),
        productKinds: [
          {
            productKind: 'Credit Card',
            balance: {
              apiField: 'bookedBalance',
              label: $localize`:@@repay-modal.account.total-owed:Total owed`,
            },
          },
        ],
        showCurrencySymbol: useShortCurrency,
        productNumberFormat: defaultNumbersFormat,
        activateDependantsOn: updateAmountOptions,
      },
    },
  ],
});

const getFromAccountForm = (useShortCurrency = defaultUseShortCurrencyValue): PaymentFormGroup => ({
  name: PaymentBaseFields.initiator,
  fields: [
    {
      ...getConfiguration(InitiatorFields.initiatorAccountGroup),
      options: {
        ...getOptions(InitiatorFields.initiatorAccountGroup),
        cssClasses: getOptions(InitiatorFields.initiatorAccountGroup).cssClasses.concat(['bb-heading-3']),
        productKinds: [
          { productKind: 'Savings Account', balance: { apiField: 'availableBalance' } },
          { productKind: 'Current Account', balance: { apiField: 'bookedBalance' } },
        ],
        mapItems: (accounts) => accounts,
        showCurrencySymbol: useShortCurrency,
        productNumberFormat: defaultNumbersFormat,
      },
    },
  ],
});

const getPaymentDetailsForm = (useShortCurrency = defaultUseShortCurrencyValue): PaymentFormGroup => ({
  name: PaymentBaseFields.remittanceInfo,
  fields: [
    {
      ...getConfiguration(PaymentComponents.header),
    },
    {
      ...getConfiguration(RemittanceInfoFields.amountOptions),
      options: {
        ...getOptions(RemittanceInfoFields.amountOptions),
        mapCurrency: useShortCurrency,
        showCurrencySymbol: useShortCurrency,
        amountOptions,
        preselect: true,
      },
    },
    {
      ...getConfiguration(RemittanceInfoFields.amountCurrencyGroup),
    },
  ],
});

const getDeliveryForm = (): PaymentFormGroup => ({
  name: PaymentBaseFields.schedule,
  fields: [
    {
      ...getConfiguration(PaymentComponents.scheduleHeader),
      options: {
        cssClasses: ['col-12', 'pb-0', 'pt-2', 'bb-heading-3'],
        heading: $localize`:@@repay-modal.delivery.header:Delivery `,
        headingType: 'h3',
        headingClasses: ['mb-0'],
        separatorLine: true,
      },
    },
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
      ...getConfiguration(ScheduleFields.frequency),
      options: {
        ...getOptions(ScheduleFields.frequency),
        cssClasses: ['d-inline-block', 'col-md-6', 'align-top'],
        options: scheduleFrequency,
      },
    },
    {
      ...getConfiguration(ScheduleFields.startDate),
      options: {
        ...getOptions(ScheduleFields.startDate),
        label: $localize`:@@repay-modal.delivery.execution-date.title:Execution date`,
        cssClasses: ['d-inline-block', 'col-md-6', 'align-top'],
      },
    },
    {
      ...getConfiguration(ScheduleFields.endType),
    },
    {
      ...getConfiguration(ScheduleFields.endDate),
    },
    {
      ...getConfiguration(ScheduleFields.repeat),
    },
  ],
});

export const repayPaymentTypeConfig: PaymentTypeConfig = {
  ...INTERNAL_TRANSFER,
  fields: [getToAccountForm(), getFromAccountForm(), getPaymentDetailsForm(), getDeliveryForm()],
};
