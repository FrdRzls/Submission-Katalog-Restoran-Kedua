class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="footer-content">
          <p>Copyright &copy; 2024 Belleve Restaurant Apps</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);
