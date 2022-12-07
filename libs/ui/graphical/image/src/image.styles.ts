import { css } from 'lit';

export const styles = css`
  :host {
    --oryx-icon-size: 100px;
  }

  ::slotted(svg) {
    height: 100%;
    width: 100%;
  }

  [part='fallback'] {
    color: var(--oryx-color-neutral-300);
    margin: auto;
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    max-width: var(--image-max-width, 100%);
    max-height: var(--image-max-height, 100%);
    object-fit: var(--image-fit, contain);
  }
`;