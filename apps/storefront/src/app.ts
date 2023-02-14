import { appBuilder } from '@spryker-oryx/core';
import { labsFeature } from '@spryker-oryx/labs';
import { b2cFeatures, b2cTheme } from '@spryker-oryx/presets';

export const app = appBuilder()
  .withFeature(b2cFeatures)
  .withTheme(b2cTheme)
  .withEnvironment(import.meta.env)
  .withFeature(labsFeature)
  .create();
