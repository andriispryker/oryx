import { Theme } from '@spryker-oryx/core';
import { defaultBreakpoints } from '@spryker-oryx/themes/breakpoints';
import { backofficeNgIcons } from '@spryker-oryx/themes/icons';

// TODO: This should be dropped after HRZ-2239
export const fulfillmentTheme: Theme = {
  name: 'backoffice-ng',
  breakpoints: defaultBreakpoints,
  icons: backofficeNgIcons,
  designTokens: () =>
    import('../design-tokens/src/backoffice').then(
      (s) => s.backofficeTokensWithoutDarkMode
    ),
};