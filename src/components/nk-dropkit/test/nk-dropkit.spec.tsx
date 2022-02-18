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
         <div>
           <div class="connect-wallet">
             <button class="btn">
               Connect Wallet
             </button>
           </div>
           <slot></slot>
         </div>
        </mock:shadow-root>
      </nk-dropkit>
    `);
  });
});
