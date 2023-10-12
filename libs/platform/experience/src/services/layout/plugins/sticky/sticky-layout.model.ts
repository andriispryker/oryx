import { LayoutPlugin } from '../layout.plugin';

export const StickyLayoutPluginToken = `${LayoutPlugin}sticky`;

declare global {
  export interface PluggableLayoutProperties {
    /**
     * Indicates that the composition will stick on the screen at a certain position. The position
     * defaults to 0px from the top, but can be customised using the styling. For a footer for example
     * the top can be configured to be 100%.
     */
    sticky?: boolean;
  }
}
