export default function StockList({ stocks, onTrade }) {
  return (
    <div className="card">
      <h2>Market</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s) => (
            <tr key={s.symbol}>
              <td className="symbol">{s.symbol}</td>
              <td>{s.name}</td>
              <td>${s.price.toFixed(2)}</td>
              <td className={s.change >= 0 ? "positive" : "negative"}>
                {s.change >= 0 ? "+" : ""}
                {s.change} ({s.changePercent}%)
              </td>
              <td className="actions">
                <button className="buy" onClick={() => onTrade(s, "buy")}>
                  Buy
                </button>
                <button className="sell" onClick={() => onTrade(s, "sell")}>
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
