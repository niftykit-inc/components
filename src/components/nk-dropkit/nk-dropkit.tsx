import { Component, Event, EventEmitter, Prop, State, Host, h } from '@stencil/core';
import { Env } from '@stencil/core';
import Dropkit from 'dropkit.js';
import WalletLink from 'walletlink';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { DropCollection } from '../../types/drop-collection.interface';
import { Msg } from '../../types/message.type';

@Component({
  tag: 'nk-dropkit',
  styleUrl: 'nk-dropkit.css',
  shadow: true,
})
export class NkDropkit {
  /**
   * Drop SDK Key
   */
  @Prop() apikey!: string;

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

  @Event() walletConnected: EventEmitter<DropCollection>;
  @Event() minted: EventEmitter<DropCollection>;

  private drop: Dropkit | null = null;
  private maxPerMint: number = 0;

  render() {
    const NkMsg = () => {
      if (!this.msg) {
        return null;
      }

      const Msg = this.msg.error ? 'nk-error-message' : 'nk-success-message';

      return (
        <Msg class="info" exportparts="info" onClosed={() => (this.msg = null)}>
          {this.msg.text}
        </Msg>
      );
    };

    const ConnectWalletBtn = () => {
      return (
        <nk-wallet-button exportparts="wallet-btn-container, wallet-btn" disabled={this.loading} loading={this.loading} onClick={() => this.initDrop()}>
          Connect Wallet
        </nk-wallet-button>
      );
    };

    const MintBtn = () => {
      return (
        <nk-mint-button
          exportparts="mint-btn-container, mint-btn, mint-text, mint-dropdown-icon"
          selectedValue={this.selectValue}
          maxPerMint={this.maxPerMint}
          disabled={this.loading}
          loading={this.loading}
          onTokensChanged={event => this.handleSelect(event)}
        ></nk-mint-button>
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
      this.selectValue = Math.max(event.detail, 1);
      await this.mint(this.selectValue);
    } catch (e) {
      this.msg = { error: true, text: e.message };
    } finally {
      this.loading = false;
    }
  }

  async mint(quantity: number): Promise<void> {
    if (!this.drop) {
      throw new Error('Dropkit is not initialized');
    }
    await this.drop.mint(quantity);
    const dropCollection = await this.getCollectionInfo();
    this.minted.emit(dropCollection);
    this.msg = { error: false, text: `Tokens Minted: ${quantity}` };
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
            rpc: {
              80001: 'https://matic-mumbai.chainstacklabs.com',
              137: 'https://polygon-rpc.com',
            },
          },
        },
      };
    }
    try {
      this.drop = await Dropkit.create(this.apikey, this.dev, providers);
      this.maxPerMint = await this.drop.maxPerMint();
      const dropCollection = await this.getCollectionInfo();
      this.walletConnected.emit(dropCollection);
      this.dropStarted = true;
    } catch (e) {
      this.msg = { error: true, text: e.message };
    } finally {
      this.loading = false;
    }
  }

  private async getCollectionInfo(): Promise<DropCollection> {
    if (!this.drop) {
      throw new Error('Dropkit is not initialized');
    }
    const dropCollection: DropCollection = {
      maxAmount: await this.drop.maxAmount(),
      maxPerMint: await this.drop.maxPerMint(),
      maxPerWallet: await this.drop.maxPerWallet(),
      totalSupply: await this.drop.totalSupply(),
      walletTokensCount: await this.drop.walletTokensCount(),
    };
    return dropCollection;
  }
}
