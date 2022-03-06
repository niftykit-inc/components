import { newSpecPage } from '@stencil/core/testing';
import { NkSupply } from '../nk-supply';

describe('nk-supply', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NkSupply],
      html: `<nk-supply></nk-supply>`,
    });
    expect(page.root).toEqualHtml(`
      <nk-supply>
        <mock:shadow-root>
        <div part="supply-text">
          <nk-loading></nk-loading>
          <slot></slot>
        </div>
        </mock:shadow-root>
      </nk-supply>
    `);
  });
});
