
# Smart Contract Deployment Instructions

This guide provides instructions for deploying the Book of Scams smart contracts without modifying the package.json file.

## Prerequisites

1. Create a `.env` file in the project root with your private keys and API keys:
   ```
   # Copy from .env.example and fill in your values
   PRIVATE_KEY=your_private_key_here
   ALCHEMY_API_KEY=your_alchemy_api_key
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ARBISCAN_API_KEY=your_arbiscan_api_key
   ```

2. Make sure you have compiled the contracts:
   ```
   npx hardhat compile
   ```

## Deployment Commands

### Deploy to Hardhat Local Network (Testing)

```bash
npx hardhat run scripts/deployContracts.js
```

### Deploy to Sepolia Testnet

```bash
npx hardhat run scripts/deployContracts.js --network sepolia
```

### Deploy to Ethereum Mainnet

```bash
npx hardhat run scripts/deployContracts.js --network ethereum
```

### Deploy to Arbitrum One Mainnet

```bash
npx hardhat run scripts/deployContracts.js --network arbitrumOne
```

### Deploy to Arbitrum Sepolia Testnet

```bash
npx hardhat run scripts/deployContracts.js --network arbitrumSepolia
```

## Verify Contracts on Etherscan/Arbiscan

After deployment, verify your contracts:

```bash
# Verify BOSC Token
npx hardhat verify --network <network> <boscTokenAddress>

# Verify Book of Scams Contract
npx hardhat verify --network <network> <bookOfScamsAddress> <boscTokenAddress>
```

Replace `<network>` with the network name (e.g., sepolia, ethereum, arbitrumOne, arbitrumSepolia) and the addresses with your deployed contract addresses.

## Supported Networks

- **Ethereum Mainnet**: Full production deployment
- **Sepolia Testnet**: Ethereum testing network
- **Arbitrum One**: Layer 2 production network for lower fees
- **Arbitrum Sepolia**: Arbitrum testing network

## Troubleshooting

- If you encounter an error about the chain ID, make sure you're using the correct network name.
- If verification fails, wait a few minutes for the contracts to be indexed and try again.
- Make sure your .env file contains the correct API keys for the network you're using.
- For Arbitrum networks, ensure you have ARBISCAN_API_KEY in your .env file.
