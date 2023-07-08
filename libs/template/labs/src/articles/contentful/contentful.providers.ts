import { ContentAdapter } from '@spryker-oryx/content';
import { injectEnv } from '@spryker-oryx/core';
import { Provider } from '@spryker-oryx/di';
import { SuggestionAdapter } from '@spryker-oryx/search';
import { factory } from '../stubs';
import {
  ContentfulClientService,
  ContentfulSpace,
  ContentfulToken,
  DefaultContentfulClientService,
} from './client';
import { DefaultContentfulSuggestionAdapter } from './contentful-suggestion.adapter';
import { ContentfulAdapter } from './contentful.adapter';

export const contentfulProviders: Provider[] = [
  {
    provide: ContentfulToken,
    useFactory: () => injectEnv('ORYX_CONTENTFUL_TOKEN', ''),
  },
  {
    provide: ContentfulSpace,
    useFactory: () => injectEnv('ORYX_CONTENTFUL_SPACE', ''),
  },
  {
    provide: ContentfulClientService,
    useFactory: () =>
      factory(DefaultContentfulClientService, [
        ContentfulSpace,
        ContentfulToken,
      ]),
  },
  {
    provide: ContentAdapter,
    useFactory: () =>
      factory(ContentfulAdapter, [ContentfulSpace, ContentfulToken]),
  },
  {
    provide: SuggestionAdapter,
    useFactory: () =>
      factory(DefaultContentfulSuggestionAdapter, [
        ContentfulSpace,
        ContentfulToken,
      ]),
  },
];