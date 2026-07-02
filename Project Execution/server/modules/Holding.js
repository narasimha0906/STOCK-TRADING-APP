const mongoose = require("mongoose");

const HoldingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    avgPrice: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

HoldingSchema.index({ user: 1, symbol: 1 }, { unique: true });

module.exports = mongoose.model("Holding", HoldingSchema);
