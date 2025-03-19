
// Contract verification script
require("dotenv").config();
const { execSync } = require("child_process");

// Get addresses from command line arguments
const boscTokenAddress = process.argv[2];
const bookOfScamsAddress = process.argv[3];
const network = process.argv[4] || "sepolia";

if (!boscTokenAddress || !bookOfScamsAddress) {
  console.error("Usage: node scripts/verifyContracts.js <boscTokenAddress> <bookOfScamsAddress> [network]");
  process.exit(1);
}

console.log(`Verifying contracts on ${network}...`);

try {
  // Verify the BOSC Token contract
  console.log(`\nVerifying BOSC Token at ${boscTokenAddress}...`);
  execSync(`npx hardhat verify --network ${network} ${boscTokenAddress}`, { stdio: 'inherit' });
  
  // Verify the Book of Scams contract
  console.log(`\nVerifying Book of Scams at ${bookOfScamsAddress}...`);
  execSync(`npx hardhat verify --network ${network} ${bookOfScamsAddress} ${boscTokenAddress}`, { stdio: 'inherit' });
  
  console.log("\nVerification complete!");
} catch (error) {
  console.error("Verification failed:", error.message);
  process.exit(1);
}
