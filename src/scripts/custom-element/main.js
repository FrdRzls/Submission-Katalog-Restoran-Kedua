class CustomMain extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <main id="main-content" tabindex="0">
          <div class="hero">
            <img src="./images/heros/hero-image_4.jpg" alt="Hero Image">
          </div>
          <div class="content">
            <h1>Explore Restaurant</h1>
            <p>Discover a world of taste and aroma as you explore the diverse restaurants waiting to be uncovered.</p>
            <div id="restaurant-list" class="restaurant-grid"></div>
            <div id="back-to-top">
              <button class="btn-back-to-top"><i class="fas fa-chevron-up"></i></button>
            </div>
        </main>
      `;
  }
}

customElements.define('custom-main', CustomMain);
