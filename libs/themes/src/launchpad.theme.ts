import { Theme } from '@spryker-oryx/core';
import { defaultBreakpoints } from '@spryker-oryx/themes/breakpoints';
import { backofficeIcons } from '@spryker-oryx/themes/icons';

export const launchpadTheme: Theme = {
  name: 'launchpad',
  breakpoints: defaultBreakpoints,
  icons: backofficeIcons,
  designTokens: () =>
    import('../design-tokens/src/launchpad').then((s) => s.launchpadTokens),
};