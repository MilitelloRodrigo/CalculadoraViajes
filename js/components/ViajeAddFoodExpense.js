/* ==========================================================================
   VIAJE ADD FOOD EXPENSE COMPONENT
   Modular client-side Web Component representing the food expense loader panel.
   ========================================================================== */

class ViajeAddFoodExpense extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="glass-panel" id="panel-add-food-expense">
        <div class="panel-header">
          <span class="panel-emoji">🍔</span>
          <h3>2. Registrar Gasto de Comida</h3>
        </div>

        <form id="add-food-expense-form" class="panel-form-multi">
          <div class="form-row flex-column-mobile">
            <div class="form-group flex-2">
              <label for="food-desc">Descripción</label>
              <input type="text" id="food-desc" placeholder="ej. Cena Parrilla, Asado del Sábado" required autocomplete="off">
            </div>
            <div class="form-group flex-1">
              <label for="food-amount">Monto ($)</label>
              <div class="amount-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="number" id="food-amount" placeholder="0.00" min="0.01" step="any" required autocomplete="off">
              </div>
            </div>
          </div>

          <div class="form-row flex-column-mobile">
            <div class="form-group flex-1">
              <label for="food-payer">¿Quién pagó la comida?</label>
              <select id="food-payer" required disabled>
                <option value="" disabled selected>Cargá participantes primero...</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-success btn-full" id="btn-add-food-expense" disabled>
            <svg class="icon-inline"><use href="#icon-plus"></use></svg>
            <span>Agregar Gasto de Comida</span>
          </button>
        </form>
      </section>
    `;
  }
}

customElements.define('viaje-add-food-expense', ViajeAddFoodExpense);
