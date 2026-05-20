/* ==========================================================================
   VIAJESPLIT STATE MODULE
   Handles reactive state storage, mutations, load state migrations, 
   and local storage synchronization.
   ========================================================================== */

export const STORAGE_KEY = 'viajesplit_tramos_state';

export const DEFAULT_STATE = {
  participants: [],
  trips: [],
  expenses: [],
  foodExpenses: [],
  activeTab: 'travel',
  theme: 'dark'
};

// Central state object. Properties are mutated in place to maintain reference integrity.
export const state = {
  participants: [],
  trips: [],
  expenses: [],
  foodExpenses: [],
  activeTab: 'travel',
  theme: 'dark'
};

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      
      // Perform clean schema migrations in place
      state.participants = Array.isArray(parsed.participants) ? parsed.participants : [];
      state.trips = Array.isArray(parsed.trips) ? parsed.trips : [];
      state.expenses = Array.isArray(parsed.expenses) ? parsed.expenses : [];
      state.foodExpenses = Array.isArray(parsed.foodExpenses) ? parsed.foodExpenses : [];
      state.activeTab = parsed.activeTab || 'travel';
      state.theme = parsed.theme || 'dark';
    } catch (e) {
      console.error("Error loading localStorage state:", e);
      resetState();
    }
  } else {
    resetState();
  }
}

export function resetState() {
  state.participants = [];
  state.trips = [];
  state.expenses = [];
  state.foodExpenses = [];
  state.activeTab = 'travel';
  state.theme = 'dark';
}
