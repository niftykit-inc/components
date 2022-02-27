import { newE2EPage } from '@stencil/core/testing';

describe('nk-success-message', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nk-success-message></nk-success-message>');

    const element = await page.find('nk-success-message');
    expect(element).toHaveClass('hydrated');
  });
});
