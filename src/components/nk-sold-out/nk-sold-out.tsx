import { Component, h } from '@stencil/core';

@Component({
  tag: 'nk-sold-out',
  styleUrl: 'nk-sold-out.scss',
  shadow: true,
})
export class NkSoldOut {
  render() {
    return (
      <div part="sold-out-container" class="mdc-touch-target-wrapper">
        <button part="sold-out-text" disabled={true} class="mdc-button mdc-button--raised">
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__touch"></span>
          <span class="mdc-button__label">
            <slot></slot>
          </span>
        </button>
      </div>
    );
  }
}
