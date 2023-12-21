import { provideEntity } from '@spryker-oryx/core';
import { Provider } from '@spryker-oryx/di';
import { provideExperienceData } from '@spryker-oryx/experience';
import {
  merchantOffersOnPDP,
  merchantPage,
  merchantSoldToOnPDP,
} from '../presets';
import {
  DefaultMerchantAdapter,
  MerchantAdapter,
  MerchantNormalizer,
  OfferNormalizer,
  merchantIncludes,
} from './adapter';
import { merchantNormalizer } from './adapter/normalizers';
import {
  offerAvailabilityNormalizer,
  offerMerchantNormalizer,
  offerNormalizer,
  offerPriceNormalizer,
} from './adapter/normalizers/offer.normalizer';
import { DefaultMerchantService } from './default-merchant.service';
import { MerchantContext, merchantContextProviders } from './merchant.context';
import { MerchantService } from './merchant.service';
import { merchantQueries, merchantsEffects } from './state';

export const merchantProviders: Provider[] = [
  {
    provide: OfferNormalizer,
    useValue: offerNormalizer,
  },
  {
    provide: OfferNormalizer,
    useValue: offerPriceNormalizer,
  },
  {
    provide: OfferNormalizer,
    useValue: offerAvailabilityNormalizer,
  },
  {
    provide: OfferNormalizer,
    useValue: offerMerchantNormalizer,
  },
  {
    provide: MerchantAdapter,
    useClass: DefaultMerchantAdapter,
  },
  {
    provide: MerchantService,
    useClass: DefaultMerchantService,
  },
  {
    provide: MerchantNormalizer,
    useValue: merchantNormalizer,
  },
  ...merchantQueries,
  ...merchantsEffects,
  ...merchantIncludes,
  ...merchantContextProviders,
  provideEntity('merchant', {
    service: MerchantService,
    context: MerchantContext.ID,
  }),
  provideExperienceData([
    merchantPage,
    merchantOffersOnPDP,
    merchantSoldToOnPDP,
  ]),
];