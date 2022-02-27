import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'nk-success-message',
  styleUrl: 'nk-success-message.css',
  shadow: true,
})
export class NkSuccessMessage {
  @Event() closed: EventEmitter<boolean>;

  render() {
    return (
      <div part="info" class="success">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM14.59 5.58L8 12.17L5.41 9.59L4 11L8 15L16 7L14.59 5.58Z"
            fill="#4CAF50"
          />
        </svg>

        <div class="content">
          <slot></slot>
        </div>
        <button onClick={() => this.closed.emit(true)} type="button" class="close" data-dismiss="msg" aria-label="Close">
          <span aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.8334 1.34175L10.6584 0.166748L6.00002 4.82508L1.34169 0.166748L0.166687 1.34175L4.82502 6.00008L0.166687 10.6584L1.34169 11.8334L6.00002 7.17508L10.6584 11.8334L11.8334 10.6584L7.17502 6.00008L11.8334 1.34175Z"
                fill="#4CAF50"
              />
              <path
                d="M11.8334 1.34175L10.6584 0.166748L6.00002 4.82508L1.34169 0.166748L0.166687 1.34175L4.82502 6.00008L0.166687 10.6584L1.34169 11.8334L6.00002 7.17508L10.6584 11.8334L11.8334 10.6584L7.17502 6.00008L11.8334 1.34175Z"
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
