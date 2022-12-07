import {
  CheckoutDataService,
  CheckoutForm,
  ContactDetails,
} from '@spryker-oryx/checkout';
import { ComponentMixin } from '@spryker-oryx/experience';
import { FormComponentInterface } from '@spryker-oryx/form';
import { resolve } from '@spryker-oryx/injector';
import { i18n } from '@spryker-oryx/utilities/i18n';
import { html, LitElement, TemplateResult } from 'lit';
import { createRef, Ref, ref } from 'lit/directives/ref.js';

export class CheckoutContactComponent
  extends ComponentMixin()
  implements CheckoutForm
{
  protected checkoutDataService = resolve(CheckoutDataService);

  protected formRef: Ref<LitElement & FormComponentInterface> = createRef();

  protected getFormElement(): HTMLFormElement | null | undefined {
    return this.formRef.value?.getForm?.();
  }

  submit(report = false): boolean {
    const form = this.getFormElement();

    if (!form?.checkValidity()) {
      if (report) {
        form?.reportValidity();
      } else {
        this.checkoutDataService.setAddressDetails(null);
      }

      return false;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    this.checkoutDataService.setContactDetails(
      data as unknown as ContactDetails
    );

    return true;
  }

  protected override render(): TemplateResult {
    return html`
      <p>${i18n('checkout.contact-details')}</p>
      <user-contact-form ${ref(this.formRef)}></user-contact-form>
    `;
  }
}