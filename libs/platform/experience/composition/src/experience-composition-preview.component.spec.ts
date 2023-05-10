/* eslint-disable @typescript-eslint/no-explicit-any */
import { fixture } from '@open-wc/testing-helpers';
import { SSRAwaiterService } from '@spryker-oryx/core';
import { useComponent } from '@spryker-oryx/core/utilities';
import { createInjector, destroyInjector } from '@spryker-oryx/di';
import {
  Component,
  ComponentsRegistryService,
  ExperienceService,
  LayoutBuilder,
} from '@spryker-oryx/experience';
import { html, TemplateResult } from 'lit';
import { Observable, of } from 'rxjs';
import { experiencePreviewCompositionComponent } from './composition.def';
import { ExperienceCompositionPreviewComponent } from './experience-composition-preview.component';

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
  getOptions = (): Observable<any> => of({});
  getContent = (): Observable<any> => of({});
  getInteractionData = (): Observable<any> => of({});
}

class MockLayoutBuilder implements Partial<LayoutBuilder> {
  getLayoutClasses = (): string => '';
  getLayoutStyles = (): string => '';
  collectStyles = (): string => '';
}

class MockSSRAwaiter {
  getAwaiter(key: string): any {
    return () => {
      //do nothing
    };
  }
}

class MockComponentsRegistryService
  implements Partial<ComponentsRegistryService>
{
  resolveComponent(type: string): Observable<string> {
    return of(type);
  }

  resolveTemplate(type: string, uid: string): TemplateResult {
    return html`<oryx-content-banner uid="${uid}"></oryx-content-banner>`;
  }
}

describe('Experience Composition', () => {
  let element: ExperienceCompositionPreviewComponent;

  beforeAll(async () => {
    await useComponent(experiencePreviewCompositionComponent);
  });

  beforeEach(async () => {
    createInjector({
      providers: [
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
      html`<experience-composition uid="1"></experience-composition>`
    );
  });

  afterEach(() => {
    destroyInjector();
  });

  it('is defined', () => {
    expect(element).toBeInstanceOf(ExperienceCompositionPreviewComponent);
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