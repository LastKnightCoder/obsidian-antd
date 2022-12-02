import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Nav from './Nav';

export default class AtricleNav extends HTMLElement {
  connectedCallback() {
    const noPrev = this.getAttribute("noPrev") || "";
    const prev = this.getAttribute("prev") || "";
    const next = this.getAttribute("next") || "";
    const noNext = this.getAttribute("noNext") || "";
    
    ReactDOM.createRoot(this).render(
      React.createElement(Nav, {
        noPrev,
        prev,
        next,
        noNext
      })
    );
  }
}

function defineCustomElement(name, Component) {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, Component);
  }
}

defineCustomElement('xt-artnav', AtricleNav);
