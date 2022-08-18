import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { MDCRipple } from '@material/ripple';
import { Component, Env, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Dropkit from 'dropkit.js';
import { ethers } from 'ethers';
import { INFURA_ENDPOINTS } from '../../config/infura';
import { METAMASK_BASE64 } from '../../config/logos';
import { Msg } from '../../types/message.type';

@Component({
  tag: 'nk-winter-checkout',
  styleUrl: 'nk-winter-checkout.scss',
  shadow: true,
})
export class NKWinterCheckout {
  /**
   * Drop SDK Key
   */
  @Prop() apikey!: string;

  /**
   * Flag to enable testnet mode
   */
  @Prop() dev: boolean = false;

  /**
   * Winter Project Id
   */
  @Prop() projectId!: string;

  @Prop() walletAddress: string = null;
  @Prop() email: string = null;
  @Prop() mintQuantity: string = null;
  @Prop() erc1155Video: string = null;
  @Prop() projectTitle: string = null;
  @Prop() brandImage: string = null;
  @Prop() mintText: string = 'Mint With Card';

  @State() isOpen: boolean = false;
  @State() loading: boolean = false;
  @State() msg: Msg = null;
  @State() extraMintParams: Record<string, string | number | string[] | undefined> = null;
  @State() priceFunctionParams: Record<string, string | number | string[] | undefined> = null;
  @State() disabled = false;

  @Event() close: EventEmitter<boolean>;
  @Event() success: EventEmitter;

  button!: HTMLButtonElement;
  ripple: MDCRipple | null = null;

  projectUrl: string = '';

  private drop: Dropkit | null = null;

  componentWillLoad() {
    this.initDrop();
  }

  componentDidLoad() {
    this.initListener();
  }

  disconnectedCallback() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', this.handleWindowEvent);
    }
  }

  render() {
    const Modal = () => {
      if (!this.isOpen) {
        return null;
      }

      return (
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
      );
    };

    const NkMsg = () => {
      if (!this.msg) {
        return null;
      }

      return (
        <nk-error-message class="info" exportparts="info" onClosed={() => (this.msg = null)}>
          {this.msg.text}
        </nk-error-message>
      );
    };

    return (
      <Host>
        <NkMsg />
        <div part="wallet-btn-container" class="mdc-touch-target-wrapper">
          <button
            onClick={() => this.openModal()}
            part="winter-btn"
            disabled={this.loading || this.disabled}
            ref={el => (this.button = el as HTMLButtonElement)}
            class="mdc-button mdc-button--raised"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__touch"></span>
            <span class="mdc-button__label">{this.loading ? <nk-loading></nk-loading> : this.mintText}</span>
          </button>
        </div>
        <Modal />
      </Host>
    );
  }

  @Method()
  async openModal(): Promise<void> {
    this.loading = true;
    try {
      const presale = await this.drop.presaleActive();
      if (presale) {
        const providers = this.getProviders();
        // creates new drop with signer
        this.drop = await Dropkit.create(this.apikey, this.dev, providers);
        if (this.isMobile() && this.drop.ethInstance?.on) {
          this.drop.ethInstance.on('chainChanged', async () => {
            this.msg = { error: false, text: 'Switching networks...' };
            window.location.reload();
          });
        }
        const proof = await this.drop.generateProofV2();
        if (proof.message) {
          throw new Error(proof.message); // not part of presale
        }
        this.extraMintParams = {
          proof: proof.proof,
          allowed: proof.allowed,
        };
      }
    } catch (e) {
      this.loading = false;
      this.msg = { error: true, text: e.message };
    }
    this.isOpen = true;
  }

  private async initDrop(): Promise<void> {
    this.loading = true;
    const infuraId = Env.infuraId;
    if (!infuraId) {
      this.loading = false;
      return;
    }
    try {
      if (!this.drop) {
        const data = await Dropkit.getCollectionData(this.apikey, this.dev);
        const url = INFURA_ENDPOINTS[data.chainId];
        const provider = new ethers.providers.JsonRpcProvider(`${url}${infuraId}`);
        this.drop = await Dropkit.create(this.apikey, this.dev, null, provider);
        const saleActive = await this.drop.saleActive();
        if (!saleActive) {
          this.disabled = true;
          throw new Error('Sale is not active');
        }
      }
    } catch (e) {
      this.msg = { error: true, text: e.message };
    } finally {
      this.loading = false;
    }
  }

  private handleWindowEvent = e => {
    const { data } = e;
    if (data === 'closeWinterCheckoutModal') {
      this.isOpen = false;
      this.loading = false;
      this.close.emit(false);
    } else if (data.name === 'successfulWinterCheckout') {
      this.isOpen = false;
      this.loading = false;
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

    const url = !this.dev ? 'https://checkout.usewinter.com/?' + queryString : 'https://sandbox-winter-checkout.onrender.com/?' + queryString;

    return url;
  }

  private async initListener(): Promise<void> {
    if (typeof window !== 'undefined') {
      window.addEventListener('message', this.handleWindowEvent);
    }
  }

  private isMobile(): boolean {
    return this.deviceType() !== 'desktop';
  }

  private deviceType(): string {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  }

  private getProviders(): any {
    let providers = {};
    const infuraId = Env.infuraId;
    if (infuraId) {
      providers = {
        walletlink: {
          package: CoinbaseWalletSDK,
          options: {
            appName: 'Dropkit',
            infuraId,
          },
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId,
            rpc: {
              80001: 'https://matic-mumbai.chainstacklabs.com',
              137: 'https://polygon-rpc.com',
            },
          },
        },
      };
    }

    if (this.isMobile()) {
      providers = {
        ...providers,
        'custom-metamask': {
          display: {
            logo: METAMASK_BASE64,
            name: 'MetaMask',
            description: 'Connect to your MetaMask Wallet',
          },
          package: true,
          connector: () => {
            const url = `${window.location.origin}${window.location.pathname}`;
            window.location.href = `https://metamask.app.link/dapp/${url}`;
          },
        },
      };
    }

    return providers;
  }
}
