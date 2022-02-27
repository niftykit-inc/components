import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { MDCSelect } from '@material/select';

@Component({
  tag: 'nk-mint-button',
  styleUrl: 'nk-mint-button.scss',
  shadow: true,
})
export class NkMintButton {
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() maxPerMint!: number;
  @Prop() selectedValue: number = -1;
  @Prop() placeholder: string = 'Mint NFT';

  @Event() tokensChanged: EventEmitter<number>;

  values: number[] = [];
  container!: HTMLDivElement;
  select: MDCSelect | null = null;

  render() {
    this.setValues();
    const selectClasses = `mdc-select mdc-select--filled mdc-select--no-label ${this.disabled ? 'mdc-select--disabled' : ''}`;

    return (
      <div part="mint-btn-container" class={selectClasses} ref={el => (this.container = el as HTMLDivElement)}>
        <div part="mint-btn" class="mdc-select__anchor" role="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="mint-selected-text">
          <span class="mdc-select__ripple"></span>
          <span class="mdc-select__selected-text-container">
            <span id="mint-selected-text" class="mdc-select__selected-text"></span>
          </span>
          <span class="mdc-select__dropdown-icon">
            <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false">
              <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
              <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>
            </svg>
          </span>
        </div>

        <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
          <ul class="mdc-deprecated-list" role="listbox" aria-label="Quantity Picker listbox">
            <li class={`${this.optionClasses(-1)} mdc-deprecated-list-item--disabled`} aria-selected={this.selectedValue === -1} data-value="-1" role="option">
              <span class="mdc-deprecated-list-item__ripple"></span>
              <span class="mdc-deprecated-list-item__text">{this.placeholder}</span>
            </li>
            {this.values.map(value => (
              <li class={this.optionClasses(value)} aria-selected={value === this.selectedValue} data-value={value} role="option">
                <span class="mdc-deprecated-list-item__ripple"></span>
                <span class="mdc-deprecated-list-item__text">{this.loading ? 'Loading...' : value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  componentDidLoad() {
    this.select = new MDCSelect(this.container);

    this.select.listen('MDCSelect:change', () => {
      this.tokensChanged.emit(Number(this.select.value));
    });
  }

  private setValues(): void {
    this.values = [];
    // Fills the tokens array with the total supply
    for (let i = 0; i < this.maxPerMint; i++) {
      this.values = [...this.values, i + 1];
    }
  }

  private optionClasses(value: number): string {
    return `mdc-deprecated-list-item ${this.selectedValue === value ? 'mdc-deprecated-list-item--selected' : ''}`;
  }
}
