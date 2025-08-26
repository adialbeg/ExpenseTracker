import { useState, useEffect, useRef } from "react";
import "./App.css";

// Categories and colours for the pie chart legend
const categories = ["Food", "Transport", "Shopping", "Utilities", "Other"];
const colors = {
  Food: "#f94144",
  Transport: "#f3722c",
  Shopping: "#f8961e",
  Utilities: "#f9c74f",
  Other: "#90be6d"
};

// Pie chart component using canvas
function PieChart({ totals }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cats = Object.keys(totals);
    const totalAmount = cats.reduce((sum, c) => sum + totals[c], 0);
    let start = -0.5 * Math.PI;
    cats.forEach(cat => {
      const value = totals[cat];
      const slice = (value / totalAmount) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2 - 10,
        start,
        start + slice
      );
      ctx.fillStyle = colors[cat] || "#ccc";
      ctx.fill();
      start += slice;
    });
  }, [totals]);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef} width={300} height={300}></canvas>
      <div className="legend">
        {Object.entries(totals).map(([cat, total]) => (
          <div key={cat} className="legend-item">
            <span
              className="color-box"
              style={{ backgroundColor: colors[cat] }}
            ></span>
            <span>
              {cat} (₪{total.toFixed(2)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  // Form state for new expense
  const [form, setForm] = useState({
    date: "",
    desc: "",
    amount: "",
    category: categories[0]
  });

  // Transactions array
  const [transactions, setTransactions] = useState([]);

  // Log messages array
  const [logs, setLogs] = useState([]);

  // Update form fields
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add a new transaction and record a log entry
  const addTransaction = () => {
    const { date, desc, amount, category } = form;
    if (!desc || !amount) return;
    const newTx = {
      id: Date.now(),
      date,
      desc,
      amount: parseFloat(amount),
      category
    };
    setTransactions([...transactions, newTx]);
    setLogs(current =>
      current.concat(
        `Added "${desc}" (₪${parseFloat(amount).toFixed(
          2
        )}) in category ${category}${date ? " on " + date : ""}`
      )
    );
    setForm({ date: "", desc: "", amount: "", category: categories[0] });
  };

  // Remove a transaction by id and record a log entry
  const removeTransaction = id => {
    const tx = transactions.find(t => t.id === id);
    setTransactions(transactions.filter(t => t.id !== id));
    if (tx) {
      setLogs(current =>
        current.concat(
          `Removed "${tx.desc}" (₪${tx.amount.toFixed(
            2
          )}) from category ${tx.category}`
        )
      );
    }
  };

  // Compute totals per category
  const totals = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className="form">
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
        <input
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button onClick={addTransaction}>Add Expense</button>
      </div>

      {/* Transaction list */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.desc}</td>
              <td>₪{tx.amount.toFixed(2)}</td>
              <td>{tx.category}</td>
              <td>
                <button onClick={() => removeTransaction(tx.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pie chart */}
      {transactions.length > 0 && <PieChart totals={totals} />}

      {/* Action log */}
      {logs.length > 0 && (
        <div className="logs">
          <h2>Action Log</h2>
          <ul>
            {logs.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
