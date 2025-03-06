const express = require("express");
const cors = require("cors");
const tradeRoutes = require("./routes/tradeRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/trade", tradeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
