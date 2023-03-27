import { componentDef } from '@spryker-oryx/core';

export const pickingListItemComponent = componentDef({
  name: 'oryx-picking-list-item',
  impl: () =>
    import('./picking-list-item.component').then(
      (m) => m.PickingListItemComponent
    ),
  schema: () =>
    import('./picking-list-item.schema').then(
      (m) => m.pickingListItemComponentSchema
    ),
});