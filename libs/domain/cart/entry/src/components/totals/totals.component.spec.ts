import { fixture } from '@open-wc/testing-helpers';
import { useComponent } from '@spryker-oryx/core/utilities';
import { createInjector, destroyInjector } from '@spryker-oryx/di';
import { siteProviders } from '@spryker-oryx/site';
import { html } from 'lit';
import { CartEntryPriceComponent } from '../price/price.component';
import { CartEntryTotalsComponent } from './totals.component';
import { cartEntryTotalsComponent } from './totals.def';

describe('CartEntryTotalsComponent', () => {
  let element: CartEntryTotalsComponent;
  const sumPriceToPayAggregation = 1000;

  beforeAll(async () => {
    await useComponent(cartEntryTotalsComponent);
  });

  beforeEach(async () => {
    createInjector({
      providers: siteProviders,
    });
    element = await fixture(html`
      <cart-entry-totals
        .options=${{ calculations: { sumPriceToPayAggregation } }}
      ></cart-entry-totals>
    `);
  });

  afterEach(() => {
    destroyInjector();
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should render "sumPriceToPayAggregation" price', () => {
    const priceElement = element.renderRoot.querySelector(
      'cart-entry-price'
    ) as CartEntryPriceComponent;

    expect(priceElement?.price).toBe(sumPriceToPayAggregation);
  });
});