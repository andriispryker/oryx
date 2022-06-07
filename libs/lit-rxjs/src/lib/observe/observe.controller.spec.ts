import { fixture } from '@open-wc/testing-helpers';
import {
  html,
  LitElement,
  ReactiveController,
  ReactiveControllerHost,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BehaviorSubject } from 'rxjs';
import { ObserveController } from './observe.controller';

@customElement('mock-component')
class MockComponent extends LitElement {
  @property()
  mockA = 'mockA';

  @property()
  mockB = 'mockB';

  controller = new MockController(this);
}

class MockController<K extends ReactiveControllerHost>
  implements ReactiveController
{
  observeController = new ObserveController(this.host);

  constructor(public host: K) {
    (this.host = host).addController(this);
  }

  hostConnected(): void {
    ///
  }
}

describe('ObserveController', () => {
  let element: MockComponent;

  beforeEach(async () => {
    element = await fixture(html`<mock-component></mock-component>`);
  });

  describe('get', () => {
    it('should return BehaviorSubject', () => {
      const { observeController } = element.controller;
      const subject$ = observeController.get('mockA');
      expect(subject$).toBeInstanceOf(BehaviorSubject);
    });

    it('should reuse created instance if it has been already created', () => {
      const { observeController } = element.controller;
      const subjectFirstA$ = observeController.get('mockA');
      const subjectSecondA$ = observeController.get('mockA');
      const subjectB$ = observeController.get('mockB');
      expect(subjectFirstA$).toEqual(subjectSecondA$);
      expect(subjectFirstA$).not.toEqual(subjectB$);
    });

    it('should emit property value', () => {
      const { observeController } = element.controller;
      const callback = vi.fn();
      const subjectA$ = observeController.get('mockA');
      subjectA$.subscribe(callback);
      expect(callback).toHaveBeenCalledWith(element.mockA);
    });

    it('should reemit if property value has been changed', async () => {
      const { observeController } = element.controller;
      const callback = vi.fn();
      const subjectA$ = observeController.get('mockA');
      subjectA$.subscribe(callback);
      expect(callback).toHaveBeenNthCalledWith(1, element.mockA);
      element.mockA = 'updateMockA';
      element.requestUpdate();
      await element.updateComplete;
      expect(callback).toHaveBeenNthCalledWith(2, element.mockA);
    });
  });
});