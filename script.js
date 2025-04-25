const form = document.getElementById("transaction-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const incomeDisplay = document.getElementById("total-income");
const expenseDisplay = document.getElementById("total-expense");
const balanceDisplay = document.getElementById("balance");
const list = document.getElementById("transaction-list");

let transactions = [
  { name: "Uang Jajan", amount: 50000, type: "income", category: "Lainnya" },
  { name: "Beli Makanan", amount: 20000, type: "expense", category: "Makanan" },
  { name: "Naik Angkot", amount: 8000, type: "expense", category: "Transport" }
];

function updateSummary() {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  incomeDisplay.textContent = income.toLocaleString("id-ID");
  expenseDisplay.textContent = expense.toLocaleString("id-ID");
  balanceDisplay.textContent = balance.toLocaleString("id-ID");
}

function renderTransactions() {
  list.innerHTML = "";

  if (transactions.length === 0) {
    list.innerHTML = "<li>Belum ada transaksi.</li>";
    return;
  }

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${t.name}</strong> - Rp ${t.amount.toLocaleString("id-ID")}
      <em>(${t.category}, ${t.type === "income" ? "Pemasukan" : "Pengeluaran"})</em>
      <button onclick="deleteTransaction(${index})">Hapus</button>
    `;
    list.appendChild(li);
  });
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
  updateSummary();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = parseInt(amountInput.value);
  const type = typeInput.value;
  const category = categoryInput.value;

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Masukkan data yang valid!");
    return;
  }

  transactions.push({ name, amount, type, category });

  form.reset();
  renderTransactions();
  updateSummary();
});

// Inisialisasi saat pertama kali dibuka
renderTransactions();
updateSummary();
