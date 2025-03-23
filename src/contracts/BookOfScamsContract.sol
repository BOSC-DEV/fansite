// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BookOfScams is Ownable {
    // BOSC token contract
    IERC20 public boscToken;
    
    // Developer wallet
    address public developerWallet = 0xCzjg5gBbd6pbq3MR4VhR3hiNN4HWccgLKPpnqhwcJN76;
    
    struct Scammer {
        string name;
        string accusedOf;
        string photoUrl;
        uint256 bountyAmount;
        address reporter;
        uint256 dateAdded;
        bool exists;
    }
    
    // Mapping from scammer ID to Scammer struct
    mapping(bytes32 => Scammer) public scammers;
    
    // Array to keep track of all scammer IDs
    bytes32[] public scammerIds;
    
    // Events
    event ScammerAdded(bytes32 indexed scammerId, string name, address reporter, uint256 bountyAmount);
    event BountyIncreased(bytes32 indexed scammerId, uint256 amount, uint256 newTotal, address contributor);
    
    constructor(address _boscTokenAddress) Ownable(msg.sender) {
        boscToken = IERC20(_boscTokenAddress);
    }
    
    function addScammer(
        string memory _name,
        string memory _accusedOf,
        string memory _photoUrl
    ) external returns (bytes32) {
        // Generate a unique ID for this scammer
        bytes32 scammerId = keccak256(abi.encodePacked(_name, msg.sender, block.timestamp));
        
        // Ensure this ID doesn't already exist
        require(!scammers[scammerId].exists, "Scammer ID already exists");
        
        // Create the scammer record
        scammers[scammerId] = Scammer({
            name: _name,
            accusedOf: _accusedOf,
            photoUrl: _photoUrl,
            bountyAmount: 0, // Initial bounty of 0 BOSC
            reporter: msg.sender,
            dateAdded: block.timestamp,
            exists: true
        });
        
        // Add to the list of scammers
        scammerIds.push(scammerId);
        
        emit ScammerAdded(scammerId, _name, msg.sender, 0);
        
        return scammerId;
    }
    
    function contributeToBounty(bytes32 _scammerId, uint256 _amount) external {
        // Ensure the scammer exists
        require(scammers[_scammerId].exists, "Scammer does not exist");
        
        // Transfer BOSC tokens from the contributor to the developer wallet
        require(boscToken.transferFrom(msg.sender, developerWallet, _amount), "Token transfer failed");
        
        // Update the bounty amount
        scammers[_scammerId].bountyAmount += _amount;
        
        emit BountyIncreased(_scammerId, _amount, scammers[_scammerId].bountyAmount, msg.sender);
    }
    
    function getScammerCount() external view returns (uint256) {
        return scammerIds.length;
    }
    
    function getScammerIdAtIndex(uint256 _index) external view returns (bytes32) {
        require(_index < scammerIds.length, "Index out of bounds");
        return scammerIds[_index];
    }
    
    function getScammerDetails(bytes32 _scammerId) external view returns (
        string memory name,
        string memory accusedOf,
        string memory photoUrl,
        uint256 bountyAmount,
        address reporter,
        uint256 dateAdded
    ) {
        require(scammers[_scammerId].exists, "Scammer does not exist");
        Scammer storage scammer = scammers[_scammerId];
        
        return (
            scammer.name,
            scammer.accusedOf,
            scammer.photoUrl,
            scammer.bountyAmount,
            scammer.reporter,
            scammer.dateAdded
        );
    }
    
    // Function to update the BOSC token address if needed
    function updateBoscTokenAddress(address _newTokenAddress) external onlyOwner {
        boscToken = IERC20(_newTokenAddress);
    }
    
    // Function to update developer wallet if needed
    function updateDeveloperWallet(address _newDeveloperWallet) external onlyOwner {
        developerWallet = _newDeveloperWallet;
    }
}
