import { fixture } from '@open-wc/testing-helpers';
import {
  createInjector,
  destroyInjector,
  resolve,
} from '@spryker-oryx/injector';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ContextService } from './context.service';
import { DefaultContextService } from './default-context.service';

const mockKey = 'mockKey';
const mockObject = {
  name: 'name',
  value: 'value',
};

@customElement('overlay-parent-context')
export class OverlayParentContext extends LitElement {
  context = resolve(this, ContextService);

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

@customElement('shadow-parent-context')
export class ShadowParentContext extends LitElement {
  context = resolve(this, ContextService);

  protected override render(): TemplateResult {
    return html`<test-child-context></test-child-context>`;
  }
}

@customElement('test-child-context')
export class TestChildContext extends LitElement {
  context = resolve(this, ContextService);
}

describe('ContextService', () => {
  let element: OverlayParentContext;

  beforeEach(async () => {
    createInjector({
      providers: [
        {
          provide: ContextService,
          useClass: DefaultContextService,
        },
      ],
    });
  });

  afterEach(() => {
    destroyInjector();
  });

  const testChildContext = (shadow = false): TestChildContext => {
    const currentElement = shadow ? element.shadowRoot : element;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return currentElement!.querySelector(
      'test-child-context'
    ) as TestChildContext;
  };

  describe('imperative', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <overlay-parent-context>
          <test-child-context></test-child-context>
        </overlay-parent-context>
      `);
    });

    it('should add data attribute with stringified value', () => {
      element.context.provide(element, mockKey, mockObject);

      expect(element.getAttribute(`data-${mockKey}`)).toBe(
        JSON.stringify(mockObject)
      );
    });

    it('should get context from the parent element by key', () => {
      const mockCallback = vi.fn();

      element.context.provide(element, mockKey, mockObject);
      testChildContext()
        .context.get(testChildContext(), mockKey)
        .subscribe(mockCallback);

      expect(mockCallback).toHaveBeenCalledWith(mockObject);
    });

    it('should be reactive', () => {
      const mockCallback = vi.fn();
      const mockReactive = 'mockReactive';

      element.context.provide(element, mockKey, mockObject);
      testChildContext()
        .context.get(testChildContext(), mockKey)
        .subscribe(mockCallback);

      element.context.provide(element, mockKey, mockReactive);

      expect(mockCallback).toHaveBeenNthCalledWith(1, mockObject);
      expect(mockCallback).toHaveBeenNthCalledWith(2, mockReactive);
    });

    it('should emit value if providing happened after subscribing', () => {
      const mockCallback = vi.fn();

      testChildContext()
        .context.get(testChildContext(), mockKey)
        .subscribe(mockCallback);

      element.context.provide(element, mockKey, mockObject);

      expect(mockCallback).toHaveBeenNthCalledWith(1, undefined);
      expect(mockCallback).toHaveBeenNthCalledWith(2, mockObject);
    });

    it('should remove attribute and emit undefined', () => {
      const mockCallback = vi.fn();

      element.context.provide(element, mockKey, mockObject);

      testChildContext()
        .context.get(testChildContext(), mockKey)
        .subscribe(mockCallback);

      expect(element.hasAttribute(`data-${mockKey}`)).toBe(true);

      element.context.remove(element, mockKey);

      expect(element.hasAttribute(`data-${mockKey}`)).toBe(false);
      expect(mockCallback).toHaveBeenCalledWith(undefined);
    });
  });

  describe('declarative', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <overlay-parent-context data-mockKey=${JSON.stringify(mockObject)}>
          <test-child-context></test-child-context>
        </overlay-parent-context>
      `);
    });

    it('should get context from the parent element by key', () => {
      const mockCallback = vi.fn();

      testChildContext()
        .context.get(testChildContext(), mockKey)
        .subscribe(mockCallback);

      expect(mockCallback).toHaveBeenCalledWith(mockObject);
    });
  });

  describe('with ShadowDom', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<shadow-parent-context></shadow-parent-context>`
      );
    });

    it('should get context from the parent element by key', () => {
      const mockCallback = vi.fn();

      element.context.provide(element, mockKey, mockObject);

      testChildContext(true)
        .context.get(testChildContext(true), mockKey)
        .subscribe(mockCallback);

      expect(mockCallback).toHaveBeenCalledWith(mockObject);
    });
  });
});
