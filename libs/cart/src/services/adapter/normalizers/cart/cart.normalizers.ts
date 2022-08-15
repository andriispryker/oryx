import { Transformer } from '@spryker-oryx/core';
import { camelize } from '@spryker-oryx/typescript-utils';
import { ApiCartModel, Cart } from '../../../../models';
import { DeserializedCart } from './model';

export const CartNormalizers = 'FES.CartNormalizers';

export function cartAttributesNormalizer(data: DeserializedCart): Cart {
  const guestItemsKey = camelize(ApiCartModel.Includes.GuestCartItems);
  const { [guestItemsKey]: products } = data;

  delete data[guestItemsKey];

  return {
    ...data,
    products,
  };
}

export const cartNormalizers = [cartAttributesNormalizer];

declare global {
  interface InjectionTokensContractMap {
    [CartNormalizers]: Transformer[];
  }
}