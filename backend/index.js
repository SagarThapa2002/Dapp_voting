const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Route for health check or testing
app.get('/', (req, res) => {
  res.send("Voting DApp Backend Working!");
});

// Example route to get all candidates (you can modify this to interact with blockchain later)
app.get('/candidates', (req, res) => {
  const candidates = [
    { name: "Alice", voteCount: 0 },
    { name: "Bob", voteCount: 0 },
    { name: "Charlie", voteCount: 0 }
  ];
  res.json(candidates);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
