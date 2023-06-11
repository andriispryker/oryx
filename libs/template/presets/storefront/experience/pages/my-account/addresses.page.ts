import { StaticComponent } from '@spryker-oryx/experience';
import { EditTarget } from '@spryker-oryx/user/address-list-item';

export const addressBookPage: StaticComponent = {
  type: 'Page',
  meta: {
    title: 'Address book',
    route: '/my-account/addresses',
  },
  options: {
    data: {
      rules: [
        { layout: 'flex', padding: '30px 0', width: '50%', margin: 'auto' },
      ],
    },
  },
  components: [
    {
      type: 'oryx-user-address-list',
      options: {
        data: {
          editable: true,
          removable: true,
          editTarget: EditTarget.Link,
        },
      },
    },
    {
      type: 'oryx-user-address-add-button',
      options: { data: { target: 'link' } },
    },
  ],
};