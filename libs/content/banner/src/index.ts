import { BannerComponent } from './banner.component';
export * from './banner.component';
export * from './banner.model';
export * from './banner.styles';

customElements.get('oryx-banner') ||
  customElements.define('oryx-banner', BannerComponent);
