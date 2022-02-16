import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../constant';
import '../index';
import {
  ClearIconAppearance,
  ClearIconPosition,
  SearchIconPosition,
} from '../index';

export default {
  title: `${storybookPrefix}/Search/SearchBox`,
} as Meta;

type Props = {
  searchIcon: string;
  clearIcon: string;
  searchIconPosition: SearchIconPosition;
  clearIconPosition: ClearIconPosition;
  clearIconAppearance: ClearIconAppearance;
  styleClasses: string;
};

const Template: Story<Props> = ({
  styleClasses,
  ...options
}: Props): TemplateResult => {
  return html`
    <div style="width:300px">
      <oryx-search label="search" .options=${options} class=${styleClasses}>
        <input placeholder="Search..." />
      </oryx-search>
    </div>
  `;
};
export const CustomIcon = Template.bind({});
CustomIcon.argTypes = {
  searchIcon: {
    control: { type: 'text' },
    defaultValue: 'close',
  },
  clearIcon: {
    control: { type: 'text' },
    defaultValue: 'remove',
  },
  searchIconPosition: {
    options: ['PREFIX', 'SUFFIX', 'NONE'],
    control: { type: 'select' },
    defaultValue: 'PREFIX',
  },
  clearIconPosition: {
    options: ['AFTER', 'SUFFIX', 'NONE'],
    control: { type: 'select' },
    defaultValue: 'AFTER',
  },
  clearIconAppearance: {
    options: ['HOVER', 'TOGGLE', 'SHOW'],
    control: { type: 'select' },
    defaultValue: 'SHOW',
  },
  styleClasses: {
    control: { type: 'text' },
    defaultValue: 'suffix-fill',
  },
};
