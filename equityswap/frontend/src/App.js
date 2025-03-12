import React, { useState, useEffect } from "react";
import axios from "axios";
import TradeExecution from "./TradeExecution";

function App() {
  const [trades, setTrades] = useState([]);
  const [newTrade, setNewTrade] = useState({
    counterparty: "",
    amount: "",
    token: "",
  });

  useEffect(() => {
    fetchTrades();
  }, []);

  // Fetch trades from backend
  const fetchTrades = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/trades");
      setTrades(response.data);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setNewTrade({ ...newTrade, [e.target.name]: e.target.value });
  };

  // Initiate a new trade
  const initiateTrade = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/trades/initiate", newTrade);
      alert("Trade Initiated! Swap ID: " + response.data.swapId);
      fetchTrades();
    } catch (error) {
      console.error("Error initiating trade:", error);
    }
  };

  return (
    <div>
      <h1>Equity Swap Trading Platform</h1>

      <h2>Initiate Trade</h2>
      <form onSubmit={initiateTrade}>
        <input type="text" name="counterparty" placeholder="Counterparty Address" onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
        <input type="text" name="token" placeholder="Token Address" onChange={handleChange} required />
        <button type="submit">Initiate Trade</button>
      </form>

      <h2>Execute Trade</h2>
      <TradeExecution trades={trades} fetchTrades={fetchTrades} />
    </div>
  );
}

export default App;
