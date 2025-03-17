export interface Scammer {
  id: string;
  name: string;
  photoUrl: string;
  accusedOf: string;
  links: string[];
  aliases: string[];
  accomplices: string[];
  officialResponse: string;
  bountyAmount: number;
  walletAddress: string;
  dateAdded: Date;
  addedBy: string;
}

export interface ScammerInput {
  name: string;
  photoUrl: string;
  accusedOf: string;
  links: string[];
  aliases: string[];
  accomplices: string[];
  officialResponse: string;
  controlledByDev?: boolean;
  devWalletAddress?: string;
}

export const MOCK_SCAMMERS: Scammer[] = [
  {
    id: '1',
    name: 'John Crypto',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    accusedOf: 'Rug Pull: "MoonRocket Token"',
    links: ['https://example.com/evidence1', 'https://example.com/evidence2'],
    aliases: ['Crypto Johnny', 'Blockchain Bandit'],
    accomplices: ['Jane Doe', 'Anonymous Partner'],
    officialResponse: 'No official response received yet.',
    bountyAmount: 15000,
    walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    dateAdded: new Date('2023-05-12'),
    addedBy: '0xAbC123...'
  },
  {
    id: '2',
    name: 'Alice Blockchain',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    accusedOf: 'Fake ICO: "NextGen Chain"',
    links: ['https://example.com/evidence3'],
    aliases: ['Blockchain Queen', 'ICO Master'],
    accomplices: ['Bob Builder'],
    officialResponse: 'Investigation ongoing according to SEC.',
    bountyAmount: 8500,
    walletAddress: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
    dateAdded: new Date('2023-06-23'),
    addedBy: '0xDeF456...'
  },
  {
    id: '3',
    name: 'Charlie DeFi',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    accusedOf: 'Flash Loan Attack: "DeFi Protocol X"',
    links: ['https://example.com/evidence4', 'https://example.com/evidence5', 'https://example.com/evidence6'],
    aliases: ['DeFi Ninja', 'Flash Master'],
    accomplices: [],
    officialResponse: 'Protocol developers have identified the exploit and are working on recovery options.',
    bountyAmount: 25000,
    walletAddress: '0xdD870fA1b7C4700F2BD7f44238821C26f7392148',
    dateAdded: new Date('2023-07-08'),
    addedBy: '0xGhI789...'
  },
  {
    id: '4',
    name: 'David Token',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    accusedOf: 'Exchange Hack: "CryptoTradeX"',
    links: ['https://example.com/evidence7'],
    aliases: ['Token Dave', 'Crypto Phantom'],
    accomplices: ['Unknown Hacker Group'],
    officialResponse: 'Exchange has frozen all withdrawals pending investigation.',
    bountyAmount: 50000,
    walletAddress: '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
    dateAdded: new Date('2023-08-15'),
    addedBy: '0xJkL101...'
  },
  {
    id: '5',
    name: 'Eva Ethereum',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    accusedOf: 'Ponzi Scheme: "Ethereum Doubler"',
    links: ['https://example.com/evidence8', 'https://example.com/evidence9'],
    aliases: ['ETH Queen', 'Doubler Diva'],
    accomplices: ['Sam Scammer', 'Tim Thief'],
    officialResponse: 'Court case pending in multiple jurisdictions.',
    bountyAmount: 35000,
    walletAddress: '0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB',
    dateAdded: new Date('2023-09-05'),
    addedBy: '0xMnO234...'
  },
  {
    id: '6',
    name: 'Frank Phisher',
    photoUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    accusedOf: 'Phishing Campaign: "MetaMask Security Update"',
    links: ['https://example.com/evidence10'],
    aliases: ['Phisher Frank', 'Email Scammer'],
    accomplices: [],
    officialResponse: 'MetaMask has issued warnings about the fraudulent emails.',
    bountyAmount: 12000,
    walletAddress: '0x617F2E2fD72FD9D5503197092aC168c91465E7f2',
    dateAdded: new Date('2023-10-10'),
    addedBy: '0xPqR567...'
  },
  {
    id: '7',
    name: 'Grace NFT',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    accusedOf: 'Counterfeit NFTs: "Faked Apes"',
    links: ['https://example.com/evidence11', 'https://example.com/evidence12'],
    aliases: ['NFT Grace', 'The Counterfeiter'],
    accomplices: ['Art Thief'],
    officialResponse: 'Original NFT project has flagged the counterfeits on marketplaces.',
    bountyAmount: 20000,
    walletAddress: '0x17F6AD8Ef982297579C203069C1DbfFE4348c372',
    dateAdded: new Date('2023-11-22'),
    addedBy: '0xStU890...'
  },
  {
    id: '8',
    name: 'Harry Hacker',
    photoUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    accusedOf: 'Smart Contract Exploit: "Vulnerable DeFi"',
    links: ['https://example.com/evidence13'],
    aliases: ['Contract Killer', 'Code Exploiter'],
    accomplices: [],
    officialResponse: 'Protocol has been patched and an audit is in progress.',
    bountyAmount: 45000,
    walletAddress: '0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678',
    dateAdded: new Date('2023-12-05'),
    addedBy: '0xVwX123...'
  },
  {
    id: '9',
    name: 'Ivy Impostor',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    accusedOf: 'Identity Theft: "Vitalik Impersonation"',
    links: ['https://example.com/evidence14', 'https://example.com/evidence15'],
    aliases: ['Fake Vitalik', 'The Impostor'],
    accomplices: ['Social Media Manager'],
    officialResponse: 'Ethereum Foundation has issued a warning about impersonators.',
    bountyAmount: 18000,
    walletAddress: '0xA1b2C3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0',
    dateAdded: new Date('2024-01-15'),
    addedBy: '0xYzA456...'
  },
  {
    id: '10',
    name: 'Jack Jumper',
    photoUrl: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    accusedOf: 'Bridge Exploit: "Multi-Chain Bridge"',
    links: ['https://example.com/evidence16'],
    aliases: ['Bridge Bandit', 'Chain Hopper'],
    accomplices: ['Anonymous Developer'],
    officialResponse: 'Bridge has been temporarily closed while security is upgraded.',
    bountyAmount: 60000,
    walletAddress: '0xB1c2D3e4F5g6H7i8J9k0L1m2N3o4P5q6R7s8T9u0',
    dateAdded: new Date('2024-02-20'),
    addedBy: '0xBcD789...'
  }
];
