import { useState } from "react";
import api from "../api/api.js";

export default function TradeModal({ stock, type, onClose, onDone }) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post(`/trade/${type}`, { symbol: stock.symbol, quantity });
      onDone();
    } catch (err) {
      setError(err.response?.data?.message || "Trade failed");
    } finally {
      setLoading(false);
    }
  };

  const estimatedTotal = (stock.price * quantity).toFixed(2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>
          {type === "buy" ? "Buy" : "Sell"} {stock.symbol}
        </h2>
        <p className="modal-price">${stock.price.toFixed(2)} / share</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={submit}>
          <label>Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
          <p className="estimate">Estimated total: ${estimatedTotal}</p>
          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={type === "buy" ? "buy" : "sell"} disabled={loading}>
              {loading ? "Processing..." : type === "buy" ? "Confirm Buy" : "Confirm Sell"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
