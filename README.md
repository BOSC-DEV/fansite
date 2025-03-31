
# Book of Scams

Book of Scams is a decentralized criminal registry bringing accountability and justice to The Wild West of crypto.

## About

Book of Scams allows users to:

- Browse and search for known crypto scammers
- Report new scammers with evidence
- Contribute to bounties for bringing scammers to justice
- Verify their identity using wallet-based authentication
- Comment and interact with listings
- Track the most wanted crypto criminals

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Blockchain**: Solana (contracts and wallet integration)
- **State Management**: React Context API
- **Routing**: React Router
- **Design**: Custom western-themed UI components

## Development

### Prerequisites

- Node.js (v16+)
- NPM or Yarn
- Supabase account
- Phantom wallet (or compatible Solana wallet)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/book-of-scams.git
cd book-of-scams
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Smart Contracts

The project includes two main smart contracts:

- `BOSCToken.sol`: ERC-20 token for the platform
- `BookOfScams.sol`: Main contract for scammer registry and bounties

To deploy the contracts:

```bash
npx hardhat run scripts/deploy.ts --network <network_name>
```

## Documentation

For more detailed information, see the [whitepaper](whitepaper.md).

## License

[MIT](LICENSE)

## Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
