/* ==========================================================================
   VIAJE EXPENSES LIST COMPONENT
   Modular client-side Web Component representing the travel expenses list log.
   ========================================================================== */

class ViajeExpensesList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="glass-panel" id="panel-expenses-list">
        <div class="panel-header">
          <span class="panel-emoji">📋</span>
          <h3>4. Lista de Gastos Cargados</h3>
        </div>

        <div id="expenses-list" class="dynamic-list scrollable-list">
          <div class="empty-state">
            <span class="empty-emoji">💸</span>
            <p>No hay gastos registrados en este viaje.</p>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('viaje-expenses-list', ViajeExpensesList);
