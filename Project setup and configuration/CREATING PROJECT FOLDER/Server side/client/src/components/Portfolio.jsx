export default function Portfolio({ portfolio }) {
  if (!portfolio) return null;

  return (
    <div className="card">
      <h2>Your Portfolio</h2>
      <div className="stats-row">
        <div className="stat">
          <span className="label">Cash Balance</span>
          <span className="value">${portfolio.balance.toFixed(2)}</span>
        </div>
        <div className="stat">
          <span className="label">Holdings Value</span>
          <span className="value">${portfolio.holdingsValue.toFixed(2)}</span>
        </div>
        <div className="stat">
          <span className="label">Net Worth</span>
          <span className="value highlight">${portfolio.netWorth.toFixed(2)}</span>
        </div>
      </div>

      {portfolio.holdings.length === 0 ? (
        <p className="empty">No holdings yet. Start trading below!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Qty</th>
              <th>Avg Price</th>
              <th>Current</th>
              <th>Market Value</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.holdings.map((h) => (
              <tr key={h.symbol}>
                <td className="symbol">{h.symbol}</td>
                <td>{h.quantity}</td>
                <td>${h.avgPrice.toFixed(2)}</td>
                <td>${h.currentPrice.toFixed(2)}</td>
                <td>${h.marketValue.toFixed(2)}</td>
                <td className={h.pnl >= 0 ? "positive" : "negative"}>
                  {h.pnl >= 0 ? "+" : ""}
                  {h.pnl.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
