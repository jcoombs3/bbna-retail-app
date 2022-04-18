import { PaymentFormFieldHooks, PaymentFormField } from '@backbase/payment-orders-ang';
import { FormControl } from '@angular/forms';

export function triggerHook(name: PaymentFormFieldHooks, component: PaymentFormField) {
  const control = <FormControl>component.group.get(component.config.name);
  const hook = component.config.hooks && component.config.hooks[name];
  if (typeof hook === 'function') {
    hook({
      component,
      control,
      group: component.group,
    });
  }
}
