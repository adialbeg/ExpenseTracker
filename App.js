import { useState, useEffect, useRef } from "react"; //Maybe you should sort the const and function in a better readable flow so it will be easier to understand the function, maybe even put the helper function in a different file
import "./App.css";

// Define the categories and colours used in the pie chart
const categories = ["Food", "Transport", "Shopping", "Utilities", "Other"];
const colors = {
  Food: "#f94144",
  Transport: "#f3722c",
  Shopping: "#f8961e",
  Utilities: "#f9c74f",
  Other: "#90be6d"
};

// PieChart component draws a pie chart on a canvas based on totals per category
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
    <div>
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
  // form state for new entry
  const [form, setForm] = useState({
    date: "",
    desc: "",
    amount: "",
    category: categories[0]
  });
  // transactions array
  const [transactions, setTransactions] = useState([]);

  // update form fields
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add a new transaction
  const addTransaction = () => {
    const { date, desc, amount, category } = form;
    if (!desc || !amount) return; // simple validation
    const newTx = {
      id: Date.now(),
      date,
      desc,
      amount: parseFloat(amount),
      category
    };
    setTransactions([...transactions, newTx]);
    // reset form
    setForm({ date: "", desc: "", amount: "", category: categories[0] });
  };

  // remove a transaction by id
  const removeTransaction = id => {
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  // compute totals per category
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
          name="desc"    // i think it is a security problem: inject 
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

      {/* Transaction list */} // i think it would beneficial to maybe use a packge for the table- you could handle info better as an arry of object 
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

      {/* Pie chart appears only when there is data */}
      {transactions.length > 0 && <PieChart totals={totals} />}
    </div>
  );
}

export default App;

