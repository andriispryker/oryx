import { ErrorHandler } from '@spryker-oryx/core';
import { Provider } from '@spryker-oryx/injector';
import {
  CountryService,
  CurrencyService,
  DefaultCountryService,
  DefaultCurrencyService,
  DefaultLocaleService,
  DefaultPricingService,
  DefaultSemanticLinkService,
  LocaleService,
  PricingService,
  SemanticLinkService,
  SiteErrorHandler,
  StoreService,
} from '@spryker-oryx/site';
import { MockStoreService } from './mock-store.service';

export const mockSiteProviders: Provider[] = [
  {
    provide: StoreService,
    useClass: MockStoreService,
  },
  {
    provide: CountryService,
    useClass: DefaultCountryService,
  },
  {
    provide: CurrencyService,
    useClass: DefaultCurrencyService,
  },
  {
    provide: LocaleService,
    useClass: DefaultLocaleService,
  },
  {
    provide: PricingService,
    useClass: DefaultPricingService,
  },
  {
    provide: SemanticLinkService,
    useClass: DefaultSemanticLinkService,
  },
  {
    provide: ErrorHandler,
    useClass: SiteErrorHandler,
  },
];