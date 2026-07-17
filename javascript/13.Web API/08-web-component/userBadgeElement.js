// Goal:
// Define a custom element with shadow DOM.

class UserBadgeElement extends HTMLElement {
  connectedCallback() {
    const displayName = this.getAttribute('display-name') ?? 'Guest';
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const wrapperElement = document.createElement('span');
    wrapperElement.textContent = `User: ${displayName}`;
    wrapperElement.style.border = '1px solid black';
    wrapperElement.style.padding = '8px';

    shadowRoot.append(wrapperElement);
  }
}

customElements.define('user-badge', UserBadgeElement);
