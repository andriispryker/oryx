import { ContentController } from '@spryker-oryx/experience';
import { resolve } from '@spryker-oryx/injector';
import { asyncValue } from '@spryker-oryx/lit-rxjs';
import { Product, ProductComponentMixin } from '@spryker-oryx/product';
import { html, TemplateResult } from 'lit';
import { switchMap } from 'rxjs';

import { layoutStyles } from '@spryker-oryx/experience/composition';
import {
  ProductListPageService,
  ProductListService,
} from '@spryker-oryx/product';
import { map } from 'rxjs';
import { ProductListQualifier } from '../../src/models/product-list-qualifier';

export class ProductListComponent extends ProductComponentMixin<ProductListQualifier>() {
  static styles = layoutStyles;

  protected productListService = resolve(ProductListService);
  protected productListPageService = resolve(ProductListPageService);
  protected options$ = new ContentController(this).getOptions();
  protected products$ = this.options$.pipe(
    switchMap((options) => {
      const searchParams = this.productListService.getSearchParams(options);
      return this.hasOptions(searchParams)
        ? this.productListService.get(searchParams)
        : this.productListPageService.get();
    }),
    map((list) => list?.products ?? [])
  );

  protected renderProducts(products: Product[]): TemplateResult {
    return html`${products.map(
      (p) => html`<product-card data-sku=${p.sku}></product-card>`
    )}`;
  }

  protected hasOptions(options: ProductListQualifier): boolean {
    return Object.keys(options).some(
      (k) => !!options[k as keyof ProductListQualifier]
    );
  }

  protected override render(): TemplateResult {
    return html`
      ${asyncValue(this.products$, (products) => this.renderProducts(products))}
    `;
  }
}
