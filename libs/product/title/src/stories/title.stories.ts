import { ProductComponentProperties } from '@spryker-oryx/product';
import { MockProductService } from '@spryker-oryx/product/mocks';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../.constants';
import { ProductTitleOptions } from '../title.model';

export default {
  title: `${storybookPrefix}/Title`,
  args: {
    sku: MockProductService.mockProducts[0].sku,
    tag: '',
    truncateAfter: 0,
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

type Props = ProductTitleOptions &
  ProductComponentProperties & {
    truncateAfter: number;
  };

const Template: Story<Props> = (props: Props): TemplateResult => {
  const { sku, truncateAfter, ...options } = props;
  return html`
    <style>
      product-title {
        --line-clamp: ${truncateAfter};
      }
    </style>
    <product-title .sku=${sku} .options=${options}></product-title>
  `;
};

export const TitleDemo = Template.bind({});
