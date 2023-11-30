import { ExperienceComponent } from '@spryker-oryx/experience';
import { pages } from './types';

export const accountNavigation: ExperienceComponent = {
  type: 'oryx-composition',
  id: 'accountNavigation',

  options: {
    rules: [
      {
        layout: {
          type: 'navigation',
          vertical: true,
        },
        gap: '0px',
      },
    ],
  },

  components: pages.map((page) => ({
    type: 'oryx-content-link',
    content: { data: { text: page.type } },
    options: {
      id: page.type,
      type: page.route,
      icon: page.icon,
    },
  })),
};

// export const myAccountNavigation: ExperienceComponent = {
//   type: 'oryx-composition',
//   id: 'myAccountNavigation',
//   components: [
//     {
//       type: 'oryx-content-link',
//       content: { data: { text: i18n('my-account.navigation.overview') } },
//       options: {
//         type: RouteType.AccountOverviewPage,
//         id: 'overview',
//         icon: IconTypes.User,
//       },
//     },
//     {
//       type: 'oryx-content-link',
//       content: { data: { text: i18n('my-account.navigation.profile') } },
//       options: {
//         type: RouteType.AccountProfilePage,
//         id: 'profile',
//         icon: 'badge',
//       },
//     },
//     {
//       type: 'oryx-content-link',
//       content: { data: { text: i18n('my-account.navigation.consent') } },
//       options: {
//         url: '/my-account/consent',
//         icon: 'shield_locked',
//       },
//     },
//     {
//       type: 'oryx-content-link',
//       content: { data: { text: i18n('my-account.navigation.addresses') } },
//       options: {
//         url: '/my-account/addresses',
//         icon: IconTypes.Location,
//       },
//     },
//     {
//       type: 'oryx-content-link',
//       content: { data: { text: i18n('my-account.navigation.order-history') } },
//       options: {
//         type: RouteType.AccountOrdersPage,
//         id: 'orders',
//         icon: IconTypes.History,
//       },
//     },
//     {
//       type: 'oryx-content-link',
//       content: { data: { text: i18n('my-account.navigation.carts') } },
//       options: {
//         url: '/my-account/wishlist',
//         icon: IconTypes.Cart,
//       },
//     },
//     {
//       type: 'oryx-content-link',
//       content: { data: { text: i18n('my-account.navigation.wishlist') } },
//       options: {
//         url: '/my-account/wishlist',
//         icon: IconTypes.Wishlist,
//       },
//     },
//   ],
//   options: {
//     rules: [
//       {
//         layout: {
//           type: 'navigation',
//           vertical: true,
//         },
//         gap: '0px',
//       },
//     ],
//   },
// };