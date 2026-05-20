/* ==========================================================================
   VIAJESPLIT WHATSAPP REPORT COMPILER
   Compiles summaries into pretty-formatted Spanish reports with emojis,
   and copies them to the clipboard natively.
   ========================================================================== */

import { state } from './state.js';
import { formatCurrency, showToast } from './utils.js';
import { computeTravelSplitResults, computeFoodSplitResults } from './math.js';

// Travel Tab Exporter
export function copyTravelSummaryToClipboard() {
  const results = computeTravelSplitResults();
  if (state.participants.length === 0 || state.trips.length === 0 || state.expenses.length === 0) {
    showToast("Cargá participantes, viajes y gastos de viaje antes de copiar.", "danger");
    return;
  }
  
  let txt = `🐀 *Sin Ratonear (Viajes)* 🐀\n`;
  txt += `=========================\n\n`;
  
  txt += `📈 *Resumen:*\n`;
  txt += `• Gasto Total: *${formatCurrency(results.totalExpense)}*\n`;
  txt += `• Cantidad de Viajes: *${state.trips.length}*\n\n`;
  
  txt += `💸 *¿Cómo nos pagamos?*\n`;
  if (results.settlements.length === 0) {
    txt += `• ¡Todos al día! No hay deudas. 🎉\n`;
  } else {
    results.settlements.forEach(s => {
      txt += `• *${s.from}* ➔ *${s.to}*: *${formatCurrency(s.amount)}*\n`;
    });
  }
  
  txt += `\n🚀 _Liquidado con Sin Ratonear 🐀_`;
  
  navigator.clipboard.writeText(txt)
    .then(() => showToast("¡Resumen de Viajes copiado! Pegalo en WhatsApp 📲", "success"))
    .catch(err => showToast("No se pudo copiar automáticamente.", "danger"));
}

// Food Tab Exporter
export function copyFoodSummaryToClipboard() {
  const results = computeFoodSplitResults();
  if (state.participants.length === 0 || state.foodExpenses.length === 0) {
    showToast("Cargá participantes y gastos de comida antes de copiar.", "danger");
    return;
  }
  
  let txt = `🍔 *Sin Ratonear (Comida)* 🍔\n`;
  txt += `=========================\n\n`;
  
  txt += `📈 *Resumen:*\n`;
  txt += `• Gasto Total: *${formatCurrency(results.totalExpense)}*\n`;
  txt += `• Por persona: *${formatCurrency(results.costPerPerson)}*\n\n`;
  
  txt += `💸 *¿Cómo nos pagamos?*\n`;
  if (results.settlements.length === 0) {
    txt += `• ¡Todos al día en comida! 🎉\n`;
  } else {
    results.settlements.forEach(s => {
      txt += `• *${s.from}* ➔ *${s.to}*: *${formatCurrency(s.amount)}*\n`;
    });
  }
  
  txt += `\n🚀 _Liquidado con Sin Ratonear 🐀_`;
  
  navigator.clipboard.writeText(txt)
    .then(() => showToast("¡Resumen de Comida copiado! Pegalo en WhatsApp 📲", "success"))
    .catch(err => showToast("No se pudo copiar automáticamente.", "danger"));
}
