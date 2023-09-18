import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import importedStyles from 'litsass:./lit-component.scss'

@customElement('lit-component')
export class LitComponent extends LitElement {
  static styles = importedStyles

  render() {
    return html`<div class="element">LitComponent</div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-component': Element
  }
}
