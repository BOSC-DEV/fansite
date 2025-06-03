
// Manual deployment script using hardhat programmatically
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function main() {
  console.log("Starting deployment process...");
  
  // Check environment
  const network = process.env.HARDHAT_NETWORK || "hardhat";
  console.log(`Deploying to network: ${network}`);
  
  // 1. Deploy the BOSC Token
  console.log("Deploying BOSC Token...");
  const BOSCToken = await ethers.getContractFactory("BOSCToken");
  const boscToken = await BOSCToken.deploy();
  await boscToken.waitForDeployment();
  
  const boscTokenAddress = await boscToken.getAddress();
  console.log(`BOSC Token deployed to: ${boscTokenAddress}`);
  
  // 2. Deploy the Book of Scams Contract with the BOSC Token address
  console.log("Deploying Book of Scams contract...");
  const BookOfScams = await ethers.getContractFactory("BookOfScams");
  const bookOfScams = await BookOfScams.deploy(boscTokenAddress);
  await bookOfScams.waitForDeployment();
  
  const bookOfScamsAddress = await bookOfScams.getAddress();
  console.log(`Book of Scams deployed to: ${bookOfScamsAddress}`);
  
  // 3. Update the contract-abis.ts file with the new addresses
  const networkId = (await ethers.provider.getNetwork()).chainId;
  
  // Map chain IDs to names for our configuration
  const chainIdToName = {
    1: "1", // Ethereum Mainnet
    11155111: "11155111", // Sepolia Testnet
    42161: "42161", // Arbitrum One
    421614: "421614", // Arbitrum Sepolia
  };
  
  console.log(`Updating contract addresses for network ID: ${networkId} (${chainIdToName[Number(networkId)] || "unknown"})`);
  
  // Load current contract-abis.ts
  const contractAbisPath = path.join(__dirname, "../src/contracts/contract-abis.ts");
  const contractAbisContent = fs.readFileSync(contractAbisPath, "utf8");
  
  // Update the addresses for the current network
  const network = chainIdToName[Number(networkId)];
  if (network) {
    // Create regex patterns to find and replace the addresses
    const boscTokenRegex = new RegExp(`(${network}: \\{[\\s\\n]*boscToken: ")[^"]*(")`);
    const bookOfScamsRegex = new RegExp(`(${network}: \\{[\\s\\n]*boscToken: "[^"]*",[\\s\\n]*bookOfScams: ")[^"]*(")`);
    
    // Apply replacements
    let updatedContent = contractAbisContent.replace(boscTokenRegex, `$1${boscTokenAddress}$2`);
    updatedContent = updatedContent.replace(bookOfScamsRegex, `$1${bookOfScamsAddress}$2`);
    
    // Write back to file
    fs.writeFileSync(contractAbisPath, updatedContent);
    console.log(`Updated contract addresses in contract-abis.ts for network ${network}`);
  } else {
    console.warn(`Warning: Network ID ${networkId} not found in configuration. Contract addresses not updated.`);
  }
  
  console.log("\nDeployment summary:");
  console.log(`- BOSC Token: ${boscTokenAddress}`);
  console.log(`- Book of Scams: ${bookOfScamsAddress}`);
  console.log("\nDon't forget to verify your contracts on Etherscan/Arbiscan with:");
  console.log(`npx hardhat verify --network ${network || "networkName"} ${boscTokenAddress}`);
  console.log(`npx hardhat verify --network ${network || "networkName"} ${bookOfScamsAddress} ${boscTokenAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
