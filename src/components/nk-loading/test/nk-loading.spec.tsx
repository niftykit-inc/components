import { newSpecPage } from '@stencil/core/testing';
import { NkLoading } from '../nk-loading';

describe('nk-loading', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NkLoading],
      html: `<nk-loading></nk-loading>`,
    });
    expect(page.root).toEqualHtml(`
      <nk-loading>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nk-loading>
    `);
  });
});
