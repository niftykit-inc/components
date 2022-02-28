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
          <div aria-label="Loading..." aria-valuemax="1" aria-valuemin="0" class="mdc-circular-progress mdc-circular-progress--indeterminate" role="progressbar">
            <div class="mdc-circular-progress__determinate-container">
              <svg class="mdc-circular-progress__determinate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle class="mdc-circular-progress__determinate-track" cx="12" cy="12" r="8.75" stroke-width="2.5"></circle>
                <circle class="mdc-circular-progress__determinate-circle" cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="54.978" stroke-width="2.5"></circle>
              </svg>
            </div>
            <div class="mdc-circular-progress__indeterminate-container">
              <div class="mdc-circular-progress__spinner-layer">
                <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
                  <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="27.489" stroke-width="2.5"></circle>
                  </svg>
                </div>
                <div class="mdc-circular-progress__gap-patch">
                  <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="27.489" stroke-width="2"></circle>
                  </svg>
                </div>
                <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
                  <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="27.489" stroke-width="2.5"></circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </nk-loading>
    `);
  });
});
