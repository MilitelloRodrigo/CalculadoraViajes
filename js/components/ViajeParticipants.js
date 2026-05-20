/* ==========================================================================
   VIAJE PARTICIPANTS COMPONENT
   Modular client-side Web Component representing the shared panel for
   registering and viewing participants.
   ========================================================================== */

class ViajeParticipants extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="glass-panel" id="panel-participants">
        <div class="panel-header">
          <span class="panel-emoji">👥</span>
          <h3>1. Participantes del Grupo</h3>
        </div>
        
        <form id="add-participant-form" class="panel-form">
          <div class="input-group">
            <input type="text" id="participant-name" placeholder="Nombre (ej. Juan, María...)" required autocomplete="off">
            <button type="submit" class="btn btn-primary" aria-label="Agregar participante">
              <svg class="icon-inline"><use href="#icon-plus"></use></svg>
              <span>Añadir</span>
            </button>
          </div>
        </form>

        <!-- Participants list loaded dynamically -->
        <div id="participants-list" class="dynamic-list flex-row-wrap">
          <div class="empty-state-small">Aún no hay integrantes en el viaje. ¡Añadí el primero!</div>
        </div>
      </section>
    `;
  }
}

customElements.define('viaje-participants', ViajeParticipants);
