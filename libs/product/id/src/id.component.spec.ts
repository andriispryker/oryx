import { fixture } from '@open-wc/testing-helpers';
import { useComponent } from '@spryker-oryx/core/utilities';
import { ExperienceService } from '@spryker-oryx/experience';
import { createInjector, destroyInjector } from '@spryker-oryx/injector';
import '@spryker-oryx/testing';
import { html } from 'lit';
import { Observable, of } from 'rxjs';
import { MOCK_PRODUCT_PROVIDERS } from '../../src/mocks';
import { ProductIdComponent } from './id.component';
import { productIdComponent } from './index';

useComponent(productIdComponent);

const mockSku = '1';

class MockExperienceContentService implements Partial<ExperienceService> {
  getOptions = ({ uid = '' }): Observable<any> => of({});
}

describe('ProductIdComponent', () => {
  let element: ProductIdComponent;

  beforeEach(async () => {
    createInjector({
      providers: [
        ...MOCK_PRODUCT_PROVIDERS,
        {
          provide: ExperienceService,
          useClass: MockExperienceContentService,
        },
      ],
    });
    element = await fixture(
      html`<product-id
        sku="${mockSku}"
        .options=${{ prefix: 'Test prefix' }}
      ></product-id>`
    );
  });

  afterEach(() => {
    destroyInjector();
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should render sku prefix', () => {
    expect(element.shadowRoot?.textContent).toContain('Test prefix');
  });

  it('should render sku', () => {
    expect(element.shadowRoot?.textContent).toContain(mockSku);
  });

  describe('when prefix is empty', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<product-id sku="${mockSku}" .options=${{}}></product-id>`
      );
    });

    it('should render default sku prefix', () => {
      expect(element.shadowRoot?.textContent).toContain('SKU');
    });
  });
});