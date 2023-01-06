import { AppRef, ThemePlugin } from '@spryker-oryx/core';
import { resolve } from '@spryker-oryx/di';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';

export default { title: `${storybookPrefix}/Graphical/Icon/Static` } as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  const icon = Object.keys(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    resolve(AppRef).findPlugin(ThemePlugin)!.getIcons()
  )[0];

  return html`
    <style>
      oryx-icon {
        border: solid 1px var(--oryx-color-ink);
      }
    </style>
    <h1>Icon size by attribute</h1>
    <div class="icon-set">
      <oryx-icon type=${icon} size="large"></oryx-icon>
      <oryx-icon type=${icon} size="medium"></oryx-icon>
      <oryx-icon type=${icon} size="small"></oryx-icon>
    </div>

    <h1>Icon size by global custom properties</h1>
    <div class="icon-set" style="--oryx-icon-size: 156px">
      <oryx-icon type=${icon}></oryx-icon>
      <oryx-icon type=${icon}></oryx-icon>
      <oryx-icon type=${icon}></oryx-icon>
    </div>

    <div class="icon-set" style="--oryx-icon-size:30px">
      ${Array.from(Array(24)).map(
        () => html`<oryx-icon type=${icon}></oryx-icon>`
      )}
    </div>

    <h1>Icon size by local custom properties</h1>

    <div class="icon-set" style="--oryx-icon-size:20px">
      ${Array.from(Array(5)).map(
        (i, n) =>
          html`<oryx-icon
            type=${icon}
            style=${`--oryx-icon-size:${(n + 1) * 10}px`}
          ></oryx-icon>`
      )}
    </div>

    <h1>Custom size</h1>

    <div class="icon-set" style="--oryx-icon-size:50px">
      <oryx-icon type=${icon}></oryx-icon>
    </div>

    <style>
      div.icon-set {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        width: 500px;
        padding-bottom: 10px;
      }
    </style>
  `;
};

export const Sizes = Template.bind({});