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
          <div class="mdc-touch-target-wrapper" part="wallet-btn-container">
            <button class="mdc-button mdc-button--raised" part="wallet-btn">
              <span class="mdc-button__ripple"></span>
              <span class="mdc-button__touch"></span>
              <span class="mdc-button__label">
                <slot></slot>
              </span>
            </button>
          </div>
        </mock:shadow-root>
      </nk-wallet-button>
    `);
  });
});
