import express from "express";
const app=express()
// Strategy Pattern
const strategies = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

// ECMAScript Modules
import { map, reduce } from 'lodash';

// REST API
app.get('/calculate', (req, res) => {
  const { operation, numbers } = req.query;
  const strategy = strategies[operation];

  // Functional Programming
  const result = reduce(map(numbers, Number), strategy);

  res.json({ result });
});

app.listen(3000, () => console.log('Server started on port 3000'));