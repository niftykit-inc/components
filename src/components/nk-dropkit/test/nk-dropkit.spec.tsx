import { newSpecPage } from '@stencil/core/testing';
import { NkDropkit } from '../nk-dropkit';

describe('nk-dropkit', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NkDropkit],
      html: `<nk-dropkit></nk-dropkit>`,
    });
    expect(page.root).toEqualHtml(`
      <nk-dropkit>
        <mock:shadow-root>
          <nk-wallet-button exportparts="wallet-btn-container wallet-btn">
            Connect Wallet
          </nk-wallet-button>
          <slot></slot>
        </mock:shadow-root>
      </nk-dropkit>
    `);
  });
});
