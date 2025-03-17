
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
  }
];
