import { ProductComponentProperties } from '@spryker-oryx/product';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit-html';
import { storybookPrefix } from '../../../.constants';
import { AddToCartOptions } from '../add-to-cart.model';
import '../index';

export default {
  title: `${storybookPrefix}/Add to cart`,
} as Meta;

type Props = ProductComponentProperties & AddToCartOptions;

const Template: Story<Props> = (props: Props): TemplateResult => {
  return html`
    <add-to-cart
      .sku=${props.sku}
      .options=${{
        hideQuantityInput: props.hideQuantityInput,
        loading: props.loading,
      }}
    ></add-to-cart>
  `;
};

export const Demo = Template.bind({});

Demo.args = {
  sku: '1',
  hideQuantityInput: false,
  loading: false,
};

Demo.argTypes = {
  sku: {
    control: { type: 'select' },
    options: ['1', '2', '3', 'not-found'],
  },
};
