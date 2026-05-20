/* ==========================================================================
   VIAJESPLIT UTILS MODULE
   Contains global helpers for unique ID generation, currency formatting,
   HTML escaping, and dynamic toast notifications.
   ========================================================================== */

// Unique ID Generator
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Spanish Currency Formatter (es-AR pesos)
export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Safe HTML Escape helper
export function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Toast Notification Injector
export function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let emoji = '✅';
  if (type === 'danger') emoji = '⚠️';
  if (type === 'info') emoji = 'ℹ️';
  
  toast.innerHTML = `<span>${emoji}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}
