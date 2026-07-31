import crypto from 'crypto';
import { readExpenses, writeExpenses } from '../utils/storage.js';

// Validation middleware for creating an expense
export function validateExpense(req, res, next) {
  const { title, amount, category, date } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
  }

  if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Amount is required and must be a positive number.' });
  }

  if (!category || typeof category !== 'string' || category.trim() === '') {
    return res.status(400).json({ error: 'Category is required and must be a non-empty string.' });
  }

  if (!date || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Date is required and must be in YYYY-MM-DD format.' });
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: 'Provided date is invalid.' });
  }

  next();
}

// 1. Add an expense
export async function addExpense(req, res, next) {
  try {
    const { title, amount, category, date } = req.body;
    const expenses = await readExpenses();

    const newExpense = {
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: Number(amount),
      category: category.trim(),
      date
    };

    expenses.push(newExpense);
    await writeExpenses(expenses);

    res.status(201).json(newExpense);
  } catch (error) {
    next(error);
  }
}

// 2. View all expenses (optionally filtered by category)
export async function getAllExpenses(req, res, next) {
  try {
    const { category } = req.query;
    const expenses = await readExpenses();

    if (category) {
      const filtered = expenses.filter(
        exp => exp.category.toLowerCase() === category.trim().toLowerCase()
      );
      return res.json(filtered);
    }

    res.json(expenses);
  } catch (error) {
    next(error);
  }
}

// 3. Calculate total expenses (overall and by category)
export async function calculateTotal(req, res, next) {
  try {
    const { category } = req.query;
    const expenses = await readExpenses();

    let filtered = expenses;
    if (category) {
      filtered = expenses.filter(
        exp => exp.category.toLowerCase() === category.trim().toLowerCase()
      );
    }

    const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);
    const roundedTotal = Math.round(total * 100) / 100;

    res.json({
      total: roundedTotal,
      category: category ? category.trim() : 'all'
    });
  } catch (error) {
    next(error);
  }
}

// 4. Delete an expense
export async function deleteExpense(req, res, next) {
  try {
    const { id } = req.params;
    const expenses = await readExpenses();

    const initialLength = expenses.length;
    const updatedExpenses = expenses.filter(exp => exp.id !== id);

    if (updatedExpenses.length === initialLength) {
      return res.status(404).json({ error: `Expense with ID ${id} not found.` });
    }

    await writeExpenses(updatedExpenses);
    res.json({ message: 'Expense deleted successfully.' });
  } catch (error) {
    next(error);
  }
}
