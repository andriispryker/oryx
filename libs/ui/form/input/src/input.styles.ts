import { affixStyles } from './affix';
import { errorStyles } from './error';
import {
  floatingLabelBaseStyles,
  floatingLabelScreenStyles,
  formControlBaseStyles,
  formControlScreenStyles,
} from './form-control';

export const baseStyles = [
  formControlBaseStyles,
  floatingLabelBaseStyles,
  errorStyles,
  affixStyles,
];

export const screenStyles = [
  ...formControlScreenStyles,
  ...floatingLabelScreenStyles,
];
