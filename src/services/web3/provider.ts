
import { ethers } from "ethers";

export class Web3Provider {
  provider: ethers.BrowserProvider | null = null;
  signer: ethers.Signer | null = null;
  chainId: number | null = null;
  
  constructor() {
    this.initProvider();
  }
  
  async initProvider() {
    if (window.ethereum) {
      try {
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.chainId = Number(await window.ethereum.request({ method: 'eth_chainId' }));
        this.setupEventListeners();
      } catch (error) {
        console.error("Error initializing provider:", error);
      }
    } else {
      console.log("Ethereum provider not found");
    }
  }
  
  setupEventListeners() {
    if (!window.ethereum) return;
    
    window.ethereum.on('chainChanged', (chainId: string) => {
      window.location.reload();
    });
    
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      window.location.reload();
    });
  }
  
  async connectWallet(): Promise<string | null> {
    if (!this.provider) {
      await this.initProvider();
      if (!this.provider) return null;
    }
    
    try {
      const accounts = await this.provider.send("eth_requestAccounts", []);
      this.signer = await this.provider.getSigner();
      return accounts[0];
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return null;
    }
  }
}
