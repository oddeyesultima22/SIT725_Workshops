const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.status(200).json(transactions);
});

// Add a transaction
router.post('/', async (req, res) => {
  const { description, amount, type } = req.body;

  if (!description || !amount || !type || isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const newTransaction = new Transaction(req.body);
  await newTransaction.save();
  res.status(200).json(newTransaction);
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  const deleted = await Transaction.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  res.status(200).json({ message: 'Transaction deleted' });
});

module.exports = router;
