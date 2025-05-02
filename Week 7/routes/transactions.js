const express = require('express');
const Transaction = require('../models/Transaction');

module.exports = (io) => {
  const router = express.Router();

  // Get all transactions
  router.get('/', async (req, res) => {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  });

  // Add a new transaction
  router.post('/', async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    io.emit('transactionAdded', transaction);
    res.status(201).json(transaction);
  });

  // Delete a transaction
  router.delete('/:id', async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    io.emit('transactionDeleted', req.params.id);
    res.json({ message: 'Transaction deleted' });
  });

  return router;
};
