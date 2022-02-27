import { newSpecPage } from '@stencil/core/testing';
import { NkWalletButton } from '../nk-wallet-button';

describe('nk-wallet-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NkWalletButton],
      html: `<nk-wallet-button></nk-wallet-button>`,
    });
    expect(page.root).toEqualHtml(`
      <nk-wallet-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nk-wallet-button>
    `);
  });
});
