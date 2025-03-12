const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema({
    swapId: Number,
    trader: String,
    counterparty: String,
    amount: Number,
    token: String,
    executed: Boolean
});

const Swap = mongoose.model("Swap", swapSchema);
module.exports = Swap;


