import { css } from 'lit';

export const ProductCardStyles = css`
  :host {
    --max-lines: var(--effect, var(--oryx-product-title-max-lines));

    flex: inherit;
    scroll-snap-align: inherit;
    display: grid;
    grid-template-columns: auto auto;
    transition: all var(--oryx-transition-time);
    background-color: var(--oryx-color-canvas-100);
    border: var(--oryx-border-thin) solid var(--oryx-color-canvas-200);
    box-shadow: var(--oryx-elevation-0) var(--oryx-elevation-color-2);
  }

  :host(:is(:hover, :focus-within)) {
    --effect: 10;

    box-shadow: var(--oryx-elevation-1) var(--oryx-elevation-color-2);
    border-color: var(--oryx-color-canvas-500);
  }

  content-link,
  content-link::part(link) {
    display: contents;
  }

  content-link > * {
    grid-column: 1 / span 2;
  }

  product-media {
    height: 250px;
    display: block;
    grid-row-start: 1;
    grid-column-start: 1;
    background-color: var(--oryx-color-canvas-200);
  }

  product-labels,
  .actions {
    grid-row: 1;
    padding-top: 12px;
    z-index: 1;
  }

  .actions {
    justify-self: end;
  }

  content-link > *:not(:is(product-media, div.popover)) {
    margin-inline: 16px;
  }

  content-link > *:last-child {
    margin-bottom: 16px;
  }

  :host([has-line-clamp]) .popover {
    display: flex;
    align-items: end;
    grid-row: 1;
    height: calc(250px + 16px + (var(--oryx-product-title-max-lines) * 30px));
  }

  product-title {
    display: block;
    padding: 16px 16px 0;
    background-color: var(--oryx-color-canvas-100);
  }

  product-price,
  oryx-cart-add {
    margin-top: 8px;
  }

  oryx-cart-add {
    align-self: end;
  }
`;
