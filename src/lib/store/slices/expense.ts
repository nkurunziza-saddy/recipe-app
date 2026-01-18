import { createSlice } from "@reduxjs/toolkit";

export interface Expense {
  id: number;
  title: string;
  amount: number;
}

export interface ExpenseState {
  expenses: Expense[];
}

const initialState: ExpenseState = {
  expenses: [
    { id: 1, title: "Buy groceries", amount: 50 },
    { id: 2, title: "Buy shoes", amount: 50 },
  ],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export const { addExpense, removeExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
