import { Component, h, Prop } from '@stencil/core';
import { MDCRipple } from '@material/ripple';

@Component({
  tag: 'nk-wallet-button',
  styleUrl: 'nk-wallet-button.scss',
  shadow: true,
})
export class NkWalletButton {
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;

  button!: HTMLButtonElement;
  ripple: MDCRipple | null = null;

  render() {
    return (
      <div part="wallet-btn-container" class="mdc-touch-target-wrapper">
        <button part="wallet-btn" disabled={this.disabled} ref={el => (this.button = el as HTMLButtonElement)} class="mdc-button mdc-button--raised">
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__touch"></span>
          <span class="mdc-button__label">{this.loading ? 'Loading...' : <slot></slot>}</span>
        </button>
      </div>
    );
  }

  componentDidLoad() {
    this.ripple = new MDCRipple(this.button);
  }
}
