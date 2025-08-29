# 💰 Expense Tracker

A simple and modern React application to track your daily expenses, view them in a clean table, and visualise your spending habits with a built-in pie chart.  
All amounts are displayed in Israeli Shekels (₪) by default.

## ✨ Features
- **Add Expenses**: Record a description, amount, category (Food, Transport, Shopping, Utilities, Other), and an optional date.
- **Manage Expenses**: View your transactions in a table, edit or remove entries easily.
- **Visualise Spending**: A colour-coded pie chart shows your total spending per category.
- **Lightweight**: Built with modern React and vanilla HTML5 `<canvas>` — no external chart libraries required.

## ⚙️ Getting Started

### Prerequisites
- Node.js (16+)
- npm
- A code editor (recommended: VS Code)

### Installation
```bash
# Clone the repo
git clone https://github.com/username/ExpenseTracker.git
cd ExpenseTracker

# Install dependencies
npm install
Running the App
bash
Copy code
# For Vite projects
npm run dev

# For Create React App
npm start
Open http://localhost:5173 (Vite) or http://localhost:3000.

📂 Project Structure
bash
Copy code
src/
 ├── App.js         # Main component
 ├── App.css        # Basic styling
 ├── components/    # Suggested: ExpenseForm, ExpenseList, PieChart
 └── assets/        # Optional: images / static files
🎨 Customisation
Categories: Update the categories array in App.js and adjust the colors object.

Currency: Replace "₪" with your preferred currency symbol.

Date Input: Uses HTML5 date picker. Replace with a custom input + validation if needed.

📜 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute it for educational or personal purposes.
