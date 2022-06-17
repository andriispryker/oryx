import { css } from 'lit';

export const styles = css`
  :host {
    text-align: start;
    margin-block-end: 10px;
    text-decoration: none;
    border: 1px solid var(--oryx-color-neutral-light);
    border-radius: 9px;
    position: relative;
    display: block;
    padding-block: 10px;
    padding-inline-end: 20px;
    padding-inline-start: 38px;
    min-height: 22px;
    cursor: pointer;
  }

  h5::before {
    content: '';
    border-radius: 50%;
    width: 8px;
    height: 8px;
    background: var(--oryx-color-neutral-light);
    position: absolute;
    inset-block-start: 17px;
    inset-inline-start: 20px;
  }

  h5 {
    line-height: 22px;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--oryx-color-ink);
    margin: 0;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  slot[name='content'] {
    color: var(--oryx-color-neutral-darker);
    text-transform: none;
    font-size: 14px;
  }

  :host([active]) h5::before {
    background: var(--oryx-color-brand);
  }

  :host([active]) h5 {
    color: var(--oryx-color-brand);
  }

  :host(:hover) {
    box-shadow: 0 4px 12px var(--oryx-elevation-color-2);
  }

  :host(:focus-visible) {
    outline: none;
    border: 1px solid var(--oryx-color-brand);
    box-shadow: 0 0 3px var(--oryx-color-brand);
  }
`;