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
          <div class="connect-wallet" part="wallet-btn-container">
            <button class="btn" part="wallet-btn">
              Connect Wallet
            </button>
          </div>
          <slot></slot>
        </mock:shadow-root>
      </nk-dropkit>
    `);
  });
});
