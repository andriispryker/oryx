import { resolve } from '@spryker-oryx/di';
import { MockRouterService } from '@spryker-oryx/experience/mocks';
import { RouterService } from '@spryker-oryx/router';
import { FacetListService } from '@spryker-oryx/search';
import {
  FacetComponentAttributes,
  FacetSelect,
} from '@spryker-oryx/search/facet';
import { Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { take } from 'rxjs';
import { storybookPrefix } from '../../.constants';

export default {
  title: `${storybookPrefix}/Facet Color`,
};

const Template: Story<FacetComponentAttributes> = (
  attrs: FacetComponentAttributes
): TemplateResult => {
  const router = resolve(RouterService) as unknown as MockRouterService;
  const service = resolve(FacetListService);

  router.params$.next({});

  const onSelect = (e: CustomEvent<FacetSelect>, multiValued = true) => {
    const { name, value: selectedFacetValue } = e.detail;

    service
      .get()
      .pipe(take(1))
      .subscribe((facets) => {
        if (!selectedFacetValue) {
          router.params$.next({});
          return;
        }

        const facet = facets?.find((facet) => facet.name === name);

        const values = multiValued
          ? [
              ...(facet?.selectedValues ?? []),
              ...(selectedFacetValue.selected
                ? [selectedFacetValue.value]
                : []),
            ].filter(
              (selectedValue) =>
                selectedFacetValue.selected ||
                selectedValue !== selectedFacetValue.value
            )
          : [selectedFacetValue.value];

        router.params$.next({ [facet?.parameter ?? '']: values.join(',') });
      });
  };

  return html`<oryx-search-color-facet
    .name=${attrs.name}
    .minForSearch=${attrs.minForSearch}
    .renderLimit=${attrs.renderLimit}
    ?open=${attrs.open}
    ?multi=${attrs.multi}
    @oryx.select=${(e: Event) =>
      onSelect(e as CustomEvent<FacetSelect>, attrs.multi)}
  ></oryx-search-color-facet>`;
};

export const Demo = Template.bind({});

Demo.args = {
  name: 'Color',
  multi: true,
  renderLimit: 5,
  minForSearch: 13,
  open: true,
};

Demo.argTypes = {
  name: {
    control: { type: 'select' },
    options: ['Color'],
  },
};