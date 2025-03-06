const { ethers } = require("ethers");
const { ARBITRUM_RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS } = require("../config");
const contractABI = require("../artifacts/EquitySwap.json");

const provider = new ethers.providers.JsonRpcProvider(ARBITRUM_RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, wallet);

const executeTrade = async () => {
    try {
        const tx = await contract.executeTrade();
        await tx.wait();
        return { success: true, txHash: tx.hash };
    } catch (error) {
        console.error("Trade Execution Error:", error);
        throw new Error("Trade execution failed.");
    }
};

module.exports = { executeTrade };
