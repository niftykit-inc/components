import { newSpecPage } from '@stencil/core/testing';
import { NkSoldOut } from '../nk-sold-out';

describe('nk-sold-out', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NkSoldOut],
      html: `<nk-sold-out></nk-sold-out>`,
    });
    expect(page.root).toEqualHtml(`
      <nk-sold-out>
        <mock:shadow-root>
          <div part="sold-out-container" class="mdc-touch-target-wrapper">
            <button part="sold-out-text" disabled="" class="mdc-button mdc-button--raised">
              <span class="mdc-button__ripple"></span>
              <span class="mdc-button__touch"></span>
              <span class="mdc-button__label">
                <slot></slot>
              </span>
            </button>
          </div>
        </mock:shadow-root>
      </nk-sold-out>
    `);
  });
});
