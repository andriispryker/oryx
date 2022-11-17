import { ThemeStylesWithMedia } from '@spryker-oryx/core';
import { mdScreen } from '@spryker-oryx/themes/breakpoints';
import { css } from 'lit';

export const confirmationBaseStyles = css`
  oryx-notification {
    margin-inline: var(--oryx-space-4);
    margin-block-start: var(--oryx-space-4);
  }

  oryx-button button {
    line-height: 20px;
    padding-top: 2px;
    padding-bottom: 2px;
    border: none;
  }

  oryx-notification > :not(:last-child) {
    margin-bottom: var(--oryx-space-2);
  }
`;

const mediumScreen = css`
  oryx-notification {
    flex-direction: row;
    align-items: center;
  }

  oryx-notification > :not(:last-child) {
    padding-inline-end: var(--oryx-space-4);
    margin-bottom: 0;
  }
`;

export const confirmationScreenStyles: ThemeStylesWithMedia[] = [
  {
    media: mdScreen,
    css: mediumScreen,
  },
];
