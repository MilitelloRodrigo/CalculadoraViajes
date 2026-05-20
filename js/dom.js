/* ==========================================================================
   VIAJESPLIT DOM MODULE
   Controls reactive UI rendering, dynamic select box loaders,
   and dynamic item delete listeners (participants, trips, expenses).
   ========================================================================== */

import { state, saveState } from './state.js';
import { formatCurrency, showToast, escapeHtml } from './utils.js';
import { computeTravelSplitResults, computeFoodSplitResults } from './math.js';

// --- MAIN RENDER INVOCATION ---
export function render() {
  const travelContents = document.querySelectorAll('.travel-content');
  const foodContents = document.querySelectorAll('.food-content');
  const tabBtnTravel = document.getElementById('tab-btn-travel');
  const tabBtnFood = document.getElementById('tab-btn-food');

  // 1. Theme application
  document.documentElement.setAttribute('data-theme', state.theme);
  
  // 2. Tab selection and visibilities
  if (state.activeTab === 'travel') {
    tabBtnTravel.classList.add('active');
    tabBtnFood.classList.remove('active');
    travelContents.forEach(c => c.classList.remove('hidden-tab'));
    foodContents.forEach(c => c.classList.add('hidden-tab'));
  } else {
    tabBtnTravel.classList.remove('active');
    tabBtnFood.classList.add('active');
    travelContents.forEach(c => c.classList.add('hidden-tab'));
    foodContents.forEach(c => c.classList.remove('hidden-tab'));
  }
  
  // 3. Process calculations
  const travelResults = computeTravelSplitResults();
  const foodResults = computeFoodSplitResults();
  
  // 4. Update dynamic dashboard metrics
  const lblMetricTotal = document.getElementById('lbl-metric-total');
  const emojiMetricTotal = document.getElementById('emoji-metric-total');
  const totalExpenseMetric = document.getElementById('metric-total-expense');
  const lblMetricMid = document.getElementById('lbl-metric-mid');
  const emojiMetricMid = document.getElementById('emoji-metric-mid');
  const totalTripsMetric = document.getElementById('metric-total-trips');
  const lblMetricRight = document.getElementById('lbl-metric-right');
  const emojiMetricRight = document.getElementById('emoji-metric-right');
  const tripCostMetric = document.getElementById('metric-trip-cost');

  if (state.activeTab === 'travel') {
    lblMetricTotal.textContent = "Gasto Total (Viaje)";
    emojiMetricTotal.textContent = "💵";
    totalExpenseMetric.textContent = formatCurrency(travelResults.totalExpense);
    
    lblMetricMid.textContent = "Viajes Totales";
    emojiMetricMid.textContent = "🗺️";
    totalTripsMetric.textContent = state.trips.length;
    
    lblMetricRight.textContent = "Costo Promedio / Viaje";
    emojiMetricRight.textContent = "⛽";
    const avgCost = state.trips.length > 0 ? travelResults.totalExpense / state.trips.length : 0;
    tripCostMetric.textContent = formatCurrency(avgCost);
  } else {
    lblMetricTotal.textContent = "Gasto Total (Comida)";
    emojiMetricTotal.textContent = "🍔";
    totalExpenseMetric.textContent = formatCurrency(foodResults.totalExpense);
    
    lblMetricMid.textContent = "Integrantes";
    emojiMetricMid.textContent = "👥";
    totalTripsMetric.textContent = state.participants.length;
    
    lblMetricRight.textContent = "Costo por Persona";
    emojiMetricRight.textContent = "💰";
    tripCostMetric.textContent = formatCurrency(foodResults.costPerPerson);
  }
  
  // 5. Shared Participants list badge rendering
  const participantsList = document.getElementById('participants-list');
  const addTripBtn = document.getElementById('add-trip-btn');
  
  if (state.participants.length === 0) {
    participantsList.innerHTML = `<div class="empty-state-small">Aún no hay integrantes en el viaje. ¡Añadí el primero!</div>`;
    if (addTripBtn) addTripBtn.disabled = true;
  } else {
    if (addTripBtn) addTripBtn.disabled = false;
    participantsList.innerHTML = state.participants.map(part => {
      return `
        <div class="participant-badge" data-id="${part.id}">
          <span>👤 ${escapeHtml(part.name)}</span>
          <button type="button" class="btn-delete-mini btn-delete-participant" aria-label="Eliminar a ${part.name}">
            <svg class="icon-inline-small"><use href="#icon-trash"></use></svg>
          </button>
        </div>
      `;
    }).join('');
    
    attachParticipantListeners();
  }
  
  // 6. Conditional Content
  if (state.activeTab === 'travel') {
    renderTravelSubPanels(travelResults);
  } else {
    renderFoodSubPanels(foodResults);
  }
}

// Render sub-sections of Travel Tab
function renderTravelSubPanels(results) {
  const tripsList = document.getElementById('trips-list');
  const expensePayerSelect = document.getElementById('expense-payer');
  const expenseTripSelect = document.getElementById('expense-trip');
  const addExpenseSubmitBtn = document.getElementById('btn-add-expense');
  const expensesList = document.getElementById('expenses-list');
  const exportArea = document.getElementById('export-area');
  const balancesList = document.getElementById('balances-list');
  const settlementsList = document.getElementById('settlements-list');

  // Trips list cards
  if (state.trips.length === 0) {
    tripsList.innerHTML = `
      <div class="empty-state">
        <span class="empty-emoji">🛣️</span>
        <p>No hay viajes creados. Cargá participantes y añadí un viaje arriba.</p>
      </div>
    `;
  } else {
    tripsList.innerHTML = state.trips.map(trip => {
      const travelerCount = trip.participantIds.length;
      const chipsHtml = state.participants.map(part => {
        const isTraveling = trip.participantIds.includes(part.id);
        const chipClass = isTraveling ? 'chip-active' : 'chip-inactive';
        const checkedIcon = isTraveling ? '✓ ' : '+ ';
        return `
          <button type="button" class="chip ${chipClass}" data-part-id="${part.id}">
            <span>${checkedIcon}${escapeHtml(part.name)}</span>
          </button>
        `;
      }).join('');
      
      return `
        <div class="trip-card" data-trip-id="${trip.id}">
          <div class="trip-card-header">
            <div class="trip-name-group">
              <span class="trip-title">📍 ${escapeHtml(trip.name)}</span>
              <span class="trip-passenger-count">${travelerCount} ${travelerCount === 1 ? 'viajero' : 'viajeros'}</span>
            </div>
            <button type="button" class="btn-delete-mini btn-delete-trip" aria-label="Eliminar viaje">
              <svg class="icon-inline"><use href="#icon-trash"></use></svg>
            </button>
          </div>
          <div class="traveler-chips-container">
            ${chipsHtml}
          </div>
        </div>
      `;
    }).join('');
    
    attachTripListListeners();
  }
  
  // Payer and Trip select dropdowns logic
  if (state.participants.length === 0) {
    expensePayerSelect.innerHTML = `<option value="" disabled selected>Cargá participantes primero...</option>`;
    expensePayerSelect.disabled = true;
    expenseTripSelect.innerHTML = `<option value="general" selected>🌐 Gasto General (Todos)</option>`;
    expenseTripSelect.disabled = true;
    addExpenseSubmitBtn.disabled = true;
  } else if (state.trips.length === 0) {
    expensePayerSelect.disabled = false;
    populatePayerDropdown(expensePayerSelect);
    expenseTripSelect.innerHTML = `<option value="general" selected>🌐 Gasto General (Todos)</option>`;
    expenseTripSelect.disabled = true;
    addExpenseSubmitBtn.disabled = true;
  } else {
    expensePayerSelect.disabled = false;
    expenseTripSelect.disabled = false;
    addExpenseSubmitBtn.disabled = false;
    populatePayerDropdown(expensePayerSelect);
    populateTripDropdown(expenseTripSelect);
  }
  
  // Travel expenses list
  if (state.expenses.length === 0) {
    expensesList.innerHTML = `
      <div class="empty-state">
        <span class="empty-emoji">💸</span>
        <p>No hay gastos de viaje registrados.</p>
      </div>
    `;
    exportArea.style.display = 'none';
  } else {
    expensesList.innerHTML = state.expenses.map(exp => {
      const payer = state.participants.find(p => p.id === exp.payerId);
      const payerName = payer ? payer.name : 'Desconocido';
      const tripBadgeHtml = exp.tripId === 'general' 
        ? `<span class="trip-allocation-badge">🌐 General</span>` 
        : `<span class="trip-allocation-badge">📍 ${escapeHtml((state.trips.find(t => t.id === exp.tripId) || {name: 'Desconocido'}).name)}</span>`;
        
      return `
        <div class="expense-item" data-id="${exp.id}">
          <div class="expense-info">
            <div class="expense-title-row">
              <span class="expense-name">${escapeHtml(exp.desc)}</span>
              <span class="category-badge cat-${exp.category}">${getCategoryLabel(exp.category)}</span>
              ${tripBadgeHtml}
            </div>
            <div class="expense-meta-row">
              Pagó <span class="payer-name">${escapeHtml(payerName)}</span>
            </div>
          </div>
          <div class="expense-right">
            <span class="expense-amount">${formatCurrency(exp.amount)}</span>
            <button type="button" class="btn-delete-mini btn-delete-expense" aria-label="Eliminar gasto">
              <svg class="icon-inline"><use href="#icon-trash"></use></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
    
    exportArea.style.display = 'block';
    attachExpenseListListeners();
  }
  
  // Travel Balances List
  if (state.participants.length === 0 || state.trips.length === 0) {
    balancesList.innerHTML = `<div class="empty-state-small">Cargá participantes y viajes para ver los balances.</div>`;
  } else {
    balancesList.innerHTML = results.balances.map(b => {
      const pillClass = b.balance > 0.01 ? 'balance-positive' : (b.balance < -0.01 ? 'balance-negative' : 'balance-neutral');
      const sign = b.balance > 0.01 ? '+' : '';
      const statusText = b.balance > 0.01 ? 'A favor' : (b.balance < -0.01 ? 'Debe' : 'Al día');
      
      return `
        <div class="balance-row">
          <div class="balance-person">
            <span class="balance-person-name">${escapeHtml(b.name)}</span>
            <span class="balance-person-math">Debe pagar cuota: ${formatCurrency(b.fairShare)}</span>
          </div>
          <div class="balance-amount-col">
            <span class="balance-pill ${pillClass}">${sign}${formatCurrency(b.balance)}</span>
            <span class="balance-sub">${statusText} (Pagó ${formatCurrency(b.paid)})</span>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Travel Settlements List
  if (results.settlements.length === 0) {
    settlementsList.innerHTML = `<div class="empty-state-small">Todos al día. ¡No hay deudas de viajes pendientes! 🎉</div>`;
  } else {
    settlementsList.innerHTML = results.settlements.map(s => {
      return `
        <div class="settlement-card">
          <div class="settlement-visual-flow">
            <div class="settlement-actor">
              <span class="settlement-name">${escapeHtml(s.from)}</span>
              <span class="settlement-role debtor-text">Debe</span>
            </div>
            <div class="settlement-arrow-container">
              <div class="settlement-arrow"></div>
            </div>
            <div class="settlement-actor">
              <span class="settlement-name">${escapeHtml(s.to)}</span>
              <span class="settlement-role creditor-text">Recibe</span>
            </div>
          </div>
          <div class="settlement-amount-pill">${formatCurrency(s.amount)}</div>
        </div>
      `;
    }).join('');
  }
}

// Render sub-sections of Food Tab
function renderFoodSubPanels(results) {
  const foodPayerSelect = document.getElementById('food-payer');
  const addFoodExpenseSubmitBtn = document.getElementById('btn-add-food-expense');
  const foodExpensesList = document.getElementById('food-expenses-list');
  const foodExportArea = document.getElementById('food-export-area');
  const foodBalancesList = document.getElementById('food-balances-list');
  const foodSettlementsList = document.getElementById('food-settlements-list');

  // Payer dropdown selection for Food
  if (state.participants.length === 0) {
    foodPayerSelect.innerHTML = `<option value="" disabled selected>Cargá participantes primero...</option>`;
    foodPayerSelect.disabled = true;
    addFoodExpenseSubmitBtn.disabled = true;
  } else {
    foodPayerSelect.disabled = false;
    addFoodExpenseSubmitBtn.disabled = false;
    populatePayerDropdown(foodPayerSelect);
  }
  
  // Food expenses list
  if (state.foodExpenses.length === 0) {
    foodExpensesList.innerHTML = `
      <div class="empty-state">
        <span class="empty-emoji">🍔</span>
        <p>No hay gastos de comida registrados.</p>
      </div>
    `;
    foodExportArea.style.display = 'none';
  } else {
    foodExpensesList.innerHTML = state.foodExpenses.map(exp => {
      const payer = state.participants.find(p => p.id === exp.payerId);
      const payerName = payer ? payer.name : 'Desconocido';
      
      return `
        <div class="expense-item" data-id="${exp.id}">
          <div class="expense-info">
            <div class="expense-title-row">
              <span class="expense-name">${escapeHtml(exp.desc)}</span>
              <span class="category-badge cat-comida">🍔 Comida</span>
            </div>
            <div class="expense-meta-row">
              Pagó <span class="payer-name">${escapeHtml(payerName)}</span>
            </div>
          </div>
          <div class="expense-right">
            <span class="expense-amount">${formatCurrency(exp.amount)}</span>
            <button type="button" class="btn-delete-mini btn-delete-food-expense" aria-label="Eliminar gasto">
              <svg class="icon-inline"><use href="#icon-trash"></use></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
    
    foodExportArea.style.display = 'block';
    attachFoodExpenseListListeners();
  }
  
  // Food Balances List
  if (state.participants.length === 0) {
    foodBalancesList.innerHTML = `<div class="empty-state-small">Cargá participantes para ver los balances.</div>`;
  } else {
    foodBalancesList.innerHTML = results.balances.map(b => {
      const pillClass = b.balance > 0.01 ? 'balance-positive' : (b.balance < -0.01 ? 'balance-negative' : 'balance-neutral');
      const sign = b.balance > 0.01 ? '+' : '';
      const statusText = b.balance > 0.01 ? 'A favor' : (b.balance < -0.01 ? 'Debe' : 'Al día');
      
      return `
        <div class="balance-row">
          <div class="balance-person">
            <span class="balance-person-name">${escapeHtml(b.name)}</span>
            <span class="balance-person-math">Debe pagar cuota igualitaria: ${formatCurrency(b.fairShare)}</span>
          </div>
          <div class="balance-amount-col">
            <span class="balance-pill ${pillClass}">${sign}${formatCurrency(b.balance)}</span>
            <span class="balance-sub">${statusText} (Pagó ${formatCurrency(b.paid)})</span>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Food Settlements List
  if (results.settlements.length === 0) {
    foodSettlementsList.innerHTML = `<div class="empty-state-small">Todos al día. ¡No hay deudas de comida pendientes! 🎉</div>`;
  } else {
    foodSettlementsList.innerHTML = results.settlements.map(s => {
      return `
        <div class="settlement-card">
          <div class="settlement-visual-flow">
            <div class="settlement-actor">
              <span class="settlement-name">${escapeHtml(s.from)}</span>
              <span class="settlement-role debtor-text">Debe</span>
            </div>
            <div class="settlement-arrow-container">
              <div class="settlement-arrow"></div>
            </div>
            <div class="settlement-actor">
              <span class="settlement-name">${escapeHtml(s.to)}</span>
              <span class="settlement-role creditor-text">Recibe</span>
            </div>
          </div>
          <div class="settlement-amount-pill">${formatCurrency(s.amount)}</div>
        </div>
      `;
    }).join('');
  }
}

// Populate Payer dropdown selection helper
export function populatePayerDropdown(selectElement) {
  const currentSelection = selectElement.value;
  let optionsHtml = '<option value="" disabled>Seleccioná quién pagó...</option>';
  
  state.participants.forEach(part => {
    const selected = part.id === currentSelection ? 'selected' : '';
    optionsHtml += `<option value="${part.id}" ${selected}>👤 ${escapeHtml(part.name)}</option>`;
  });
  
  selectElement.innerHTML = optionsHtml;
  
  if (!currentSelection || !state.participants.some(p => p.id === currentSelection)) {
    selectElement.value = state.participants[0].id;
  }
}

// Populate Travel Trip dropdown selector helper
export function populateTripDropdown(selectElement) {
  const currentSelection = selectElement.value;
  
  let optionsHtml = `
    <option value="general" ${currentSelection === 'general' ? 'selected' : ''}>🌐 Gasto General (Todos)</option>
    <option value="" disabled>──────────────────</option>
  `;
  
  state.trips.forEach(trip => {
    const selected = trip.id === currentSelection ? 'selected' : '';
    optionsHtml += `<option value="${trip.id}" ${selected}>📍 ${escapeHtml(trip.name)}</option>`;
  });
  
  selectElement.innerHTML = optionsHtml;
}

// Helper category text formatting
function getCategoryLabel(cat) {
  const mapping = {
    nafta: '🚗 Nafta',
    peaje: '🛣️ Peaje',
    comida: '🍔 Comida',
    alojamiento: '🏨 Hospedaje',
    otros: '⚙️ Otros'
  };
  return mapping[cat] || '⚙️ Gasto';
}


// --- ATTACH DYNAMIC INTERACTIVE LISTENERS ---

function attachParticipantListeners() {
  const participantsList = document.getElementById('participants-list');
  const badges = participantsList.querySelectorAll('.participant-badge');
  
  badges.forEach(badge => {
    const id = badge.getAttribute('data-id');
    badge.querySelector('.btn-delete-participant').addEventListener('click', (e) => {
      e.stopPropagation();
      const part = state.participants.find(p => p.id === id);
      if (!part) return;
      
      // Clean trip passenger logs
      state.trips.forEach(trip => {
        trip.participantIds = trip.participantIds.filter(pid => pid !== id);
      });
      
      const travelCount = state.expenses.filter(exp => exp.payerId === id).length;
      const foodCount = state.foodExpenses.filter(exp => exp.payerId === id).length;
      
      if (travelCount > 0 || foodCount > 0) {
        state.expenses = state.expenses.filter(exp => exp.payerId !== id);
        state.foodExpenses = state.foodExpenses.filter(exp => exp.payerId !== id);
        state.participants = state.participants.filter(p => p.id !== id);
        saveState();
        render();
        showToast(`Se eliminó a ${part.name} y sus gastos asociados.`, 'danger');
      } else {
        state.participants = state.participants.filter(p => p.id !== id);
        saveState();
        render();
        showToast(`Se eliminó a ${part.name}.`, 'info');
      }
    });
  });
}

function attachTripListListeners() {
  const tripsList = document.getElementById('trips-list');
  const cards = tripsList.querySelectorAll('.trip-card');
  
  cards.forEach(card => {
    const tripId = card.getAttribute('data-trip-id');
    
    // Delete Trip card
    card.querySelector('.btn-delete-trip').addEventListener('click', () => {
      const trip = state.trips.find(t => t.id === tripId);
      if (!trip) return;
      
      const hasExpenses = state.expenses.some(exp => exp.tripId === tripId);
      if (hasExpenses) {
        state.expenses = state.expenses.filter(exp => exp.tripId !== tripId);
        state.trips = state.trips.filter(t => t.id !== tripId);
        saveState();
        render();
        showToast(`Se eliminó "${trip.name}" y sus gastos asociados.`, 'danger');
      } else {
        state.trips = state.trips.filter(t => t.id !== tripId);
        saveState();
        render();
        showToast(`Se eliminó "${trip.name}".`, 'info');
      }
    });
    
    // Traveler chips toggling
    const chips = card.querySelectorAll('.chip');
    chips.forEach(chip => {
      const partId = chip.getAttribute('data-part-id');
      chip.addEventListener('click', () => {
        const trip = state.trips.find(t => t.id === tripId);
        if (!trip) return;
        
        if (trip.participantIds.includes(partId)) {
          trip.participantIds = trip.participantIds.filter(pid => pid !== partId);
        } else {
          trip.participantIds.push(partId);
        }
        saveState();
        render();
      });
    });
  });
}

function attachExpenseListListeners() {
  const expensesList = document.getElementById('expenses-list');
  const items = expensesList.querySelectorAll('.expense-item');
  items.forEach(card => {
    const id = card.getAttribute('data-id');
    card.querySelector('.btn-delete-expense').addEventListener('click', () => {
      const exp = state.expenses.find(e => e.id === id);
      if (exp) {
        state.expenses = state.expenses.filter(e => e.id !== id);
        saveState();
        render();
        showToast(`Se eliminó el gasto de viaje "${exp.desc}".`, 'info');
      }
    });
  });
}

function attachFoodExpenseListListeners() {
  const foodExpensesList = document.getElementById('food-expenses-list');
  const items = foodExpensesList.querySelectorAll('.expense-item');
  items.forEach(card => {
    const id = card.getAttribute('data-id');
    card.querySelector('.btn-delete-food-expense').addEventListener('click', () => {
      const exp = state.foodExpenses.find(e => e.id === id);
      if (exp) {
        state.foodExpenses = state.foodExpenses.filter(e => e.id !== id);
        saveState();
        render();
        showToast(`Se eliminó el gasto de comida "${exp.desc}".`, 'info');
      }
    });
  });
}
