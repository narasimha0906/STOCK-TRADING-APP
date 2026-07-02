const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Holding = require("../models/Holding");
const Transaction = require("../models/Transaction");
const { getQuote } = require("../utils/stockData");

const router = express.Router();

// POST /api/trade/buy  { symbol, quantity }
router.post("/buy", auth, async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const qty = Number(quantity);
    if (!symbol || !qty || qty <= 0) {
      return res.status(400).json({ message: "Symbol and positive quantity are required" });
    }

    const quote = getQuote(symbol);
    if (!quote) return res.status(404).json({ message: "Symbol not found" });

    const user = await User.findById(req.user.id);
    const cost = quote.price * qty;

    if (user.balance < cost) {
      return res.status(400).json({ message: "Insufficient virtual balance" });
    }

    user.balance -= cost;
    await user.save();

    let holding = await Holding.findOne({ user: user._id, symbol: quote.symbol });
    if (holding) {
      const totalCost = holding.avgPrice * holding.quantity + cost;
      holding.quantity += qty;
      holding.avgPrice = Number((totalCost / holding.quantity).toFixed(2));
      await holding.save();
    } else {
      holding = await Holding.create({
        user: user._id,
        symbol: quote.symbol,
        quantity: qty,
        avgPrice: quote.price,
      });
    }

    await Transaction.create({
      user: user._id,
      symbol: quote.symbol,
      type: "BUY",
      quantity: qty,
      price: quote.price,
      total: cost,
    });

    res.json({ message: "Buy order executed", balance: user.balance, holding });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/trade/sell  { symbol, quantity }
router.post("/sell", auth, async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const qty = Number(quantity);
    if (!symbol || !qty || qty <= 0) {
      return res.status(400).json({ message: "Symbol and positive quantity are required" });
    }

    const quote = getQuote(symbol);
    if (!quote) return res.status(404).json({ message: "Symbol not found" });

    const holding = await Holding.findOne({ user: req.user.id, symbol: quote.symbol });
    if (!holding || holding.quantity < qty) {
      return res.status(400).json({ message: "Not enough shares to sell" });
    }

    const proceeds = quote.price * qty;
    const user = await User.findById(req.user.id);
    user.balance += proceeds;
    await user.save();

    holding.quantity -= qty;
    if (holding.quantity === 0) {
      await holding.deleteOne();
    } else {
      await holding.save();
    }

    await Transaction.create({
      user: user._id,
      symbol: quote.symbol,
      type: "SELL",
      quantity: qty,
      price: quote.price,
      total: proceeds,
    });

    res.json({ message: "Sell order executed", balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
