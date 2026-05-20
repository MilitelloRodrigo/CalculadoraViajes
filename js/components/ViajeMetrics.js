/* ==========================================================================
   VIAJE METRICS COMPONENT
   Modular client-side Web Component representing the dynamic glowing
   metrics grid for travel and food totals.
   ========================================================================== */

class ViajeMetrics extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="metrics-grid">
        <div class="metric-card card-glow-green">
          <div class="metric-info">
            <span class="metric-label" id="lbl-metric-total">Gasto Total</span>
            <h2 id="metric-total-expense">$0,00</h2>
          </div>
          <div class="metric-visual visual-green">
            <span class="visual-emoji" id="emoji-metric-total">💵</span>
          </div>
        </div>
        <div class="metric-card card-glow-purple">
          <div class="metric-info">
            <span class="metric-label" id="lbl-metric-mid">Viajes Totales</span>
            <h2 id="metric-total-trips">0</h2>
          </div>
          <div class="metric-visual visual-purple">
            <span class="visual-emoji" id="emoji-metric-mid">🗺️</span>
          </div>
        </div>
        <div class="metric-card card-glow-blue">
          <div class="metric-info">
            <span class="metric-label" id="lbl-metric-right">Costo Promedio / Viaje</span>
            <h2 id="metric-trip-cost">$0,00</h2>
          </div>
          <div class="metric-visual visual-blue">
            <span class="visual-emoji" id="emoji-metric-right">⛽</span>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('viaje-metrics', ViajeMetrics);
