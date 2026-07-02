const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Holding = require("../models/Holding");
const Transaction = require("../models/Transaction");
const { getQuote } = require("../utils/stockData");

const router = express.Router();

// GET /api/portfolio - balance, holdings with live valuation, and recent transactions
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const holdings = await Holding.find({ user: req.user.id });

    const enriched = holdings.map((h) => {
      const quote = getQuote(h.symbol);
      const currentPrice = quote ? quote.price : h.avgPrice;
      const marketValue = Number((currentPrice * h.quantity).toFixed(2));
      const investedValue = Number((h.avgPrice * h.quantity).toFixed(2));
      const pnl = Number((marketValue - investedValue).toFixed(2));
      return {
        symbol: h.symbol,
        quantity: h.quantity,
        avgPrice: h.avgPrice,
        currentPrice,
        marketValue,
        pnl,
      };
    });

    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);

    const holdingsValue = enriched.reduce((sum, h) => sum + h.marketValue, 0);

    res.json({
      balance: user.balance,
      holdingsValue: Number(holdingsValue.toFixed(2)),
      netWorth: Number((user.balance + holdingsValue).toFixed(2)),
      holdings: enriched,
      transactions,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
