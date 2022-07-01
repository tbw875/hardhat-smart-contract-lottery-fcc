// Raffle
// Enter the lottery by paying some amount
// Pick a random winner verifiably
// Automate winning -> pick a winner every x minutes
// chainlink oracle -> randomness, automated execution (Chainlink Keepers)

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

error Raffle__SendMoreToEnterRaffle();

contract Raffle is VRFConsumerBaseV2 {
    /* State Variables */

    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    /* Events */
    event RaffleEnter(address indexed player);

    function enterRaffle() public payable {
        // require (msg.value >> i_entranceFee)
        if (msg.value < i_entranceFee) {
            revert Raffle__SendMoreToEnterRaffle();
        }
        s_players.push(payable(msg.sender));

        // Good syntax for events: Name evenst with func name reversed
        emit RaffleEnter(msg.sender);
    }

    constructor(address vrfCoordinatorV2, uint256 entranceFee) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_entranceFee = entranceFee;
    }

    function requestRandomWinner() external {
        //request random number
        //do something with it
        //2 txns
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)
        internal
        override
    {}

    /* View / Pure functions */
    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
