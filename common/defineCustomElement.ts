export default function defineCustomElement(name: string, Component: CustomElementConstructor) {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, Component);
  }
}