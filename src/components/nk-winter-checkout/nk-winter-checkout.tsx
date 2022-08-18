import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'nk-winter-checkout',
  shadow: true,
})
export class NKWinterCheckout {
  @Prop() projectId!: string;
  @Prop() walletAddress: string = null;
  @Prop() email: string = null;
  @Prop() mintQuantity: string = null;
  @Prop() erc1155Video: string = null;
  @Prop() projectTitle: string = null;
  @Prop() brandImage: string = null;
  @Prop() extraMintParams: Record<string, string | number | undefined> = null;
  @Prop() priceFunctionParams: Record<string, string | number | undefined> = null;
  @Prop() production: boolean = true;
  @Prop() isOpen: boolean = false;

  @Event() close: EventEmitter<boolean>;
  @Event() success: EventEmitter;

  projectUrl: string = '';

  private handleWindowEvent = e => {
    const { data } = e;
    if (data === 'closeWinterCheckoutModal') {
      this.close.emit(false);
    } else if (data.name === 'successfulWinterCheckout') {
      this.close.emit(false);
      this.success.emit();
    }
  };

  private getProjectUrl(): string {
    let queryString = 'projectId=' + this.projectId;
    if (this.walletAddress) {
      queryString += '&walletAddress=' + this.walletAddress;
    }
    if (this.email) {
      queryString += `&email=${encodeURIComponent(this.email)}`;
    }
    if (this.mintQuantity) {
      queryString += '&mintQuantity=' + this.mintQuantity;
    }
    if (this.erc1155Video) {
      queryString += '&erc1155Video=' + this.erc1155Video;
    }
    if (this.projectTitle) {
      queryString += `&title=${encodeURIComponent(this.projectTitle)}`;
    }
    if (this.extraMintParams) {
      queryString += `&extraMintParams=${encodeURIComponent(JSON.stringify(this.extraMintParams))}`;
    }
    if (this.priceFunctionParams) {
      queryString += `&priceFunctionParams=${encodeURIComponent(JSON.stringify(this.priceFunctionParams))}`;
    }
    if (this.brandImage) {
      queryString += `&brandImage=${encodeURIComponent(this.brandImage)}`;
    }

    const url = this.production ? 'https://checkout.usewinter.com/?' + queryString : 'https://sandbox-winter-checkout.onrender.com/?' + queryString;

    return url;
  }

  private async initListener(): Promise<void> {
    if (typeof window !== 'undefined') {
      window.addEventListener('message', this.handleWindowEvent);
    }
  }

  render() {
    return this.isOpen ? (
      <iframe
        id="winter-checkout"
        src={this.getProjectUrl()}
        style={{
          position: 'fixed',
          top: '0',
          bottom: '0',
          right: '0',
          width: '100%',
          border: 'none',
          margin: '0',
          padding: '0',
          overflow: 'hidden',
          zIndex: '999999',
          height: '100%',
        }}
      />
    ) : (
      <div />
    );
  }

  componentDidLoad() {
    this.initListener();
  }

  disconnectedCallback() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', this.handleWindowEvent);
    }
  }
}
