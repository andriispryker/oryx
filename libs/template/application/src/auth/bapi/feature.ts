import {
  authLoginComponent,
  AuthLoginStrategy,
  authLogoutComponent,
  CodeGrantAuthLoginStrategy,
  CodeGrantAuthLoginStrategyConfig,
  IdentityService,
  OauthFeature,
  OauthFeatureConfig,
  oauthHandlerComponent,
} from '@spryker-oryx/auth';
import { AppFeature, ComponentsInfo, injectEnv } from '@spryker-oryx/core';
import { Provider } from '@spryker-oryx/di';
import { provideLitRoutes } from '@spryker-oryx/router/lit';
import { BapiIdentityService } from './bapi-identity.service';
import { defaultBapiRoutes } from './routes';

/**
 * Backoffice API Authentication feature
 *
 * By default it sets up a login route at `/login`
 * with a Spryker `authorization_code` grant Oauth flow
 * where login page is hosted by the app itself
 * and a callback route at `/oauth/cb/spryker`
 * which handles the Oauth redirect response.
 */
export class BapiAuthFeature extends OauthFeature implements AppFeature {
  protected static defaultConfigFactory(): BapiAuthFeatureConfig {
    return {
      loginRoute: '/login',
      providers: [
        {
          id: 'spryker',
          clientId: 'frontend',
          grantType: 'authorization_code',
          authUrl: new URL('/login', globalThis.location.origin).toString(),
          tokenUrl: new URL(
            '/token',
            injectEnv('ORYX_FULFILLMENT_BACKEND_URL')
          ).toString(),
          redirectUrl: new URL(
            '/oauth/cb/spryker',
            globalThis.location.origin
          ).toString(),
        },
      ],
      defaultProvider: 'spryker',
    };
  }

  constructor(
    config:
      | BapiAuthFeatureConfig
      | (() => BapiAuthFeatureConfig) = BapiAuthFeature.defaultConfigFactory
  ) {
    super(config);
  }

  protected override getProviders(
    configFactory: () => BapiAuthFeatureConfig
  ): Provider[] {
    return [
      ...super.getProviders(configFactory),
      ...provideLitRoutes(() => ({
        routes: configFactory().skipRoutes
          ? []
          : defaultBapiRoutes(
              configFactory().loginRoute,
              '/oauth/cb/spryker',
              configFactory().providers[0].id
            ),
      })),
      { provide: IdentityService, useClass: BapiIdentityService },
      { provide: AuthLoginStrategy, useClass: CodeGrantAuthLoginStrategy },
      {
        provide: CodeGrantAuthLoginStrategyConfig,
        useFactory: () =>
          ({
            loginUrl: new URL(
              '/authorize',
              injectEnv('ORYX_FULFILLMENT_BACKEND_URL')
            ).toString(),
          } as CodeGrantAuthLoginStrategyConfig),
      },
    ];
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BapiAuthFeatureConfig extends OauthFeatureConfig {
  skipRoutes?: boolean;
}

export class BapiAuthComponentsFeature implements AppFeature {
  components: ComponentsInfo = [
    authLoginComponent,
    authLogoutComponent,
    oauthHandlerComponent,
  ];
}