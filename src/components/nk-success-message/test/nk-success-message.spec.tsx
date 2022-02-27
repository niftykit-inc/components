import { newSpecPage } from '@stencil/core/testing';
import { NkSuccessMessage } from '../nk-success-message';

describe('nk-success-message', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NkSuccessMessage],
      html: `<nk-success-message></nk-success-message>`,
    });
    expect(page.root).toEqualHtml(`
      <nk-success-message>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nk-success-message>
    `);
  });
});
