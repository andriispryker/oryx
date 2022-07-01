import {
  ComponentMixin,
  ContentComponentProperties,
} from '@spryker-oryx/experience';
import { Type } from '@spryker-oryx/typescript-utils';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Product, ProductComponentProperties } from '../models';

export const ProductComponentMixin = <T>(): Type<
  LitElement & ContentComponentProperties<T>
> &
  ProductComponentProperties => {
  class ProductComponent
    extends ComponentMixin<T>()
    implements ProductComponentProperties
  {
    @property() sku?: string;
    @property({ type: Object }) product?: Product;
  }
  return ProductComponent as Type<LitElement & ContentComponentProperties<T>> &
    ProductComponentProperties;
};