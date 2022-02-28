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
          <div class="mdc-select mdc-select--filled mdc-select--no-label" part="mint-btn-container">
            <div aria-disabled="false" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="mint-selected-text" class="mdc-select__anchor" part="mint-btn" role="button" tabindex="0">
              <span class="mdc-select__ripple"></span>
              <span class="mdc-select__selected-text-container">
                <span class="mdc-select__selected-text" id="mint-selected-text"></span>
              </span>
              <span class="mdc-select__dropdown-icon">
                <svg class="mdc-select__dropdown-icon-graphic" focusable="false" viewBox="7 10 10 5">
                  <polygon class="mdc-select__dropdown-icon-inactive" fill-rule="evenodd" points="7 10 12 15 17 10" stroke="none"></polygon>
                  <polygon class="mdc-select__dropdown-icon-active" fill-rule="evenodd" points="7 15 12 10 17 15" stroke="none"></polygon>
                </svg>
              </span>
            </div>
            <div class="mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth mdc-select__menu">
              <ul aria-label="Quantity Picker listbox" class="mdc-deprecated-list" role="listbox"></ul>
            </div>
          </div>
        </mock:shadow-root>
      </nk-mint-button>
    `);
  });
});
