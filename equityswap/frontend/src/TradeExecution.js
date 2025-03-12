import React from "react";
import axios from "axios";

function TradeExecution({ trades, fetchTrades }) {
  const executeTrade = async (swapId) => {
    try {
      await axios.post(`http://localhost:5000/api/trades/execute`, { swapId });
      alert(`Trade ${swapId} executed successfully!`);
      fetchTrades();
    } catch (error) {
      console.error("Error executing trade:", error);
    }
  };

  return (
    <div>
      <h3>Pending Trades</h3>
      <ul>
        {trades.map((trade) =>
          !trade.executed ? (
            <li key={trade.swapId}>
              Swap ID: {trade.swapId} | Amount: {trade.amount} | Token: {trade.token}
              <button onClick={() => executeTrade(trade.swapId)}>Execute</button>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default TradeExecution;
