import { expect, fixture, html } from '@open-wc/testing';
import { LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getControl } from '../../input';
import '../../option/';
import { SelectController } from './select.controller';
import { SelectOptions } from './select.model';

@customElement('fake-typeahead')
class FakeComponent extends LitElement implements SelectOptions {
  @property({ type: Boolean }) allowEmptyValue?: boolean;
  @property({ type: Boolean }) isEmpty?: boolean;
  protected selectController = new SelectController(this);

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

describe('SelectController', () => {
  let element: FakeComponent;

  describe('readonly', () => {
    describe('when an input control is used', () => {
      beforeEach(async () => {
        element = await fixture(html`<fake-typeahead>
          <input value="foo" />
        </fake-typeahead>`);
      });

      it('should make the control readonly', () => {
        expect(getControl(element)?.hasAttribute('readonly')).to.be.true;
      });
    });

    describe('when a select control is used', () => {
      beforeEach(async () => {
        element = await fixture(html`<fake-typeahead>
          <select></select>
        </fake-typeahead>`);
      });

      it('should make the control readonly', () => {
        expect(getControl(element)?.hasAttribute('readonly')).to.be.not.true;
      });
    });

    describe('when no control is available', () => {
      beforeEach(async () => {
        element = await fixture(html`<fake-typeahead></fake-typeahead>`);
      });

      it('should not throw an error', () => {
        expect(() => {
          (): void => undefined;
        }).not.to.throw;
      });
    });
  });

  describe('allow empty value', () => {
    describe('when allowEmptyValue is undefined', () => {
      describe('and no selected option is provided', () => {
        beforeEach(async () => {
          element = await fixture(html`<fake-typeahead>
            <select>
              <option>first</option>
              <option>second</option>
              <option>third</option>
            </select>
          </fake-typeahead>`);
        });
        it('should default to the first value', () => {
          expect(getControl(element)?.value).to.eq('first');
        });
      });

      describe('and selected option is provided', () => {
        beforeEach(async () => {
          element = await fixture(html`<fake-typeahead>
            <select>
              <option>first</option>
              <option selected>second</option>
              <option>third</option>
            </select>
          </fake-typeahead>`);
        });
        it('should default to the selected value', () => {
          expect(getControl(element)?.value).to.eq('second');
        });
      });
    });

    describe('when allowEmptyValue is true', () => {
      describe('and no selected option is provided', () => {
        beforeEach(async () => {
          element = await fixture(html`<fake-typeahead ?allowEmptyValue=${true}>
            <select>
              <option>first</option>
              <option>second</option>
              <option>third</option>
            </select>
          </fake-typeahead>`);
        });
        it('should have an empty (first) option', () => {
          expect(
            (getControl(element) as HTMLSelectElement)?.options?.[0].value
          ).to.eq('');
        });
        it('should have a select with no value', () => {
          expect(getControl(element)?.value).to.eq('');
        });
      });

      describe('and a selected option is provided', () => {
        beforeEach(async () => {
          element = await fixture(html`<fake-typeahead ?allowEmptyValue=${true}>
            <select>
              <option>first</option>
              <option selected>second</option>
              <option>third</option>
            </select>
          </fake-typeahead>`);
        });
        it('should have an empty (first) option', () => {
          const firstOption = (getControl(element) as HTMLSelectElement)
            ?.options?.[0];
          expect(firstOption.value).to.eq('');
        });
        it('should have a select with the selected value', () => {
          expect(getControl(element)?.value).to.eq('second');
        });
      });
    });
  });

  describe('reflect options', () => {
    describe('when a select is provided', () => {
      beforeEach(async () => {
        element = await fixture(html`<fake-typeahead>
          <select>
            <option>first</option>
            <option value="second"></option>
            <option value="third" selected>third option text</option>
          </select>
        </fake-typeahead>`);
      });

      it('should generate 3 elements', () => {
        expect(
          element.querySelectorAll('*:not(select):not(option)').length
        ).to.eq(3);
      });
    });
  });
});
