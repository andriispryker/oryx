import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--oryx-typography-font-face);
    font-size: var(--oryx-typography-font-size);
    font-weight: var(--oryx-typography-font-weight);
    letter-spacing: 0.005em;
    color: var(--oryx-color-ink);
    background-color: var(--oryx-color-canvas-100);
    min-height: 100vh;
  }

  ::placeholder {
    color: var(--oryx-color-placeholder);
  }

  [uid='header'] {
    /* required to ensure that sub elements in the header can become sticky; unclear why */
    display: inline;
  }

  outlet {
    display: block;
    padding-top: 30px;
  }
`;