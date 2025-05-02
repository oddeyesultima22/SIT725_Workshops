const form = document.getElementById('transaction-form');
const list = document.getElementById('transaction-list');
const socket = io(); // Connect to socket server

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    amount: parseFloat(document.getElementById('amount').value),
    type: document.getElementById('type').value,
    category: document.getElementById('category').value,
    description: document.getElementById('description').value
  };

  await fetch('/api/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  form.reset();
});

async function deleteTransaction(id) {
  await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
}

async function loadTransactions() {
  const res = await fetch('/api/transactions');
  const data = await res.json();
  renderList(data);
}

function renderList(data) {
  list.innerHTML = '';
  data.forEach(tx => {
    const li = document.createElement('li');
    li.classList.add(tx.type); // 'income' or 'expense' for styling
    li.innerHTML = `
      ${tx.type.toUpperCase()}: $${tx.amount} - ${tx.category} (${tx.description})
      <button class="delete-btn" onclick="deleteTransaction('${tx._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

// Real-time listeners
socket.on('transactionAdded', () => loadTransactions());
socket.on('transactionDeleted', () => loadTransactions());

loadTransactions();
