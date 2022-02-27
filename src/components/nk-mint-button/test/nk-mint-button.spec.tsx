import { newSpecPage } from '@stencil/core/testing';
import { NkMintButton } from '../nk-mint-button';

describe('nk-mint-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NkMintButton],
      html: `<nk-mint-button></nk-mint-button>`,
    });
    expect(page.root).toEqualHtml(`
      <nk-mint-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nk-mint-button>
    `);
  });
});
