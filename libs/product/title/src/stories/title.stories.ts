import { useComponent } from '@spryker-oryx/core/utilities';
import { setUpMockProviders } from '@spryker-oryx/injector';
import { ProductComponentProperties } from '@spryker-oryx/product';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit-html';
import { storybookPrefix } from '../../../.constants';
import { mockProductProviders, MockProductService } from '../../../src/mocks';
import { productTitleComponent } from '../title.def';
import { ProductTitleOptions } from '../title.model';

useComponent(productTitleComponent);

export default {
  title: `${storybookPrefix}/Title`,
  loaders: [setUpMockProviders(mockProductProviders)],
  args: {
    sku: MockProductService.mockProducts[0].sku,
    tag: '',
    singleLine: false,
    link: false,
  },
  argTypes: {
    sku: {
      control: { type: 'select' },
      options: [
        ...MockProductService.mockProducts.map((p) => p.sku),
        'not-found',
      ],
      table: { category: 'product' },
    },
    tag: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
  },
} as unknown as Meta;

type Props = ProductTitleOptions & ProductComponentProperties;

const Template: Story<Props> = (props: Props): TemplateResult => {
  return html`<product-title .sku=${props.sku} .options=${props} />`;
};

export const TitleDemo = Template.bind({});
