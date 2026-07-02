const express = require("express");
const { getStocks, getQuote } = require("../utils/stockData");

const router = express.Router();

// GET /api/stocks - full listing with simulated live prices
router.get("/", (req, res) => {
  res.json(getStocks());
});

// GET /api/stocks/:symbol - single quote
router.get("/:symbol", (req, res) => {
  const quote = getQuote(req.params.symbol);
  if (!quote) return res.status(404).json({ message: "Symbol not found" });
  res.json(quote);
});

module.exports = router;
