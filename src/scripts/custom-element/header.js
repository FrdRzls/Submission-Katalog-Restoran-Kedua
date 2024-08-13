class CustomHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header>
          <a href="#main-content" class="skip-link">Skip to Content</a>
          <img src="./images/logo.png" alt="Belleve Restaurant Logo">
          <h1>Belleve Restaurant Apps</h1>
          <button id="toggleBtn" class="toggle-btn" tabindex="0">
            <i class="fas fa-bars"></i>
          </button>
          <nav id="drawer">
            <ul>
              <li><a href="/" tabindex="0">Home</a></li>
              <li><a href="./favorites.html" tabindex="0">Favorite</a></li>
              <li><a href="https://github.com/RizalFarid" tabindex="0">About Us</a></li>
            </ul>
          </nav>
        </header>
      `;
  }
}

customElements.define('custom-header', CustomHeader);
