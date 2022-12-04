import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Nav from '../components/Nav';
import defineCustomElement from 'common/defineCustomElement';

export default class AtricleNav extends HTMLElement {
  connectedCallback() {
    const prev = this.getAttribute("prev") || "";
    const next = this.getAttribute("next") || "";

    ReactDOM.createRoot(this).render(
      <Nav prev={prev} next={next} />
    );
  }
}

defineCustomElement('xt-artnav', AtricleNav);
