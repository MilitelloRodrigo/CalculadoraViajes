/* ==========================================================================
   VIAJESPLIT MATHEMATICAL ENGINES
   Core business formulas for:
   - Proportional Travel splits (Travel Engine)
   - Flat Equal Food sharing splits (Food Engine)
   - Minimizing transactions using the Greedy Debt Settlement Solver.
   ========================================================================== */

import { state } from './state.js';

// 🚗 ENGINE A: TRAVEL SPLIT (PROPORTIONAL BY TRIPS)
export function computeTravelSplitResults() {
  const totalExpense = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const activeTripsCount = state.trips.length;
  
  // 1. Calculate General Pool of Expenses
  const generalExpensesTotal = state.expenses
    .filter(exp => exp.tripId === 'general')
    .reduce((sum, exp) => sum + exp.amount, 0);
    
  const generalSharePerTrip = activeTripsCount > 0 ? generalExpensesTotal / activeTripsCount : 0;
  
  // 2. Compute Costs per individual trip
  const tripCosts = state.trips.map(trip => {
    const passengersCount = trip.participantIds.length;
    
    // Sum of expenses explicitly assigned to this specific trip
    const specificExpensesTotal = state.expenses
      .filter(exp => exp.tripId === trip.id)
      .reduce((sum, exp) => sum + exp.amount, 0);
      
    const totalTripCost = generalSharePerTrip + specificExpensesTotal;
    const sharePerPassenger = passengersCount > 0 ? totalTripCost / passengersCount : 0;
    
    return {
      id: trip.id,
      name: trip.name,
      passengerIds: trip.participantIds,
      passengersCount,
      specificExpensesTotal,
      totalTripCost,
      sharePerPassenger
    };
  });
  
  // 3. Compute Consolidates per Participant
  const balances = state.participants.map(part => {
    const paid = state.expenses
      .filter(exp => exp.payerId === part.id)
      .reduce((sum, exp) => sum + exp.amount, 0);
      
    let fairShare = 0;
    tripCosts.forEach(tc => {
      if (tc.passengerIds.includes(part.id)) {
        fairShare += tc.sharePerPassenger;
      }
    });
    
    const balance = paid - fairShare;
    
    return {
      id: part.id,
      name: part.name,
      paid,
      fairShare,
      balance
    };
  });
  
  // 4. Greedy Cash Flow Debt Minimizer
  const settlements = runGreedySettlement(balances);
  
  return {
    totalExpense,
    tripCosts,
    balances,
    settlements
  };
}

// 🍔 ENGINE B: FOOD SPLIT (EQUAL SHARING METHOD)
export function computeFoodSplitResults() {
  const totalExpense = state.foodExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const participantsCount = state.participants.length;
  
  // Cost per person (flat sharing)
  const costPerPerson = participantsCount > 0 ? totalExpense / participantsCount : 0;
  
  // Compute individual food balances
  const balances = state.participants.map(part => {
    const paid = state.foodExpenses
      .filter(exp => exp.payerId === part.id)
      .reduce((sum, exp) => sum + exp.amount, 0);
      
    const fairShare = costPerPerson;
    const balance = paid - fairShare;
    
    return {
      id: part.id,
      name: part.name,
      paid,
      fairShare,
      balance
    };
  });
  
  // Cash flow settlement for food
  const settlements = runGreedySettlement(balances);
  
  return {
    totalExpense,
    costPerPerson,
    balances,
    settlements
  };
}

// Greedy Settlement Algorithm (Consolidates debts into minimum cash flows)
export function runGreedySettlement(balances) {
  const settlements = [];
  
  let debtors = balances
    .filter(b => b.balance < -0.01)
    .map(b => ({ name: b.name, balance: b.balance }))
    .sort((a, b) => a.balance - b.balance);
    
  let creditors = balances
    .filter(b => b.balance > 0.01)
    .map(b => ({ name: b.name, balance: b.balance }))
    .sort((a, b) => b.balance - a.balance);
    
  let iterations = 0;
  const maxIterations = 100;
  
  while (debtors.length > 0 && creditors.length > 0 && iterations < maxIterations) {
    iterations++;
    
    let debtor = debtors[0];
    let creditor = creditors[0];
    
    const owedAmount = Math.abs(debtor.balance);
    const creditAmount = creditor.balance;
    const settledAmount = Math.min(owedAmount, creditAmount);
    
    if (settledAmount > 0.01) {
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: settledAmount
      });
    }
    
    debtor.balance += settledAmount;
    creditor.balance -= settledAmount;
    
    if (Math.abs(debtor.balance) < 0.01) debtors.shift();
    if (Math.abs(creditor.balance) < 0.01) creditors.shift();
    
    debtors.sort((a, b) => a.balance - b.balance);
    creditors.sort((a, b) => b.balance - a.balance);
  }
  
  return settlements;
}
