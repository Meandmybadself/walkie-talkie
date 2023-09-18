---
to: src/components/<%= name %>/<%= name %>.ts
---
import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import globalStyles from 'litsass:../../styles/global.scss'
import pageStyles from 'litsass:./<%= name %>.scss'

@customElement('<%= name %>')
export class <%= h.changeCase.camel(name, true) %> extends LitElement {
    static styles = [globalStyles, pageStyles]

    render() {
        return html`
            <div class="<%= name %>">
                <h1><%= name %></h1>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        '<%= name %>': <%= h.changeCase.camel(name, true) %>
    }
}
