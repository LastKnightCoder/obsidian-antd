import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';

import convert from 'react-from-dom';
import defineCustomElement from 'common/defineCustomElement';

export default class MyPopover extends HTMLElement {
  connectedCallback() {
    const content = this.getAttribute("content") || "";
    const placement = (this.getAttribute("placement") || "top") as TooltipPlacement;
    const maxWidth = this.getAttribute("maxWidth") || "";
    const contentStyle = maxWidth ? { maxWidth } : {};

    console.log('maxWidth', maxWidth);

    const child = convert(this.innerHTML) as React.ReactNode;
    
    ReactDOM.createRoot(this).render(
      <Popover content={<div style={contentStyle}>{content}</div>} placement={placement} >
        {child}
      </Popover>
    );
  }
}

defineCustomElement('xt-popover', MyPopover);
