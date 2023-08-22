import { css } from 'lit';

export const styles = css`
  :host([dropdown]) {
    --oryx-button-color: var(--oryx-color-neutral-12);

    padding: 9px 15px;
    display: block;
  }

  :host([dropdown]:hover) {
    background-color: var(--oryx-color-neutral-3);
  }
`;
