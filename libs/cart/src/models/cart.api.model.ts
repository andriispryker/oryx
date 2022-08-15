import { Include, JsonApiModel } from '@spryker-oryx/typescript-utils';

export module ApiCartModel {
  export interface Attributes {
    name: string;
    isDefault: boolean;
    totals: Totals;
    discounts?: unknown[];
    thresholds?: unknown[];
    priceMode?: string;
    currency?: string;
    store?: string;
  }

  export interface Totals {
    grandTotal: number;
    priceToPay: number;
    expenseTotal?: number;
    discountTotal?: number;
    taxTotal?: number;
    subtotal?: number;
  }

  export interface Entry {
    sku: string;
    quantity: number;
    groupKey: string;
    abstractSku: string;
    amount?: unknown;
    productOfferReference?: unknown;
    merchantReference?: unknown;
    calculations?: Calculations;
    configuredBundle?: unknown;
    configuredBundleItem?: unknown;
    productConfigurationInstance?: unknown;
    salesUnit?: unknown;
    selectedProductOptions?: unknown[];
  }

  export interface Calculations {
    unitPrice?: number;
    sumPrice?: number;
    taxRate?: number;
    unitNetPrice?: number;
    sumNetPrice?: number;
    unitGrossPrice?: number;
    sumGrossPrice?: number;
    unitTaxAmountFullAggregation?: number;
    sumTaxAmountFullAggregation?: number;
    sumSubtotalAggregation?: number;
    unitSubtotalAggregation?: number;
    unitProductOptionPriceAggregation?: number;
    sumProductOptionPriceAggregation?: number;
    unitDiscountAmountAggregation?: number;
    sumDiscountAmountAggregation?: number;
    unitDiscountAmountFullAggregation?: number;
    sumDiscountAmountFullAggregation?: number;
    unitPriceToPayAggregation?: number;
    sumPriceToPayAggregation?: number;
  }

  export enum Includes {
    GuestCartItems = 'guest-cart-items',
  }

  export type ResponseIncludes = Include<Includes.GuestCartItems, Entry>;

  export type ResponseList = JsonApiModel<
    Attributes,
    ResponseIncludes[],
    Array<unknown>
  >;

  export type Response = JsonApiModel<Attributes, ResponseIncludes[]>;
}