import { CartService } from '@spryker-oryx/cart';
import {
  Address,
  CheckoutDataService,
  CheckoutOrchestrationService,
  CheckoutService,
  ContactDetails,
  DefaultCheckoutService,
  PaymentMethod,
  Shipment,
  Validity,
} from '@spryker-oryx/checkout';
import { StorageService, StorageType } from '@spryker-oryx/core';
import { createInjector, destroyInjector, Injector } from '@spryker-oryx/di';
import { orderStorageKey } from '@spryker-oryx/order';
import { mockOrderData } from '@spryker-oryx/order/mocks';
import { RouterService } from '@spryker-oryx/router';
import { SemanticLinkService } from '@spryker-oryx/site';
import { firstValueFrom, of } from 'rxjs';
import { describe } from 'vitest';
import { CheckoutResponse } from '../models';
import { CheckoutAdapter } from './adapter';

class MockCheckoutOrchestrationService
  implements Partial<CheckoutOrchestrationService>
{
  getValidity = vi.fn().mockReturnValue(of([]));
  submit = vi.fn().mockReturnValue(of([]));
}

class MockCheckoutDataService implements Partial<CheckoutDataService> {
  isGuestCheckout = vi.fn().mockReturnValue(of(false));
  getCustomer = vi.fn().mockReturnValue(of({} as ContactDetails));
  getAddress = vi.fn().mockReturnValue(of({} as Address));
  getShipment = vi.fn().mockReturnValue(of({} as Shipment));
  getPayment = vi.fn().mockReturnValue(of({} as PaymentMethod));
  reset = vi.fn();
}

const mockCheckoutResponse = {
  orderReference: 'test',
  orders: [mockOrderData],
};

class MockCheckoutAdapter implements Partial<CheckoutAdapter> {
  placeOrder = vi.fn().mockReturnValue(of(mockCheckoutResponse));
}

class MockCartService implements Partial<CartService> {
  getCart = vi.fn().mockReturnValue(of({}));
  load = vi.fn().mockReturnValue(of({}));
}

const mockSanitizedResponse = {
  orderReference: 'test',
  orders: [{ ...mockOrderData, shippingAddress: {}, billingAddress: {} }],
};

class MockStorageService implements Partial<StorageService> {
  get = vi.fn().mockReturnValue(of(mockSanitizedResponse));
  set = vi.fn().mockReturnValue(of(undefined));
}

class MockSemanticLinkService implements Partial<SemanticLinkService> {
  get = vi.fn().mockReturnValue(of('order/test'));
}

class MockRouterService implements Partial<RouterService> {
  navigate = vi.fn();
}

describe('DefaultCheckoutService', () => {
  let injector: Injector;
  const service = () => injector.inject(CheckoutService);

  beforeEach(() => {
    injector = createInjector({
      providers: [
        {
          provide: CheckoutOrchestrationService,
          useClass: MockCheckoutOrchestrationService,
        },
        {
          provide: CheckoutDataService,
          useClass: MockCheckoutDataService,
        },
        {
          provide: CheckoutAdapter,
          useClass: MockCheckoutAdapter,
        },
        {
          provide: CartService,
          useClass: MockCartService,
        },
        {
          provide: SemanticLinkService,
          useClass: MockSemanticLinkService,
        },
        {
          provide: RouterService,
          useClass: MockRouterService,
        },
        {
          provide: CheckoutService,
          useClass: DefaultCheckoutService,
        },
        {
          provide: StorageService,
          useClass: MockStorageService,
        },
      ],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    destroyInjector();
  });

  it('should be provided', () => {
    expect(service()).toBeInstanceOf(DefaultCheckoutService);
  });

  describe('when canCheckout is called', () => {
    describe('and when canCheckout is valid', () => {
      beforeEach(() => {
        (
          injector.inject(
            CheckoutOrchestrationService
          ) as unknown as MockCheckoutOrchestrationService
        ).getValidity.mockReturnValue(of([{ validity: Validity.Valid }]));
      });

      it('should return true', async () => {
        expect(await firstValueFrom(service().canCheckout())).toBe(true);
      });
    });

    describe('and when checkout data is not valid', () => {
      beforeEach(() => {
        (
          injector.inject(
            CheckoutOrchestrationService
          ) as unknown as MockCheckoutOrchestrationService
        ).getValidity.mockReturnValue(of([{ validity: Validity.Invalid }]));
      });

      it('should return false', async () => {
        expect(await firstValueFrom(service().canCheckout())).toBe(false);
      });
    });
  });

  describe('when placeOrder is called', () => {
    let result: CheckoutResponse;
    beforeEach(async () => {
      result = await firstValueFrom(service().placeOrder());
    });
    it('should submit the checkout data to the adapter', () => {
      expect(injector.inject(CheckoutAdapter).placeOrder).toHaveBeenCalled();
    });

    it('should return checkout response', () => {
      expect(result).toEqual(mockCheckoutResponse);
    });

    it('should redirect to order page', () => {
      expect(injector.inject(RouterService).navigate).toHaveBeenCalledWith(
        'order/test'
      );
    });

    it('should store the placed order', () => {
      expect(injector.inject(StorageService).set).toHaveBeenCalledWith(
        orderStorageKey,
        mockSanitizedResponse,
        StorageType.SESSION
      );
    });
  });

  describe('when getLastOrder is called', () => {
    let result: CheckoutResponse | null;
    beforeEach(async () => {
      result = await firstValueFrom(service().getLastOrder());
    });
    it('should return previous order details', () => {
      expect(result).toEqual(mockSanitizedResponse);
    });
    it('should call storage get', () => {
      expect(injector.inject(StorageService).get).toHaveBeenCalledWith(
        orderStorageKey,
        StorageType.SESSION
      );
    });
  });
});
