
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BOSCToken is ERC20, Ownable {
    constructor() ERC20("Book of Scams", "BOSC") Ownable(msg.sender) {
        // Mint 1,000,000 BOSC tokens to the contract creator
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
    
    // Function to mint more tokens if needed
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
