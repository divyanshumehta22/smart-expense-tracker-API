import { Router } from 'express';
import {
  validateExpense,
  addExpense,
  getAllExpenses,
  calculateTotal,
  deleteExpense
} from '../controllers/expenseController.js';

const router = Router();

// Routes relative to /api/expenses
router.post('/', validateExpense, addExpense);
router.get('/', getAllExpenses);
router.get('/total', calculateTotal);
router.delete('/:id', deleteExpense);

export default router;
