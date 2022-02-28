import { newE2EPage } from '@stencil/core/testing';

describe('nk-wallet-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nk-wallet-button></nk-wallet-button>');

    const element = await page.find('nk-wallet-button');
    expect(element).toHaveClass('hydrated');
  });
});
