import { HttpInterceptors } from '@spryker-oryx/core';
import { Provider } from '@spryker-oryx/injector';
import { AccessTokenService, DefaultAccessTokenService } from './access-token';
import {
  AuthAdapter,
  AuthService,
  DefaultAuthAdapter,
  DefaultAuthService,
  TokenNormalizers,
  tokenNormalizers,
} from './auth';
import {
  DefaultIdentityService,
  identityInterceptor,
  IdentityService,
} from './identity';

export const authProviders: Provider[] = [
  {
    provide: AccessTokenService,
    useClass: DefaultAccessTokenService,
  },
  {
    provide: AuthService,
    useClass: DefaultAuthService,
  },
  { provide: AuthAdapter, useClass: DefaultAuthAdapter },
  { provide: TokenNormalizers, useValue: tokenNormalizers },
  {
    provide: IdentityService,
    useClass: DefaultIdentityService,
  },
  {
    provide: HttpInterceptors,
    useValue: [identityInterceptor],
  },
];
