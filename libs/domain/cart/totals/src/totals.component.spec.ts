import { fixture } from '@open-wc/testing-helpers';
import { CartService } from '@spryker-oryx/cart';
import {
  mockBaseCart,
  mockCartWithDiscount,
  mockCartWithExpense,
  mockCartWithoutDiscountRows,
  mockCartWithTax,
  mockEmptyCart,
} from '@spryker-oryx/cart/mocks';
import { useComponent } from '@spryker-oryx/core/utilities';
import { createInjector, destroyInjector, Injector } from '@spryker-oryx/di';
import { PricingService } from '@spryker-oryx/site';
import { html } from 'lit';
import { of } from 'rxjs';
import { CartTotalsComponent } from './totals.component';
import { cartTotalsComponent } from './totals.def';
import {
  CartTotalsComponentOptions,
  DiscountRowsAppearance,
} from './totals.model';

useComponent([cartTotalsComponent]);

class MockCartService {
  getTotals = vi.fn().mockReturnValue(of(null));
  getCart = vi.fn().mockReturnValue(of(null));
  getEntries = vi.fn().mockReturnValue(of([]));
  isEmpty = vi.fn().mockReturnValue(of(false));
  isBusy = vi.fn().mockReturnValue(of(false));
}

class mockPricingService {
  format = vi.fn().mockReturnValue(of('price'));
}

describe('Cart totals component', () => {
  let element: CartTotalsComponent;

  let service: MockCartService;
  let testInjector: Injector;

  beforeEach(() => {
    testInjector = createInjector({
      providers: [
        {
          provide: CartService,
          useClass: MockCartService,
        },
        {
          provide: PricingService,
          useClass: mockPricingService,
        },
      ],
    });

    service = testInjector.inject(CartService) as unknown as MockCartService;
  });

  afterEach(() => {
    destroyInjector();
    vi.clearAllMocks();
  });

  it('is defined', async () => {
    element = await fixture(html`<oryx-cart-totals></oryx-cart-totals>`);
    expect(element).toBeInstanceOf(CartTotalsComponent);
  });

  it('passes the a11y audit', async () => {
    service.getCart.mockReturnValue(of(mockBaseCart));
    service.getTotals.mockReturnValue(of(mockBaseCart.totals));
    element = await fixture(html`<oryx-cart-totals></oryx-cart-totals>`);

    await expect(element).shadowDom.to.be.accessible();
  });

  describe('when the cart is empty', () => {
    beforeEach(async () => {
      service.getCart.mockReturnValue(of(mockEmptyCart));
      element = await fixture(html`<oryx-cart-totals></oryx-cart-totals>`);
    });

    it('should not render any html', () => {
      const elements = element.renderRoot.querySelectorAll('*:not(style)');
      expect(elements?.length).toBe(0);
    });
  });

  describe('options', () => {
    const renderCartTotals = (
      options: CartTotalsComponentOptions = {}
    ): void => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-cart-totals .options=${options}></oryx-cart-totals>`
        );
      });
    };

    beforeEach(() => {
      service.getCart.mockReturnValue(of(mockBaseCart));
      service.getEntries.mockReturnValue(of(mockBaseCart.products));
      service.getTotals.mockReturnValue(of(mockBaseCart.totals));
    });

    describe('subtotal', () => {
      describe('when enableSubtotal is not set', () => {
        renderCartTotals();
        it('should render the subtotal by default', () => {
          expect(element).toContainElement('.subtotal');
        });
      });

      describe('when enableSubtotal is true', () => {
        renderCartTotals({ enableSubtotal: true });
        it('should render the subtotal', () => {
          expect(element).toContainElement('.subtotal');
        });
      });

      describe('when enableSubtotal is false', () => {
        renderCartTotals({ enableSubtotal: false });
        it('should not render the subtotal', () => {
          expect(element).not.toContainElement('.subtotal');
        });
      });
    });

    describe('discount', () => {
      describe('when there is no discount', () => {
        beforeEach(() => {
          service.getCart.mockReturnValue(of(mockBaseCart));
          service.getEntries.mockReturnValue(of(mockBaseCart.products));
          service.getTotals.mockReturnValue(of(mockBaseCart.totals));
        });

        renderCartTotals();

        it('should not render the discount', () => {
          expect(element).not.toContainElement('.discount');
        });
      });

      describe('when there are no discount rows', () => {
        beforeEach(() => {
          service.getCart.mockReturnValue(of(mockCartWithoutDiscountRows));
          service.getEntries.mockReturnValue(
            of(mockCartWithoutDiscountRows.products)
          );
          service.getTotals.mockReturnValue(
            of(mockCartWithoutDiscountRows.totals)
          );
        });

        renderCartTotals();

        it('should render the discounts by default', () => {
          expect(element).toContainElement('.discounts');
        });

        it('should not render discounts rows', () => {
          expect(element).not.toContainElement('ul.discounts');
        });
      });

      describe('when there are discounts', () => {
        beforeEach(() => {
          service.getCart.mockReturnValue(of(mockCartWithDiscount));
          service.getEntries.mockReturnValue(of(mockCartWithDiscount.products));
          service.getTotals.mockReturnValue(of(mockCartWithDiscount.totals));
        });

        describe('enableDiscounts', () => {
          describe('when enableDiscounts is not set', () => {
            renderCartTotals();
            it('should render the discounts by default', () => {
              expect(element).toContainElement('.discounts');
            });
          });

          describe('when enableDiscounts is true', () => {
            renderCartTotals({ enableDiscounts: true });
            it('should render the discounts', () => {
              expect(element).toContainElement('.discounts');
            });
          });

          describe('when enableDiscounts is false', () => {
            renderCartTotals({ enableDiscounts: false });
            it('should render the discounts', () => {
              expect(element).not.toContainElement('.discounts');
            });
          });
        });

        describe('discountRowsAppearance', () => {
          describe('when discountRowsAppearance is not set', () => {
            renderCartTotals();

            it('should expand the discounts by default', () => {
              expect(element).toContainElement('oryx-collapsible[open]');
            });
          });

          describe('when discountRowsAppearance is None', () => {
            renderCartTotals({
              discountRowsAppearance: DiscountRowsAppearance.None,
            });

            it('should not render discounts rows', () => {
              expect(element).not.toContainElement('ul.discounts');
            });
          });

          describe('when discountRowsAppearance is Inline', () => {
            renderCartTotals({
              discountRowsAppearance: DiscountRowsAppearance.Inline,
            });

            it('should render discounts rows', () => {
              expect(element).toContainElement('ul.discounts');
            });
          });

          describe('when discountRowsAppearance is Collapsed', () => {
            renderCartTotals({
              discountRowsAppearance: DiscountRowsAppearance.Collapsed,
            });

            it('should collapse discounts rows', () => {
              expect(element).toContainElement('oryx-collapsible:not([open])');
            });

            it('should render discounts rows', () => {
              expect(element).toContainElement('ul.discounts');
            });
          });

          describe('when discountRowsAppearance is Expanded', () => {
            renderCartTotals({
              discountRowsAppearance: DiscountRowsAppearance.Expanded,
            });

            it('should expand discounts rows', () => {
              expect(element).toContainElement('oryx-collapsible[open]');
            });

            it('should render discounts rows', () => {
              expect(element).toContainElement('ul.discounts');
            });
          });
        });
      });
    });

    describe('expense', () => {
      describe('when there is no expense value', () => {
        beforeEach(() => {
          service.getCart.mockReturnValue(of(mockBaseCart));
          service.getEntries.mockReturnValue(of(mockBaseCart.products));
          service.getTotals.mockReturnValue(of(mockBaseCart.totals));
        });

        renderCartTotals();

        it('should not render the expense', () => {
          expect(element).not.toContainElement('.expense');
        });
      });

      describe('when there is expense value', () => {
        beforeEach(() => {
          service.getCart.mockReturnValue(of(mockCartWithExpense));
          service.getTotals.mockReturnValue(of(mockCartWithExpense.totals));
        });

        renderCartTotals();

        describe('when enableExpense is not set', () => {
          it('should render the expense by default', () => {
            expect(element).toContainElement('.expense');
          });
        });

        describe('when enableExpense is false', () => {
          renderCartTotals({ enableExpense: false });
          it('should render the expense', () => {
            expect(element).not.toContainElement('.expense');
          });
        });

        describe('when enableExpense is true', () => {
          renderCartTotals({ enableExpense: true });
          it('should not render the expense', () => {
            expect(element).toContainElement('.expense');
          });
        });
      });
    });

    describe('tax', () => {
      describe('when there is no tax value', () => {
        beforeEach(() => {
          service.getCart.mockReturnValue(of(mockBaseCart));
          service.getEntries.mockReturnValue(of(mockBaseCart.products));
          service.getTotals.mockReturnValue(of(mockBaseCart.totals));
        });

        renderCartTotals();

        it('should not render the tax amount', () => {
          expect(element).not.toContainElement('.tax');
        });
      });

      describe('when there is tax value', () => {
        beforeEach(() => {
          service.getCart.mockReturnValue(of(mockCartWithTax));
          service.getEntries.mockReturnValue(of(mockCartWithTax.products));
          service.getTotals.mockReturnValue(of(mockCartWithTax.totals));
        });

        renderCartTotals();

        describe('and enableTaxAmount is not set', () => {
          it('should render the tax amount by default', () => {
            expect(element).toContainElement('.tax');
          });
        });

        describe('and enableTaxAmount is true', () => {
          renderCartTotals({ enableTaxAmount: true });
          it('should render the tax amount', () => {
            expect(element).toContainElement('.tax');
          });
        });

        describe('and enableTaxAmount is false', () => {
          renderCartTotals({ enableTaxAmount: false });
          it('should not render the tax amount', () => {
            expect(element).not.toContainElement('.tax');
          });
        });

        describe('and enableTaxMessage is not set', () => {
          renderCartTotals();
          it('should render the tax message by default', () => {
            expect(element).toContainElement('.tax-message');
          });
        });

        describe('and enableTaxMessage is true', () => {
          renderCartTotals({ enableTaxMessage: true });
          it('should render the tax message', () => {
            expect(element).toContainElement('.tax-message');
          });
        });

        describe('and enableTaxMessage is false', () => {
          renderCartTotals({ enableTaxMessage: false });
          it('should not render the tax message', () => {
            expect(element).not.toContainElement('.tax-message');
          });
        });
      });
    });

    describe('delivery', () => {
      describe('when enableDelivery is not set', () => {
        renderCartTotals();
        it('should render the delivery by default', () => {
          expect(element).toContainElement('.delivery');
        });
      });

      describe('when enableDelivery is true', () => {
        renderCartTotals({ enableDelivery: true });
        it('should not render the delivery', () => {
          expect(element).toContainElement('.delivery');
        });
      });

      describe('when enableDelivery is false', () => {
        renderCartTotals({ enableDelivery: false });
        it('should render the delivery', () => {
          expect(element).not.toContainElement('.delivery');
        });
      });
    });

    describe('summary', () => {
      renderCartTotals();
      it('should render the summary', () => {
        expect(element).toContainElement('.summary');
      });
    });
  });
});
