
# Deployment Guide for Book of Scams Contracts

This guide will walk you through the process of deploying the Book of Scams smart contracts to Ethereum or other EVM-compatible networks.

## Prerequisites

1. Node.js and npm installed
2. Private key of the deployment wallet with ETH/MATIC for gas
3. Alchemy API key (or other provider)
4. Etherscan/Polygonscan API key (for verification)

## Setup

1. Install Hardhat and dependencies:

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
```

2. Create a `.env` file in the project root with the following variables:

```
PRIVATE_KEY=your_private_key_here
ALCHEMY_API_KEY=your_alchemy_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

⚠️ **IMPORTANT**: Never commit your `.env` file to version control!

## Deployment

### Deploy to a Test Network First

It's recommended to deploy to a testnet before deploying to mainnet:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

### Deploy to Mainnet

Once you've verified everything works on testnet, deploy to mainnet:

```bash
npx hardhat run scripts/deploy.ts --network ethereum
```

Or for Polygon mainnet:

```bash
npx hardhat run scripts/deploy.ts --network polygon
```

### Verify Contracts on Etherscan/Polygonscan

After deployment, verify your contracts:

```bash
# Verify BOSC Token
npx hardhat verify --network <network> <boscTokenAddress>

# Verify Book of Scams Contract
npx hardhat verify --network <network> <bookOfScamsAddress> <boscTokenAddress>
```

## Post-Deployment

After deployment:

1. The `contract-abis.ts` file should be automatically updated with the new contract addresses.
2. Mint some BOSC tokens to your wallet or distribute them as needed.
3. Test the application with the newly deployed contracts.

## Troubleshooting

- If you encounter gas estimation errors, try increasing the gas limit in the hardhat.config.ts file.
- If verification fails, wait a few minutes for the contracts to be indexed and try again.
- Make sure you're using the correct network when verifying contracts.
