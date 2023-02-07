import { componentDef } from '@spryker-oryx/core';
import { ProductCardOptions } from './card.model';

declare global {
  interface FeatureOptions {
    'product-card'?: ProductCardOptions;
  }
}

export const productCardComponent = componentDef({
  name: 'product-card',
  impl: () => import('./card.component').then((m) => m.ProductCardComponent),
});
