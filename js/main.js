/* ==========================================================================
   VIAJESPLIT APPLICATION ENTRY POINT (MAIN)
   Initializes application bindings, static form handlers, and 
   bootstraps the reactive loadState rendering sequence.
   ========================================================================== */

import { state, saveState, loadState, resetState } from './state.js';
import { generateId, showToast } from './utils.js';
import { render } from './dom.js';
import { copyTravelSummaryToClipboard, copyFoodSummaryToClipboard } from './whatsapp.js';

// --- Register Native Web Components ---
import './components/ViajeHeader.js';
import './components/ViajeMetrics.js';
import './components/ViajeParticipants.js';
import './components/ViajeTrips.js';
import './components/ViajeAddExpense.js';
import './components/ViajeAddFoodExpense.js';
import './components/ViajeExpensesList.js';
import './components/ViajeFoodExpensesList.js';
import './components/ViajeResults.js';
import './components/ViajeFoodResults.js';


document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial State Bootloader
  loadState();
  render();
  
  // --- 2. BIND FIXED STATIC ELEMENT LISTENERS ---
  
  // Theme selection toggler
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      saveState();
      render();
    });
  }

  // Tab Navigation Toggles
  const tabBtnTravel = document.getElementById('tab-btn-travel');
  const tabBtnFood = document.getElementById('tab-btn-food');

  if (tabBtnTravel) {
    tabBtnTravel.addEventListener('click', () => {
      state.activeTab = 'travel';
      saveState();
      render();
    });
  }
  if (tabBtnFood) {
    tabBtnFood.addEventListener('click', () => {
      state.activeTab = 'food';
      saveState();
      render();
    });
  }

  // Add Participant Form Submit
  const addParticipantForm = document.getElementById('add-participant-form');
  const participantNameInput = document.getElementById('participant-name');

  if (addParticipantForm && participantNameInput) {
    addParticipantForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = participantNameInput.value.trim();
      if (!name) return;
      
      const exists = state.participants.some(p => p.name.toLowerCase() === name.toLowerCase());
      if (exists) {
        showToast(`"${name}" ya existe en el grupo.`, 'danger');
        return;
      }
      
      const newPartId = generateId();
      state.participants.push({ id: newPartId, name });
      
      // Auto-add new traveler to all existing trips
      state.trips.forEach(trip => {
        trip.participantIds.push(newPartId);
      });
      
      saveState();
      render();
      showToast(`Se añadió a ${name}.`, 'success');
      
      participantNameInput.value = '';
      participantNameInput.focus();
    });
  }

  // Add Trip button click
  const addTripBtn = document.getElementById('add-trip-btn');
  if (addTripBtn) {
    addTripBtn.addEventListener('click', () => {
      if (state.participants.length === 0) {
        showToast("Añadí participantes antes de crear viajes.", "danger");
        return;
      }
      
      const tripNumber = state.trips.length + 1;
      const newTrip = {
        id: generateId(),
        name: `Viaje ${tripNumber}`,
        participantIds: state.participants.map(p => p.id)
      };
      
      state.trips.push(newTrip);
      saveState();
      render();
      showToast(`Se creó el "${newTrip.name}".`, 'success');
    });
  }

  // Add Travel Expense Form Submit
  const addExpenseForm = document.getElementById('add-expense-form');
  const expenseDescInput = document.getElementById('expense-desc');
  const expenseAmountInput = document.getElementById('expense-amount');
  const expenseCategoryInput = document.getElementById('expense-category');
  const expensePayerSelect = document.getElementById('expense-payer');
  const expenseTripSelect = document.getElementById('expense-trip');

  if (addExpenseForm) {
    addExpenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const desc = expenseDescInput.value.trim();
      const amount = parseFloat(expenseAmountInput.value);
      const category = expenseCategoryInput.value;
      const payerId = expensePayerSelect.value;
      const tripId = expenseTripSelect.value;
      
      if (!desc || isNaN(amount) || amount <= 0 || !payerId || !tripId) {
        showToast("Completá todos los campos del gasto de viaje.", "danger");
        return;
      }
      
      state.expenses.push({ id: generateId(), desc, amount, category, payerId, tripId });
      saveState();
      render();
      showToast(`Se registró el gasto de viaje: "${desc}".`, 'success');
      
      expenseDescInput.value = '';
      expenseAmountInput.value = '';
      expenseDescInput.focus();
    });
  }

  // Add Food Expense Form Submit
  const addFoodExpenseForm = document.getElementById('add-food-expense-form');
  const foodDescInput = document.getElementById('food-desc');
  const foodAmountInput = document.getElementById('food-amount');
  const foodPayerSelect = document.getElementById('food-payer');

  if (addFoodExpenseForm) {
    addFoodExpenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const desc = foodDescInput.value.trim();
      const amount = parseFloat(foodAmountInput.value);
      const payerId = foodPayerSelect.value;
      
      if (!desc || isNaN(amount) || amount <= 0 || !payerId) {
        showToast("Completá todos los campos del gasto de comida.", "danger");
        return;
      }
      
      state.foodExpenses.push({ id: generateId(), desc, amount, payerId });
      saveState();
      render();
      showToast(`Se registró el gasto de comida: "${desc}".`, 'success');
      
      foodDescInput.value = '';
      foodAmountInput.value = '';
      foodDescInput.focus();
    });
  }

  // Reset Modal Interactions
  const resetBtn = document.getElementById('reset-btn');
  const resetModal = document.getElementById('reset-modal');
  const cancelResetBtn = document.getElementById('cancel-reset-btn');
  const confirmResetBtn = document.getElementById('confirm-reset-btn');

  if (resetBtn && resetModal && cancelResetBtn && confirmResetBtn) {
    resetBtn.addEventListener('click', () => resetModal.classList.add('active'));
    cancelResetBtn.addEventListener('click', () => resetModal.classList.remove('active'));
    resetModal.addEventListener('click', (e) => {
      if (e.target === resetModal) resetModal.classList.remove('active');
    });

    confirmResetBtn.addEventListener('click', () => {
      resetState();
      saveState();
      render();
      resetModal.classList.remove('active');
      showToast("Se reiniciaron todos los datos a cero.", "info");
    });
  }

  // Clipboard export share clicks
  const whatsappShareBtn = document.getElementById('whatsapp-share-btn');
  const foodWhatsappShareBtn = document.getElementById('food-whatsapp-share-btn');

  if (whatsappShareBtn) {
    whatsappShareBtn.addEventListener('click', copyTravelSummaryToClipboard);
  }
  if (foodWhatsappShareBtn) {
    foodWhatsappShareBtn.addEventListener('click', copyFoodSummaryToClipboard);
  }
});
