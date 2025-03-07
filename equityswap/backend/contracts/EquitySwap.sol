// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EquitySwap {
    address public partyA;
    address public partyB;
    IERC20 public asset;
    uint public quantity;
    bool public tradeExecuted;

    event TradeExecuted(address indexed partyA, address indexed partyB, uint quantity);

    constructor(address _partyB, address _asset, uint _quantity) {
        partyA = msg.sender;
        partyB = _partyB;
        asset = IERC20(_asset);
        quantity = _quantity;
        tradeExecuted = false;
    }

    function executeTrade() external {
        require(msg.sender == partyA, "Only partyA can execute trade");
        require(!tradeExecuted, "Trade already executed");

        asset.transferFrom(partyA, partyB, quantity);
        tradeExecuted = true;

        emit TradeExecuted(partyA, partyB, quantity);
    }
}


