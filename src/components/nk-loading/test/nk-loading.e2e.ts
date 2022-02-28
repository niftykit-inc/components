import { newE2EPage } from '@stencil/core/testing';

describe('nk-loading', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nk-loading></nk-loading>');

    const element = await page.find('nk-loading');
    expect(element).toHaveClass('hydrated');
  });
});
