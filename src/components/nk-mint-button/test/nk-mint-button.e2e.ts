import { newE2EPage } from '@stencil/core/testing';

describe('nk-mint-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nk-mint-button></nk-mint-button>');

    const element = await page.find('nk-mint-button');
    expect(element).toHaveClass('hydrated');
  });
});
