import { ProductComponentProperties } from '@spryker-oryx/product';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit-html';
import { storybookPrefix } from '../../../.constants';
import { MockProductService } from '../../../src/mocks';
import { ProductAverageRatingModel } from '../average-rating.model';
import '../index';
import { setupProductMocks } from './product-mocks';

export default {
  title: `${storybookPrefix}/Average rating`,
  loaders: [setupProductMocks],
} as unknown as Meta;

type Props = ProductAverageRatingModel & ProductComponentProperties;

const Template: Story<Props> = (props: Props): TemplateResult => {
  return html`<product-average-rating .sku=${props.sku} .content=${props} />`;
};

export const AverageRatingDemo = Template.bind({});

AverageRatingDemo.args = {
  sku: MockProductService.mockProducts[0].sku,
  hideReviewCount: false,
};

AverageRatingDemo.argTypes = {
  sku: {
    control: { type: 'select' },
    options: [
      ...MockProductService.mockProducts.map((p) => p.sku),
      'not-found',
    ],
    table: { category: 'product' },
  },
  hideReviewCount: {
    table: { category: 'component' },
  },
};
