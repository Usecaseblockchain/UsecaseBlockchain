require("dotenv").config();
const mongoose = require("mongoose"); 
const express = require("express");
const cors = require("cors");
const tradeRoutes = require("./routes/tradeRoutes");
const Swap=require("./models/Swap");
const app = express();
app.use(express.json());
app.use(cors());

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Atlas Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
}
}
connectDB();
app.use("/api/trade", tradeRoutes);

// Fetch all trades
app.get("/api/trades", async (req, res) => {
  const trades = await Swap.find();
  res.json(trades);
});

// Initiate a trade
app.post("/api/trades/initiate", async (req, res) => {
  const { counterparty, amount, token } = req.body;
  const swap = new Swap({ counterparty, amount, token, executed: false });
  await swap.save();
  res.json({ message: "Trade initiated", swapId: swap._id });
});

// Execute a trade
app.post("/api/trades/execute", async (req, res) => {
  const { swapId } = req.body;
  await Swap.findByIdAndUpdate(swapId, { executed: true });
  res.json({ message: `Trade ${swapId} executed successfully` });
});
const PORT = 5000;
app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
