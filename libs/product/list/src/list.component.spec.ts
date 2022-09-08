import { fixture } from '@open-wc/testing-helpers';
import { useComponent } from '@spryker-oryx/core/utilities';
import { createInjector, destroyInjector } from '@spryker-oryx/injector';
import {
  ProductListPageService,
  ProductListService,
} from '@spryker-oryx/product';
import { mockProductListProviders } from '@spryker-oryx/product/mocks';
import '@spryker-oryx/testing';
import { html } from 'lit';
import { of } from 'rxjs';
import { productListComponent } from './component';
import { ProductListComponent } from './list.component';

class MockProductListService implements Partial<ProductListService> {
  get = vi.fn();
}

class MockProductListPageService implements Partial<ProductListPageService> {
  get = vi.fn();
}

describe('ProductListComponent', () => {
  let element: ProductListComponent;
  let mockProductListService: MockProductListService;
  let mockProductListPageService: MockProductListPageService;

  beforeAll(async () => {
    await useComponent(productListComponent);
  });

  beforeEach(async () => {
    const testInjector = createInjector({
      providers: [
        ...mockProductListProviders,
        {
          provide: ProductListService,
          useClass: MockProductListService,
        },
        {
          provide: ProductListPageService,
          useClass: MockProductListPageService,
        },
      ],
    });

    mockProductListService = testInjector.inject(
      ProductListService
    ) as unknown as MockProductListService;

    mockProductListPageService = testInjector.inject(
      ProductListPageService
    ) as unknown as MockProductListPageService;

    mockProductListService.get.mockReturnValue(of([]));
    element = await fixture(
      html`<product-list .options="${{ q: 'sony' }}"></product-list>`
    );
  });

  afterEach(() => {
    destroyInjector();
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(ProductListComponent);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('when user provide input', () => {
    it('should use user input to get data', () => {
      expect(mockProductListService.get).toHaveBeenCalledWith({ q: 'sony' });
    });
  });

  describe('when user does not provide input', () => {
    beforeEach(async () => {
      mockProductListPageService.get.mockReturnValue(of([]));
      element = await fixture(
        html`<product-list .options="${{ q: '' }}"></product-list>`
      );
    });

    it('should use user input to get data', () => {
      expect(mockProductListPageService.get).toHaveBeenCalled();
    });
  });
});