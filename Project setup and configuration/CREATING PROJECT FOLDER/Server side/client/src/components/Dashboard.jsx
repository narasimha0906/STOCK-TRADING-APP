import { useEffect, useState, useCallback } from "react";
import api from "../api/api.js";
import StockList from "./StockList.jsx";
import Portfolio from "./Portfolio.jsx";
import TradeModal from "./TradeModal.jsx";

export default function Dashboard({ onLogout }) {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [tradeState, setTradeState] = useState(null); // { stock, type }
  const [loading, setLoading] = useState(true);

  const loadStocks = useCallback(async () => {
    const { data } = await api.get("/stocks");
    setStocks(data);
  }, []);

  const loadPortfolio = useCallback(async () => {
    const { data } = await api.get("/portfolio");
    setPortfolio(data);
  }, []);

  const loadAll = useCallback(async () => {
    await Promise.all([loadStocks(), loadPortfolio()]);
    setLoading(false);
  }, [loadStocks, loadPortfolio]);

  useEffect(() => {
    loadAll();
    const interval = setInterval(loadStocks, 5000); // simulate live prices
    return () => clearInterval(interval);
  }, [loadAll, loadStocks]);

  const handleTrade = (stock, type) => setTradeState({ stock, type });

  const handleTradeDone = async () => {
    setTradeState(null);
    await loadAll();
  };

  if (loading) return <div className="loading">Loading SB Stocks...</div>;

  return (
    <div className="dashboard">
      <header className="topbar">
        <h1>SB Stocks</h1>
        <button className="secondary" onClick={onLogout}>
          Log Out
        </button>
      </header>

      <main className="content">
        <Portfolio portfolio={portfolio} />
        <StockList stocks={stocks} onTrade={handleTrade} />
      </main>

      {tradeState && (
        <TradeModal
          stock={tradeState.stock}
          type={tradeState.type}
          onClose={() => setTradeState(null)}
          onDone={handleTradeDone}
        />
      )}
    </div>
  );
}
