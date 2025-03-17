
import { ethers } from "ethers";
import { BOSC_TOKEN_ABI, BOOK_OF_SCAMS_ABI } from "./contract-abis";
import BOSCTokenJSON from "./BOSCToken.json";
import BookOfScamsJSON from "./BookOfScams.json";
import web3Provider from "@/services/web3Provider";

export async function deployContracts() {
  try {
    // Check if the browser has ethereum provider
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found. Please install MetaMask.");
    }

    console.log("Starting contract deployment process...");
    
    // Set up provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
    
    console.log(`Connected to network with chain ID: ${chainId}`);
    console.log(`Deployer address: ${await signer.getAddress()}`);
    
    // First deploy the BOSC Token
    console.log("Deploying BOSC Token...");
    const boscTokenFactory = new ethers.ContractFactory(
      BOSCTokenJSON.abi,
      BOSCTokenJSON.bytecode,
      signer
    );
    
    const boscToken = await boscTokenFactory.deploy();
    await boscToken.waitForDeployment();
    const boscTokenAddress = await boscToken.getAddress();
    console.log(`BOSC Token deployed at: ${boscTokenAddress}`);
    
    // Then deploy the Book of Scams contract with the token address
    console.log("Deploying Book of Scams contract...");
    const bookOfScamsFactory = new ethers.ContractFactory(
      BookOfScamsJSON.abi,
      BookOfScamsJSON.bytecode,
      signer
    );
    
    const bookOfScams = await bookOfScamsFactory.deploy(boscTokenAddress);
    await bookOfScams.waitForDeployment();
    const bookOfScamsAddress = await bookOfScams.getAddress();
    console.log(`Book of Scams deployed at: ${bookOfScamsAddress}`);
    
    // Store the deployed addresses
    const deployedAddresses = {
      boscTokenAddress,
      bookOfScamsAddress,
      chainId
    };
    
    // Store in localStorage for persistence
    web3Provider.storeDeployedContractAddresses(deployedAddresses);
    
    return deployedAddresses;
  } catch (error) {
    console.error("Error deploying contracts:", error);
    throw error;
  }
}
