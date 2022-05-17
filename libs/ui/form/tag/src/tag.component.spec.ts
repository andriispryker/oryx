import { fixture, html } from '@open-wc/testing-helpers';
import '@spryker-oryx/testing';
import { getShadowElementBySelector } from '@spryker-oryx/testing';
import { beforeEach, describe } from 'vitest';
import './index';
import { TagComponent } from './tag.component';

describe('TagComponent', () => {
  let element: TagComponent;

  it('is defined', () => {
    const el = document.createElement('oryx-tag');
    expect(el).toBeInstanceOf(TagComponent);
  });

  describe('tag text message', () => {
    const message = 'Custom text message';
    beforeEach(async () => {
      element = await fixture(html` <oryx-tag>${message}</oryx-tag>`);
    });

    it('should contain message text', () => {
      expect(element.textContent).toContain(message);
    });
  });

  describe('tag disabled state', () => {
    beforeEach(async () => {
      element = await fixture(html` <oryx-tag disabled></oryx-tag>`);
    });

    it('should disable the close button', () => {
      expect(element.shadowRoot?.querySelector('button')?.disabled).toBe(true);
    });
  });

  describe('tag dispatch close event', () => {
    const callback = vi.fn();

    beforeEach(async () => {
      element = await fixture(html` <oryx-tag @click=${callback}></oryx-tag>`);
    });

    it('should dispatch close event on button click', async () => {
      getShadowElementBySelector(element, 'button')?.click();
      expect(callback).toHaveBeenCalledOnce();
    });
  });
});
