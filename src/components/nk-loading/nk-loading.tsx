import { MDCCircularProgress } from '@material/circular-progress';
import { Component, h } from '@stencil/core';

@Component({
  tag: 'nk-loading',
  styleUrl: 'nk-loading.scss',
  shadow: true,
})
export class NkLoading {
  container!: HTMLDivElement;
  circularProgress: MDCCircularProgress;

  render() {
    return (
      <div ref={el => (this.container = el as HTMLDivElement)} class="mdc-circular-progress" role="progressbar" aria-label="Loading..." aria-valuemin="0" aria-valuemax="1">
        <div class="mdc-circular-progress__determinate-container">
          <svg class="mdc-circular-progress__determinate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle class="mdc-circular-progress__determinate-track" cx="12" cy="12" r="8.75" stroke-width="2.5" />
            <circle class="mdc-circular-progress__determinate-circle" cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="54.978" stroke-width="2.5" />
          </svg>
        </div>
        <div class="mdc-circular-progress__indeterminate-container">
          <div class="mdc-circular-progress__spinner-layer">
            <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
              <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="27.489" stroke-width="2.5" />
              </svg>
            </div>
            <div class="mdc-circular-progress__gap-patch">
              <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="27.489" stroke-width="2" />
              </svg>
            </div>
            <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
              <svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8.75" stroke-dasharray="54.978" stroke-dashoffset="27.489" stroke-width="2.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidLoad() {
    this.circularProgress = new MDCCircularProgress(this.container);
    this.circularProgress.determinate = false;
    this.circularProgress.open();
  }
}
