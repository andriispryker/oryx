import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import { OverlaysDecorator } from '../../../../../utilities/storybook';

export default {
  title: `${storybookPrefix}/Overlays/Drawer/Static`,
  decorators: [OverlaysDecorator()],
} as Meta;

const Template: Story = (): TemplateResult => {
  return html`
    <oryx-drawer open>
      <div style="padding:20px">Position start</div>
    </oryx-drawer>
  `;
};

export const PositionStart = Template.bind({});