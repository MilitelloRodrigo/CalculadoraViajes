/* ==========================================================================
   VIAJE FOOD RESULTS COMPONENT
   Modular client-side Web Component representing the food balances and settlements.
   ========================================================================== */

class ViajeFoodResults extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="glass-panel panel-highlight" id="panel-food-results">
        <div class="panel-header">
          <span class="panel-emoji">📊</span>
          <h3>4. Cuentas de Comida y Liquidación</h3>
        </div>

        <!-- SALDOS COMIDA -->
        <div class="results-sub-section">
          <h4>Balances de Comida</h4>
          <div class="balances-wrapper" id="food-balances-list">
            <div class="empty-state-small">Cargá participantes y gastos de comida para ver los balances.</div>
          </div>
        </div>

        <!-- LIQUIDACION COMIDA -->
        <div class="results-sub-section border-top">
          <div class="sub-section-header">
            <h4>¿Cómo saldar deudas de comida?</h4>
            <span class="badge badge-info">Liquidación Mínima</span>
          </div>
          
          <div class="settlements-wrapper" id="food-settlements-list">
            <div class="empty-state-small">Todos al día. ¡No hay deudas de comidas pendientes! 🎉</div>
          </div>
        </div>

        <!-- WHATSAPP FOOD EXPORT AREA -->
        <div class="export-area" id="food-export-area" style="display: none;">
          <button id="food-whatsapp-share-btn" class="btn btn-whatsapp btn-full">
            <svg class="icon-inline"><use href="#icon-whatsapp"></use></svg>
            <span>Copiar Resumen de Comida para WhatsApp</span>
          </button>
        </div>
      </section>
    `;
  }
}

customElements.define('viaje-food-results', ViajeFoodResults);
