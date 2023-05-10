import { LazyLoadable } from '@spryker-oryx/core/utilities';
import {
  Breakpoints,
  CssMediaQueries,
  CssStyles,
  CssStylesWithMedia,
} from '@spryker-oryx/utilities';
import { CSSResult } from 'lit';
import { Color } from '../../color/color.model';

declare module '@spryker-oryx/core' {
  interface ComponentMap {
    themes?: (ThemeStyles | ThemeStylesheets)[] | null;
  }

  interface ComponentDef {
    readonly stylesheets?: ComponentTheme[];
  }
}

export const enum ThemeStrategies {
  Replace = 'replace',
  ReplaceAll = 'replace-all',
}

export type ThemeStylesCollection =
  | Exclude<CssStyles, CSSResult[]>
  | CssStylesWithMedia;

export type ThemeStylesheets = CssStyles | ThemeStylesCollection[];

export interface ThemeStyles {
  styles: ThemeStylesheets;
  strategy?: ThemeStrategies;
}

export interface ComponentTheme {
  theme?: string;
  rules: LazyLoadable<ThemeStyles | ThemeStylesheets>;
}

// TODO: remove any when old tokens will be replaced
export type ColorDesignTokens = Record<string, Color | any>;

export interface ThemeToken {
  [key: string]: ThemeToken | string;
}

export type DesignToken = ThemeToken & {
  media?: CssMediaQueries;
  color?: ColorDesignTokens;
};

export type ThemeDesignTokens = LazyLoadable<DesignToken[]>;

export interface Theme {
  name: string;
  breakpoints?: Breakpoints;
  designTokens?: ThemeDesignTokens;
}