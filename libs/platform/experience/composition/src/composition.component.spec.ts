/* eslint-disable @typescript-eslint/no-explicit-any */
import { fixture } from '@open-wc/testing-helpers';
import { SSRAwaiterService } from '@spryker-oryx/core';
import { useComponent } from '@spryker-oryx/core/utilities';
import { createInjector, destroyInjector } from '@spryker-oryx/di';
import {
  Component,
  ComponentsRegistryService,
  ComponentTemplate,
  ExperienceService,
  LayoutBuilder,
  LayoutService,
} from '@spryker-oryx/experience';
import { html, TemplateResult } from 'lit';
import { Observable, of } from 'rxjs';
import { CompositionComponent } from './composition.component';
import { compositionComponent } from './composition.def';

const BASE_COMPONENTS = [
  { id: '1', type: 'oryx-content-banner' },
  { id: '2', type: 'oryx-content-banner' },
  { id: '3', type: 'oryx-content-banner' },
];

class MockExperienceService implements Partial<ExperienceService> {
  components = [...BASE_COMPONENTS];
  getComponent = (): Observable<Component> =>
    of({
      id: '',
      type: '',
      components: this.components,
    });
  getOptions = <T>(): Observable<T> => of({} as T);
  getContent = <T>(): Observable<T> => of({} as T);
}

class MockLayoutBuilder implements Partial<LayoutBuilder> {
  getLayoutClasses = vi.fn();
  getLayoutStyles = vi.fn();
  collectStyles = vi.fn();
  createStylesFromOptions = vi.fn();
}

class MockSSRAwaiter {
  getAwaiter = vi.fn();
}

class MockComponentsRegistryService
  implements Partial<ComponentsRegistryService>
{
  resolveComponent(type: string): Observable<string> {
    return of(type);
  }

  resolveTemplate(data: ComponentTemplate): TemplateResult {
    return html`<oryx-content-banner uid="${data.uid}"></oryx-content-banner>`;
  }
}

class MockLayoutService implements Partial<LayoutService> {
  getStyles = vi.fn().mockReturnValue(of(null));
}

describe('Experience Composition', () => {
  let element: CompositionComponent;

  beforeAll(async () => {
    await useComponent(compositionComponent);
  });

  beforeEach(async () => {
    createInjector({
      providers: [
        {
          provide: LayoutService,
          useClass: MockLayoutService,
        },
        {
          provide: ExperienceService,
          useClass: MockExperienceService,
        },
        {
          provide: ComponentsRegistryService,
          useClass: MockComponentsRegistryService,
        },
        {
          provide: LayoutBuilder,
          useClass: MockLayoutBuilder,
        },
        {
          provide: SSRAwaiterService,
          useClass: MockSSRAwaiter,
        },
      ],
    });

    element = await fixture(
      html`<oryx-composition uid="1"></oryx-composition>`
    );
  });

  afterEach(() => {
    destroyInjector();
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(CompositionComponent);
  });

  it('should render oryx-content-banner', () => {
    const banner = element?.shadowRoot?.querySelector('oryx-content-banner');
    expect(banner).toBeTruthy();
  });

  it('should render components with uid attributes', () => {
    const banner = element?.shadowRoot?.querySelector('oryx-content-banner');

    expect(banner?.getAttribute('uid')).toBe('1');
  });
});