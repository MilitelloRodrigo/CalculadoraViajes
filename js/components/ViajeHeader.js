/* ==========================================================================
   VIAJE HEADER COMPONENT
   Modular client-side Web Component representing the application branding,
   theme toggles, and global reset trigger.
   ========================================================================== */

class ViajeHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="app-header">
        <div class="logo-area">
          <span class="logo-emoji">🐀</span>
          <div class="title-meta">
            <h1>Sin Ratonear</h1>
            <p>Calculadora de Viajes y Comidas Grupales</p>
          </div>
        </div>
        <div class="header-actions">
          <button id="theme-toggle" class="btn-icon" aria-label="Cambiar tema">
            <svg class="icon sun-icon"><use href="#icon-sun"></use></svg>
            <svg class="icon moon-icon"><use href="#icon-moon"></use></svg>
          </button>
          <button id="reset-btn" class="btn-icon btn-danger-soft" aria-label="Reiniciar viaje">
            <svg class="icon"><use href="#icon-reset"></use></svg>
          </button>
        </div>
      </header>
    `;
  }
}

customElements.define('viaje-header', ViajeHeader);
