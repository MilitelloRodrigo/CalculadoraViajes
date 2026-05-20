/* ==========================================================================
   VIAJE ADD EXPENSE COMPONENT
   Modular client-side Web Component representing the travel expense loader panel.
   ========================================================================== */

class ViajeAddExpense extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="glass-panel" id="panel-add-expense">
        <div class="panel-header">
          <span class="panel-emoji">💰</span>
          <h3>3. Registrar Gasto de Viaje</h3>
        </div>

        <form id="add-expense-form" class="panel-form-multi">
          <div class="form-row flex-column-mobile">
            <div class="form-group flex-2">
              <label for="expense-desc">Descripción</label>
              <input type="text" id="expense-desc" placeholder="ej. Nafta YPF, Peaje Hudson" required autocomplete="off">
            </div>
            <div class="form-group flex-1">
              <label for="expense-category">Categoría</label>
              <select id="expense-category" required>
                <option value="nafta">🚗 Nafta / Gasoil</option>
                <option value="peaje">🛣️ Peaje</option>
                <option value="comida">🍔 Comida</option>
                <option value="alojamiento">🏨 Hospedaje</option>
                <option value="otros" selected>⚙️ Otros</option>
              </select>
            </div>
          </div>

          <div class="form-row flex-column-mobile">
            <div class="form-group flex-1">
              <label for="expense-amount">Monto ($)</label>
              <div class="amount-input-wrapper">
                <span class="currency-symbol">$</span>
                <input type="number" id="expense-amount" placeholder="0.00" min="0.01" step="any" required autocomplete="off">
              </div>
            </div>
            <div class="form-group flex-1">
              <label for="expense-payer">¿Quién pagó?</label>
              <select id="expense-payer" required disabled>
                <option value="" disabled selected>Cargá participantes primero...</option>
              </select>
            </div>
            <div class="form-group flex-1">
              <label for="expense-trip">¿En qué viaje?</label>
              <select id="expense-trip" required disabled>
                <option value="general" selected>🌐 Gasto General (Todos)</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-success btn-full" id="btn-add-expense" disabled>
            <svg class="icon-inline"><use href="#icon-plus"></use></svg>
            <span>Agregar Gasto de Viaje</span>
          </button>
        </form>
      </section>
    `;
  }
}

customElements.define('viaje-add-expense', ViajeAddExpense);
