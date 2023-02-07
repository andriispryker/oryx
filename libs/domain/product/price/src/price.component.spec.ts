import { fixture } from '@open-wc/testing-helpers';
import { useComponent } from '@spryker-oryx/core/utilities';
import { createInjector, destroyInjector, getInjector } from '@spryker-oryx/di';
import { ExperienceService } from '@spryker-oryx/experience';
import { ProductPrice, ProductService } from '@spryker-oryx/product';
import { mockProductProviders } from '@spryker-oryx/product/mocks';
import { PricingService } from '@spryker-oryx/site';
import { html } from 'lit';
import { Observable, of } from 'rxjs';
import { ProductPriceComponent } from './price.component';
import { productPriceComponent } from './price.def';

class MockExperienceService implements Partial<ExperienceService> {
  getOptions(): Observable<any> {
    return of({ data: {} });
  }
}

const mockEurNet = {
  currency: 'EUR',
  value: 1095,
  isNet: true,
};

const mockEurGross = {
  currency: 'EUR',
  value: 1095,
  isNet: false,
};

class MockPricingService implements Partial<PricingService> {
  format(price: ProductPrice) {
    if (!price) return of(null);
    return of(`${price.currency} ${price.value}`);
  }
}

describe('ProductPriceComponent', () => {
  let element: ProductPriceComponent;
  let mockProductService: ProductService;

  beforeAll(async () => {
    await useComponent(productPriceComponent);
  });

  beforeEach(async () => {
    createInjector({
      providers: [
        ...mockProductProviders,
        {
          provide: PricingService,
          useClass: MockPricingService,
        },
        {
          provide: ExperienceService,
          useClass: MockExperienceService,
        },
      ],
    });

    mockProductService = getInjector().inject(ProductService);
  });

  afterEach(() => {
    destroyInjector();
  });

  it('is defined', async () => {
    element = await fixture(
      html`<oryx-product-price sku="123"></oryx-product-price>`
    );
    expect(element).toBeInstanceOf(ProductPriceComponent);
  });

  it('passes the a11y audit', async () => {
    element = await fixture(
      html`<oryx-product-price sku="123"></oryx-product-price>`
    );
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('when no price is provided', () => {
    beforeEach(async () => {
      vi.spyOn(mockProductService, 'get').mockImplementationOnce(() => of());
      element = await fixture(
        html`<oryx-product-price sku="123"></oryx-product-price>`
      );
    });

    it(`should not render any price`, () => {
      expect(element).not.toContainElement('span');
    });
  });

  describe('when a default price is provided', () => {
    beforeEach(async () => {
      vi.spyOn(mockProductService, 'get').mockImplementation(() =>
        of({ price: { defaultPrice: mockEurNet } })
      );
      element = await fixture(
        html`<oryx-product-price sku="123"></oryx-product-price>`
      );
    });

    it(`should render the sales price`, () => {
      expect(element).toContainElement('span[part="sales"]');
    });

    it(`should render the vat`, () => {
      expect(element).toContainElement('span[part="vat"]');
    });
  });

  describe('when an original price is provided', () => {
    beforeEach(async () => {
      vi.spyOn(mockProductService, 'get').mockImplementation(() =>
        of({ price: { originalPrice: mockEurNet } })
      );
      element = await fixture(
        html`<oryx-product-price sku="123"></oryx-product-price>`
      );
    });

    it(`should render the original price`, () => {
      expect(element).toContainElement('span[part="original"]');
    });

    it(`should render the vat`, () => {
      expect(element).toContainElement('span[part="vat"]');
    });
  });

  describe('when a default and original price is provided', () => {
    beforeEach(async () => {
      vi.spyOn(mockProductService, 'get').mockImplementation(() =>
        of({ price: { originalPrice: mockEurNet, defaultPrice: mockEurNet } })
      );
      element = await fixture(
        html`<oryx-product-price sku="123"></oryx-product-price>`
      );
    });

    it(`should render the sales price`, () => {
      expect(element).toContainElement('span[part="sales"]');
    });

    it(`should render the original price`, () => {
      expect(element).toContainElement('span[part="original"]');
    });

    it(`should render the vat`, () => {
      expect(element).toContainElement('span[part="vat"]');
    });
  });

  describe('when the price is net', () => {
    beforeEach(async () => {
      vi.spyOn(mockProductService, 'get').mockImplementation(() =>
        of({ price: { originalPrice: mockEurNet, defaultPrice: mockEurNet } })
      );
      element = await fixture(
        html`<oryx-product-price sku="123"></oryx-product-price>`
      );
    });

    it(`should render the excl vat message`, () => {
      const vat = element.shadowRoot?.querySelector('span[part="vat"]');
      expect(vat?.textContent).toContain('Excl vat');
    });
  });

  describe('when the price is gross', () => {
    beforeEach(async () => {
      vi.spyOn(mockProductService, 'get').mockImplementation(() =>
        of({
          price: { originalPrice: mockEurGross, defaultPrice: mockEurGross },
        })
      );
      element = await fixture(
        html`<oryx-product-price sku="123"></oryx-product-price>`
      );
    });

    it(`should render the excl vat message`, () => {
      const vat = element.shadowRoot?.querySelector('span[part="vat"]');
      expect(vat?.textContent).toContain('Incl vat');
    });
  });
});
