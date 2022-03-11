import { INTERNAL_TRANSFER, PaymentFormFieldOptions, PaymentFormGroup } from '@backbase/initiate-payment-journey-ang';

const internalTransferFields = INTERNAL_TRANSFER.fields.reduce(
  (fields, group) => fields.concat(...(group as PaymentFormGroup).fields),
  [],
);

export const defaultNumbersFormat = { length: 0, segments: 4, maskRange: [0, 0] };

export const defaultUseShortCurrencyValue = true;

export const getConfiguration = (fieldName: string): PaymentFormGroup => {
  return internalTransferFields.find((field) => field.name === fieldName);
};

export const getOptions = (fieldName: string): PaymentFormFieldOptions => {
  return getConfiguration(fieldName).options;
};
