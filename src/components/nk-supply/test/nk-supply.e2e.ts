import { newE2EPage } from '@stencil/core/testing';

describe('nk-supply', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nk-supply></nk-supply>');

    const element = await page.find('nk-supply');
    expect(element).toHaveClass('hydrated');
  });
});
