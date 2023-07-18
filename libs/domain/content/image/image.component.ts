import { ContentMixin, defaultOptions } from '@spryker-oryx/experience';
import { html, LitElement, TemplateResult } from 'lit';
import { ContentImageContent, ContentImageOptions } from './image.model';
import { contentImageStyles } from './image.styles';

@defaultOptions({ fit: 'cover' })
export class ContentImageComponent extends ContentMixin<
  ContentImageOptions,
  ContentImageContent
>(LitElement) {
  static styles = [contentImageStyles];

  protected override render(): TemplateResult | void {
    const { image, graphic, link, label, alt } = this.$content();

    if (!image && !graphic) return;

    if (link) {
      return html`<a .href=${link} aria-label=${label || alt}>
        ${this.renderImage()}
      </a>`;
    } else {
      return this.renderImage();
    }
  }

  protected renderImage(): TemplateResult | void {
    const { image, graphic, alt } = this.$content();

    return html`<oryx-image
      .resource=${graphic}
      .src=${!graphic && image}
      .style=${this.getStyles()}
      .alt=${alt}
    ></oryx-image>`;
  }

  protected getStyles(): string | undefined {
    const { fit, position } = this.$options();
    let styles = '';
    if (fit) styles += `--image-fit:${fit};`;
    if (position) styles += `--image-position:${position};`;
    return styles || undefined;
  }
}