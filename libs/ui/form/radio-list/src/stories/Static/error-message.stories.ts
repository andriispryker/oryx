import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import '../../index';

export default { title: `${storybookPrefix}/Form/Radio List/Static` } as Meta;

const Template: Story = (): TemplateResult =>
  html`
    <oryx-radio-list
      heading="Title"
      errorMessage="Error validation text"
      direction="vertical"
    >
      <oryx-radio>
        <input name="radio" type="radio" />
        Option
      </oryx-radio>

      <oryx-radio>
        <input name="radio" type="radio" />
        Option
      </oryx-radio>

      <oryx-radio>
        <input name="radio" type="radio" />
        Option
      </oryx-radio>

      <oryx-radio>
        <input name="radio" type="radio" />
        Option
      </oryx-radio>
    </oryx-radio-list>
  `;
export const ErrorMessage = Template.bind({});