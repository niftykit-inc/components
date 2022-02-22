import { Component, Prop, State, Host, h } from '@stencil/core';
import { Env } from '@stencil/core';
import Dropkit from 'dropkit.js';
import WalletLink from 'walletlink';
import WalletConnectProvider from '@walletconnect/web3-provider';

@Component({
  tag: 'nk-dropkit',
  styleUrl: 'nk-dropkit.css',
  shadow: true,
})
export class NkDropkit {
  /**
   * Drop SDK Key
   */
  @Prop() apikey: string = '';

  /**
   * Flag to enable testnet mode
   */
  @Prop() dev: boolean = false;

  /**
   * Flag to enable multiple wallet support
   */
  @Prop() multiple: boolean = true;

  @State() loading: boolean;
  @State() dropStarted: boolean;
  @State() selectValue: number;
  @State() msg: Msg = null;

  private drop: Dropkit | null = null;
  private tokens: number[] = [];

  render() {
    const NkMsg = () => {
      if (!this.msg) {
        return null;
      }

      return (
        <div part="info" class={{ 'msg error': this.msg.error, 'msg success': !this.msg.error }}>
          {this.msg.message}
          <button onClick={() => (this.msg = null)} type="button" class="close" data-dismiss="msg" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    };

    const ConnectWalletBtn = () => {
      return (
        <div part="wallet-btn-container" class="connect-wallet">
          <button part="wallet-btn" class="btn" disabled={this.loading} onClick={() => this.initDrop()}>
            {this.loading ? 'Loading...' : 'Connect Wallet'}
          </button>
        </div>
      );
    };

    const MintBtn = () => {
      return (
        <div part="mint-btn-container" class="mint">
          <select part="mint-btn" class="btn" disabled={this.loading} onInput={event => this.handleSelect(event)} id="mint-btn">
            <option value="-1" disabled selected>
              Mint
            </option>
            {this.tokens.map(token => (
              <option value={token} selected={this.selectValue === token}>
                {this.loading ? 'Loading...' : token}
              </option>
            ))}
          </select>
        </div>
      );
    };

    return (
      <Host>
        <NkMsg />
        {!this.dropStarted ? <ConnectWalletBtn /> : <MintBtn />}
        <slot />
      </Host>
    );
  }

  async handleSelect(event: any): Promise<void> {
    this.msg = null;
    this.loading = true;
    try {
      this.selectValue = Math.max(event.target.value, 1);
      await this.mint(this.selectValue);
    } catch (e) {
      this.msg = { error: true, message: e.message };
    } finally {
      this.loading = false;
    }
  }

  async mint(quantity: number): Promise<void> {
    if (!this.drop) {
      throw new Error('Dropkit is not initialized');
    }
    await this.drop.mint(quantity);
    this.msg = { error: false, message: `Tokens Minted: ${quantity}` };
  }

  private async initDrop(): Promise<void> {
    this.loading = true;
    let providers = {};
    const infuraId = Env.infuraId;
    if (infuraId && this.multiple) {
      providers = {
        walletlink: {
          package: WalletLink,
          options: {
            appName: 'Dropkit',
            infuraId,
          },
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId,
          },
        },
      };
    }
    try {
      this.drop = await Dropkit.create(this.apikey, this.dev, providers);
      await this.setTokens();
      this.dropStarted = true;
    } catch (e) {
      this.msg = { error: true, message: e.message };
    } finally {
      this.loading = false;
    }
  }

  private async setTokens(): Promise<void> {
    const maxPerMint = await this.drop.maxPerMint();
    // Fills the tokens array with the total supply
    for (let i = 0; i < maxPerMint; i++) {
      this.tokens = [...this.tokens, i + 1];
    }
  }
}

type Msg = {
  error: boolean;
  message: string;
};
