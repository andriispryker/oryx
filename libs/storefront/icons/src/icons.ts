export { rocket } from '@spryker-oryx/ui/icons';
import { Icon } from '@spryker-oryx/ui/icon';
import { svg } from 'lit';
import { StorefrontIconTypes } from './icon.types';

const chevron = svg`<path d="M17.3954 7.47054L12.001 13.133L6.60521 7.46974C6.00932 6.84342 5.04338 6.84342 4.44749 7.46974C3.85084 8.09525 3.85084 9.1084 4.44749 9.73472L10.9214 16.5305C11.5173 17.156 12.4825 17.1568 13.0792 16.5313L19.5531 9.73552C20.149 9.1092 20.149 8.09605 19.5531 7.46974C18.9572 6.84422 17.9912 6.84502 17.3954 7.47054Z" />`;

export const dropdown: Icon = {
  type: StorefrontIconTypes.Dropdown,
  source: svg`<g style="transform-origin: center;transform: rotate(90deg)">${chevron}</g>`,
};

export const cart: Icon = {
  type: StorefrontIconTypes.Cart,
  source: svg`<path d="M17.3333 18.3851C18.0693 18.3851 18.6667 18.971 18.6667 19.6929C18.6667 20.4148 18.0693 21 17.3333 21C16.5973 21 16 20.4148 16 19.6929C16 18.971 16.5973 18.3851 17.3333 18.3851ZM10 18.3851C10.736 18.3851 11.3333 18.971 11.3333 19.6929C11.3333 20.4148 10.736 21 10 21C9.264 21 8.66667 20.4148 8.66667 19.6929C8.66667 18.971 9.264 18.3851 10 18.3851ZM22 6.61559L18.7693 17.091L18.69 17.0707L18.6873 17.0779H8.66667L4.85133 5.30779H2V4H5.68733L9.55533 15.7688H17.836L20.1953 7.92272H8.41667L8 6.61559H21.3333H22Z" />`,
};

export const cart_add: Icon = {
  type: StorefrontIconTypes.Add,
  source: svg`<path d="M17.3333 18.3845C18.0693 18.3845 18.6667 18.9704 18.6667 19.6929C18.6667 20.4148 18.0693 21 17.3333 21C16.5973 21 16 20.4148 16 19.6929C16 18.9704 16.5973 18.3845 17.3333 18.3845ZM10 18.3845C10.736 18.3845 11.3333 18.9704 11.3333 19.6929C11.3333 20.4148 10.736 21 10 21C9.264 21 8.66667 20.4148 8.66667 19.6929C8.66667 18.9704 9.264 18.3845 10 18.3845ZM18.7693 17.0905L18.69 17.0702L18.6873 17.0774H8.66667L4.852 5.30774H2V4H5.68733L9.55533 15.769H17.836L20.1953 7.92388H8.52067L8 6.61614H21.3333H22L18.7693 17.0905ZM13.3333 14.4626V12.501H11.3333V11.1932H13.3333V9.23162H14.6667V11.1932H16.6667V12.501H14.6667V14.4626H13.3333Z" />`,
};

export const add: Icon = {
  type: StorefrontIconTypes.Increase,
  source: svg`<path d="M3 9.82879H9.74556V3H14.2899V9.82879H21V14.1712H14.2899V21H9.74556V14.1712H3V9.82879Z" />`,
};

export const minus: Icon = {
  type: StorefrontIconTypes.Decrease,
  source: svg`<path d="M3 10H9.74556H14.2899H21V14H14.2899H9.74556H3V10Z" />`,
};

export const search: Icon = {
  type: StorefrontIconTypes.Search,
  source: svg`<path d="M16.7485 15.2635L21.6724 20.212V20.1945C21.9562 20.4628 22.0664 20.859 21.9603 21.2287C21.8541 21.5983 21.5484 21.8829 21.1621 21.9715C20.7759 22.0601 20.3704 21.9386 20.1038 21.6545L15.1436 16.6849C13.7435 17.6394 12.071 18.1497 10.3577 18.1449C6.44091 18.1472 3.04866 15.5184 2.19948 11.8228C1.3503 8.12723 3.27235 4.35772 6.82191 2.75737C10.3715 1.15701 14.5948 2.15578 16.9789 5.15935C19.363 8.16291 19.2672 12.3643 16.7485 15.2635ZM16.5307 10.0727C16.5307 6.7776 13.7669 4.10637 10.3577 4.10637C6.9484 4.10637 4.18465 6.7776 4.18465 10.0727C4.18465 13.3679 6.9484 16.0391 10.3577 16.0391C13.7669 16.0391 16.5307 13.3679 16.5307 10.0727Z" />`,
};

export const close: Icon = {
  type: StorefrontIconTypes.Close,
  source: svg`<path d="M20.3,3.8c-1-1-2.5-1-3.5,0L12,8.6L7.2,3.8c-1-1-2.5-1-3.5,0s-1,2.5,0,3.4L8.5,12l-4.8,4.8c-1,1-1,2.5,0,3.4
  c1,1,2.5,1,3.5,0l4.8-4.8l4.8,4.8c1,1,2.5,1,3.5,0c1-1,1-2.5,0-3.4L15.5,12l4.8-4.8C21.3,6.2,21.3,4.7,20.3,3.8z"/>`,
};