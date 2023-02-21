import { StaticComponent } from '@spryker-oryx/experience';

export const CartPage: StaticComponent = {
  type: 'Page',
  meta: { title: 'Cart Page', route: '/cart' },
  components: [
    {
      type: 'experience-composition',
      options: {
        data: { rules: [{ layout: 'two-column', container: 'true' }] },
      },
      components: [
        {
          type: 'cart-entries',
          options: {
            data: {
              defaultExpandedOptions: true,
              removeByQuantity: 'showBin',
              silentRemove: true,
              rules: [{ padding: '30px 0' }],
            },
          },
        },
        {
          type: 'experience-composition',
          components: [{ type: 'cart-totals' }, { type: 'checkout-link' }],
          options: {
            data: {
              rules: [
                {
                  sticky: true,
                  top: '78px',
                  maxWidth: true,
                  padding: '30px 0',
                  layout: 'list',
                  gap: '20px',
                },
              ],
            },
          },
        },
      ],
    },
  ],
};