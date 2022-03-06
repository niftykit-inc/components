import { Component, h, Env, Prop, State } from '@stencil/core';
import Dropkit from 'dropkit.js';
import { ethers } from 'ethers';
import { INFURA_ENDPOINTS } from '../../config/infura';
import { Msg } from '../../types/message.type';

@Component({
  tag: 'nk-supply',
  styleUrl: 'nk-supply.css',
  shadow: true,
})
export class NkSupply {
  /**
   * Drop SDK Key
   */
  @Prop() apikey!: string;

  /**
   * Flag to enable testnet mode
   */
  @Prop() dev: boolean = false;

  @State() loading: boolean;
  @State() msg: Msg = null;
  private drop: Dropkit | null = null;
  private maxAmount: number = 0;
  private totalSupply: number = 0;

  componentWillLoad() {
    this.initDrop();
  }

  render() {
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
      <div part="supply-text">
        <NkMsg />
        {this.loading ? <nk-loading></nk-loading> : `${this.totalSupply}/${this.maxAmount}`}
        <slot></slot>
      </div>
    );
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
      }
      this.maxAmount = await this.drop.maxAmount();
      this.totalSupply = await this.drop.totalSupply();
    } catch (e) {
      this.msg = { error: true, text: e.message };
    } finally {
      this.loading = false;
    }
  }
}
