const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// Utility function to validate input numbers
const validateNumbers = (num1, num2, res) => {
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    return false;
  }
  return true;
};

// GET request for Addition
app.get("/add", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (!validateNumbers(num1, num2, res)) return;
  res.json({ result: num1 + num2 });
});

// GET request for Subtraction
app.get("/subtract", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (!validateNumbers(num1, num2, res)) return;
  res.json({ result: num1 - num2 });
});

// GET request for Multiplication
app.get("/multiply", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (!validateNumbers(num1, num2, res)) return;
  res.json({ result: num1 * num2 });
});

// GET request for Division
app.get("/divide", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (!validateNumbers(num1, num2, res)) return;
  if (num2 === 0) {
    return res.status(400).json({ error: "Division by zero is not allowed." });
  }
  res.json({ result: num1 / num2 });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
