Expense Tracker

This project is a React application that helps you track your spending. It lets you record expenses by date, amount, description and category, displays them in a list and visualises your spending by category in a pie chart. All amounts are shown in Israeli shekels (₪).

Features

Add an expense: Enter a description, amount, select a category (Food, Transport, Shopping, Utilities or Other) and optionally a date. Click Add Expense to record it.

View and manage expenses: A table lists all recorded expenses. Each row shows the date, description, amount and category and includes a Remove button to delete the entry.

Visualise spending: A colour‑coded pie chart summarises your total spending by category. A legend beneath the chart shows the category names and totals.

React & HTML5: The application is built with moder React and uses the HTML5 <canvas> element to draw the pie chart, so no extra chart libraries are required.

Getting Started
Prerequisites

Node.js (version 16 or higher) and npm installed on your machine.

A code editor: Visual Studio Code.

Installation

Clone this repository and navigate into the project folder:

git clone <repository-url>
cd expense-with-pie


Install dependencies:

npm install

Running the App

Start the development server:

npm run dev


For Create‑React‑App users use npm start. Open the local URL printed in the terminal (usually http://localhost:5173 for Vite or http://localhost:3000 for CRA) in your browser. You should see the Expense Tracker interface where you can start adding transactions. The pie chart updates automatically whenever you add or remove entries.

Project Structure

src/App.js – Main component that manages state, renders the input form, transaction table and pie chart. Uses useState to manage transactions and form fields, and a child PieChart component for drawing the chart.

src/App.css – Contains minimal styles for layout, tables, forms and the legend.

src/assets/ (optional) – A place to store images or other static assets if you extend the app.

You can break the app into smaller components (e.g. ExpenseForm, ExpenseList) if you prefer a more modular structure.

Customisation

Categories: Edit the categories array in App.js to add or remove spending categories and update the colors object to choose your own colour scheme.

Currency: The app displays amounts with the shekel sign (₪). To use another currency, change the currency symbol in the render functions (e.g. replace ₪ with $).

Date field: The date input uses the native HTML5 date picker for convenience. If you want to enforce a specific format, you can change it to a text field with a placeholder and add your own validation.

License

This project is provided for educational purposes and does not include any warranty. Feel free to modify and adapt it to your needs.