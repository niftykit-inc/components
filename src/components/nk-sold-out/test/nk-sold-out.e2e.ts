import { newE2EPage } from '@stencil/core/testing';

describe('nk-sold-out', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nk-sold-out></nk-sold-out>');

    const element = await page.find('nk-sold-out');
    expect(element).toHaveClass('hydrated');
  });
});
