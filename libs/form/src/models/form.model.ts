export interface ComponentTypeDataFields {
  id: string;
  type: string;
  title?: string;
  label?: string;
  required?: boolean;
  options?: FormFieldOption[];
  attributes?: { [key: string]: string | number };
  max?: number;
  min?: number;
  /**
   * Indicates the width of the field editor, either 50 or 100.
   *
   * @default 50
   */
  width?: 50 | 100;

  disabled?: boolean;
}

export interface FormFieldOption {
  value: string;
  text?: string;
  icon?: string;
}

export enum FormFieldType {
  TOGGLE_BUTTON = 'toggle-button',
  TOGGLE_ICON = 'toggle-icon',
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  PHONE = 'tel',
  TOGGLE = 'toggle',
  SELECT = 'select',
  BOOLEAN = 'boolean',
  TEXTAREA = 'textarea',
  COLOR = 'color',
}