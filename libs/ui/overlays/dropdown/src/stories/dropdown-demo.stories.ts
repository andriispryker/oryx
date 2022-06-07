import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { when } from 'lit/directives/when.js';
import { storybookPrefix } from '../../../../.constants';
import '../../../../actions/button';
import { IconTypes } from '../../../../Graphical/icon';
import { Position } from '../../../../utilities';
import '../../../popover/index';
import '../index';
import { renderCustomContent, renderOptions } from './utils';

export default {
  title: `${storybookPrefix}/Overlays/Dropdown`,
  // disables Chromatic's snapshotting on a story level
  parameters: { chromatic: { disableSnapshot: true } },
} as Meta;

interface Props {
  content: 'options' | 'custom';
  position: Position;
  customContent: boolean;
  icon: typeof IconTypes;
  customTrigger: boolean;
}

const Template: Story<Props> = (props: Props): TemplateResult => {
  const isOptions = props.content !== 'custom';

  setTimeout(() => {
    document.querySelector('oryx-dropdown')?.scrollIntoView({
      block: 'center',
      inline: 'center',
    });
  }, 0);

  return html`
    <style>
      .container {
        display: flex;
        width: calc(200vw - 100px);
        padding: 200px 0;
      }

      .wrapper {
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      oryx-dropdown {
        margin: 20px 0;
        --oryx-popover-maxheight: 240px;
      }
    </style>

    <div class="container">
      <div class="wrapper">
        <button>focusable before</button>

        <oryx-dropdown
          position=${props.position}
          @oryx.close=${() => console.log('close')}
        >
          ${when(
            props.icon,
            () => html`<oryx-icon .type=${props.icon} slot="icon"></oryx-icon>`
          )}
          ${when(
            props.customTrigger,
            () => html` <oryx-button slot="trigger">
              <button>trigger</button>
            </oryx-button>`
          )}
          ${when(isOptions, renderOptions, renderCustomContent)}
        </oryx-dropdown>

        <button>focusable after</button>
      </div>
    </div>
  `;
};

export const DropdownDemo = Template.bind({});

DropdownDemo.args = {
  position: Position.END,
  content: 'options',
  customTrigger: false,
};

DropdownDemo.argTypes = {
  content: {
    options: ['options', 'custom'],
    control: { type: 'radio' },
    table: { category: 'Slots' },
  },
  icon: {
    options: Object.values(IconTypes),
    control: { type: 'select' },
    table: { category: 'Slots' },
  },
  customTrigger: {
    control: { type: 'boolean' },
    table: { category: 'Slots' },
  },
  position: {
    control: { type: 'radio' },
    options: Object.values(Position),
    table: { category: 'Properties' },
  },
};