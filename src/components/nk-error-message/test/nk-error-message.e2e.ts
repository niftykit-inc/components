import { newE2EPage } from '@stencil/core/testing';

describe('nk-error-message', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nk-error-message></nk-error-message>');

    const element = await page.find('nk-error-message');
    expect(element).toHaveClass('hydrated');
  });
});
