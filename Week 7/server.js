const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/finance-tracker';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const transactionRoutes = require('./routes/transactions')(io);
app.use('/api/transactions', transactionRoutes);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
