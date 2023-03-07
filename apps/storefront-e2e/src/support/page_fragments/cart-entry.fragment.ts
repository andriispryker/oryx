import { QuantityInputFragment } from './quantity-input.fragment';

export class CartEntryFragment {
  private wrapper: HTMLElement;

  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper;
  }

  getWrapper = () => cy.wrap(this.wrapper);
  getTitle = () => this.getWrapper().find('oryx-product-title').shadow();
  getActiveImage = () =>
    this.getWrapper().find('oryx-product-media').find('img');
  getDefaultImage = () =>
    this.getWrapper().find('oryx-product-media').find('oryx-icon');
  getSKU = () => this.getWrapper().find('oryx-product-id').shadow();
  getPrice = () =>
    this.getWrapper()
      .find('.col cart-entry-price')
      .eq(0)
      .find('[part="price"]');
  getSubtotal = () =>
    this.getWrapper()
      .find('.col cart-entry-price')
      .eq(1)
      .find('[part="price"]');
  getTotalPrice = () =>
    this.getWrapper().find('cart-entry-totals').find('[part="price"]');
  getRemoveBtn = () => this.getWrapper().find('[aria-label="remove"]');
  getConfirmRemoveBtn = () => this.getWrapper().contains('Delete product(s)');
  getQuantityInput = () =>
    new QuantityInputFragment(
      this.getWrapper().find('oryx-cart-quantity-input')
    );

  remove = () => this.getRemoveBtn().click();
}