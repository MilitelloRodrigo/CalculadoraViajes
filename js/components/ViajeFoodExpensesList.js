/* ==========================================================================
   VIAJE FOOD EXPENSES LIST COMPONENT
   Modular client-side Web Component representing the food expenses list log.
   ========================================================================== */

class ViajeFoodExpensesList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="glass-panel" id="panel-food-expenses-list">
        <div class="panel-header">
          <span class="panel-emoji">📋</span>
          <h3>3. Lista de Gastos de Comida</h3>
        </div>

        <div id="food-expenses-list" class="dynamic-list scrollable-list">
          <div class="empty-state">
            <span class="empty-emoji">🍔</span>
            <p>No hay gastos de comida registrados en este viaje.</p>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('viaje-food-expenses-list', ViajeFoodExpensesList);
