import { newE2EPage } from '@stencil/core/testing';

describe('nk-dropkit', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nk-dropkit></nk-dropkit>');

    const element = await page.find('nk-dropkit');
    expect(element).toHaveClass('hydrated');
  });
});
