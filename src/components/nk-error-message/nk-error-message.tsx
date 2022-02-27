import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'nk-error-message',
  styleUrl: 'nk-error-message.css',
  shadow: true,
})
export class NkErrorMessage {
  @Event() closed: EventEmitter<boolean>;

  render() {
    return (
      <div part="info" class="error">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
            fill="#F44336"
          />
        </svg>
        <div class="content">
          <slot></slot>
        </div>
        <button onClick={() => this.closed.emit(true)} type="button" class="close" data-dismiss="msg" aria-label="Close">
          <span aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.8334 1.3415L10.6584 0.166504L6.00002 4.82484L1.34169 0.166504L0.166687 1.3415L4.82502 5.99984L0.166687 10.6582L1.34169 11.8332L6.00002 7.17484L10.6584 11.8332L11.8334 10.6582L7.17502 5.99984L11.8334 1.3415Z"
                fill="#F44336"
              />
              <path
                d="M11.8334 1.3415L10.6584 0.166504L6.00002 4.82484L1.34169 0.166504L0.166687 1.3415L4.82502 5.99984L0.166687 10.6582L1.34169 11.8332L6.00002 7.17484L10.6584 11.8332L11.8334 10.6582L7.17502 5.99984L11.8334 1.3415Z"
                fill="black"
                fill-opacity="0.6"
              />
            </svg>
          </span>
        </button>
      </div>
    );
  }
}
