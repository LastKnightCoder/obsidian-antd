import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Popover } from 'antd';

export default class MyPopover extends HTMLElement {
  connectedCallback() {
    const content = this.getAttribute("content") || "";
    const placement = this.getAttribute("placement") || "top";
    const innerHTML = this.innerHTML;

    const child = React.createElement('span', {
      dangerouslySetInnerHTML: {
        __html: innerHTML
      }
    });
    
    ReactDOM.createRoot(this).render(
      React.createElement(Popover, {
        content,
        placement
      }, child)
    );
  }
}

function defineCustomElement(name, Component) {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, Component);
  }
}

defineCustomElement('xt-popover', MyPopover);
