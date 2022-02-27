import { newSpecPage } from '@stencil/core/testing';
import { NkErrorMessage } from '../nk-error-message';

describe('nk-error-message', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NkErrorMessage],
      html: `<nk-error-message></nk-error-message>`,
    });
    expect(page.root).toEqualHtml(`
      <nk-error-message>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nk-error-message>
    `);
  });
});
