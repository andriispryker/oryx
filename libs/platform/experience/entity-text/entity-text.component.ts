import { EntityService } from '@spryker-oryx/core';
import { resolve } from '@spryker-oryx/di';
import { ContentMixin } from '@spryker-oryx/experience';
import { computed, hydrate, Signal } from '@spryker-oryx/utilities';
import { LitElement, TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import { EntityTextOptions } from './entity-text.model';

@hydrate()
export class EntityTextComponent extends ContentMixin<EntityTextOptions>(
  LitElement
) {
  protected entity = resolve(EntityService);

  protected $entityField: Signal<string | undefined> = computed<
    string | undefined
  >(() => {
    return this.entity.getField<string>({
      element: this,
      type: this.$options().entity,
      field: this.$options().field,
    });
  });

  protected override render(): TemplateResult | void {
    return html`${this.$entityField()}`;
  }
}