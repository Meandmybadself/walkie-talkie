import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import globalStyles from 'litsass:../../styles/global.scss'
import pageStyles from 'litsass:./lit-page.scss'

import '../../components/lit-component/lit-component'

@customElement('lit-page')
export class Page extends LitElement {
    static styles = [globalStyles, pageStyles]

    render() {
        return html`<lit-component></lit-component>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-page': Element
    }
}
