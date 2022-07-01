import { expect } from '@storybook/jest';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit-html';
import { storybookPrefix } from '../../../../../.constants';
import '../../index';
import { PaginationComponent, PaginationProperties } from '../../index';

export default {
  title: `${storybookPrefix}/Navigations/Pagination/Interactive`,
} as Meta;

const Template: Story<PaginationProperties> = (): TemplateResult => {
  return html`<oryx-pagination>
    ${Array.from(new Array(10).keys()).map((key) => {
      return html`<a tabindex="0">${key + 1}</a>`;
    })}
  </oryx-pagination> `;
};

export const PaginationInteractive = Template.bind({});

PaginationInteractive.play = async (obj: {
  args: PaginationProperties;
  canvasElement: HTMLElement;
}): Promise<void> => {
  const wait = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const component = obj.canvasElement.querySelector(
    'oryx-pagination'
  ) as PaginationComponent;

  await component.updateComplete;

  const nextPageArrow = component.shadowRoot?.querySelector(
    `a:last-of-type`
  ) as HTMLAnchorElement;
  nextPageArrow.addEventListener('click', (e) => {
    e.preventDefault();
    component.current++;
  });
  const firstPageLink = component.querySelector(
    'a:first-child'
  ) as HTMLAnchorElement;
  firstPageLink.addEventListener('click', (e) => {
    e.preventDefault();
    component.current = Number(firstPageLink.textContent);
  });

  for (let i = 1; i < 10; i++) {
    await nextPageArrow.focus();
    await wait(500);
    await nextPageArrow.click();
    expect(component.current).toBe(i + 1);
  }

  await firstPageLink.focus();
  await wait(500);
  await firstPageLink.click();
  expect(component.current).toBe(1);
};