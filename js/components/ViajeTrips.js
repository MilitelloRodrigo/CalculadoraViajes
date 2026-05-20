/* ==========================================================================
   VIAJE TRIPS COMPONENT
   Modular client-side Web Component representing the trips manager panel.
   ========================================================================== */

class ViajeTrips extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="glass-panel" id="panel-trips">
        <div class="panel-header">
          <span class="panel-emoji">🗺️</span>
          <h3>2. Gestión de Viajes</h3>
        </div>

        <!-- Helper text first -->
        <div class="helper-text margin-bottom-md">
          <svg class="icon-inline-small"><use href="#icon-info"></use></svg>
          <span>Hacé clic en el nombre de cada persona para indicar si viajó en ese viaje.</span>
        </div>

        <!-- Trips list loaded dynamically -->
        <div id="trips-list" class="dynamic-list margin-bottom-md">
          <div class="empty-state">
            <span class="empty-emoji">🛣️</span>
            <p>No hay viajes creados. Cargá participantes y añadí un viaje abajo.</p>
          </div>
        </div>

        <!-- Button is always at the bottom -->
        <button id="add-trip-btn" class="btn btn-primary btn-full" disabled>
          <svg class="icon-inline"><use href="#icon-plus"></use></svg>
          <span>Añadir Nuevo Viaje</span>
        </button>
      </section>
    `;
  }
}

customElements.define('viaje-trips', ViajeTrips);
