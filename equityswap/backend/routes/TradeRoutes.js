const express = require("express");
const router = express.Router();
const { executeTrade } = require("../services/tradeService");

router.post("/execute", async (req, res) => {
    try {
        const result = await executeTrade();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
