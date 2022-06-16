import { Price } from '@spryker-oryx/product';

export interface ProductPriceContent {
  original: boolean;
}

export interface FormattedProductPrice {
  defaultPrice?: FormattedPrice;
  originalPrice?: FormattedPrice;
}

export interface FormattedPrice extends Price {
  /** Formatted price based on currency and localisation.
   *
   * I.e. `€ 5,95` vs `5.95 €`.
   */
  formattedPrice?: string;
}