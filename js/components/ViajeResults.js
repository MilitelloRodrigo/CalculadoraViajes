/* ==========================================================================
   VIAJE RESULTS COMPONENT
   Modular client-side Web Component representing the travel balances and settlements.
   ========================================================================== */

class ViajeResults extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="glass-panel panel-highlight" id="panel-results">
        <div class="panel-header">
          <span class="panel-emoji">📊</span>
          <h3>5. Cuentas Claras y Liquidación</h3>
        </div>

        <!-- SALDOS INDIVIDUALES -->
        <div class="results-sub-section">
          <h4>Balances del Grupo</h4>
          <div class="balances-wrapper" id="balances-list">
            <div class="empty-state-small">Cargá participantes, viajes y gastos para ver los balances.</div>
          </div>
        </div>

        <!-- LIQUIDACION INTELIGENTE (QUIEN DEBE A QUIEN) -->
        <div class="results-sub-section border-top">
          <div class="sub-section-header">
            <h4>¿Cómo saldar las deudas?</h4>
            <span class="badge badge-info">Liquidación Mínima</span>
          </div>
          
          <div class="settlements-wrapper" id="settlements-list">
            <div class="empty-state-small">Todos al día. ¡No hay deudas de tramos pendientes! 🎉</div>
          </div>
        </div>

        <!-- WHATSAPP EXPORT AREA -->
        <div class="export-area" id="export-area" style="display: none;">
          <button id="whatsapp-share-btn" class="btn btn-whatsapp btn-full">
            <svg class="icon-inline"><use href="#icon-whatsapp"></use></svg>
            <span>Copiar Resumen para WhatsApp</span>
          </button>
        </div>
      </section>
    `;
  }
}

customElements.define('viaje-results', ViajeResults);
