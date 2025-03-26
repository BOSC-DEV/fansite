
# Book of Scams: Technical Details

This document provides an in-depth technical overview of the Book of Scams platform for developers and technical users.

## System Architecture

Book of Scams utilizes a hybrid architecture combining traditional web technologies with blockchain integration:

```
┌────────────────┐           ┌────────────────┐
│                │           │                │
│  React Client  │◄────────►│    Supabase    │
│                │           │                │
└───────┬────────┘           └────────┬───────┘
        │                             │
        │                             │
        │                             │
        │                     ┌───────▼───────┐
        │                     │               │
        └────────────────────►│ Solana Chain  │
                              │               │
                              └───────────────┘
```

### Frontend Architecture

The frontend is built using React with TypeScript, following a component-based architecture:

- **App Entry**: App.tsx serves as the main entry point
- **Routing**: React Router handles navigation between pages
- **State Management**: Combination of React Context and local component state
- **UI Components**: Shadcn UI and custom components with Tailwind CSS
- **Theming**: Western-themed design system consistent across components

#### Key Components

- **Authentication**: WalletContext for Solana wallet integration
- **Scammer Listings**: ScammerCard, ScammerGrid, ScammerTable components
- **Forms**: CreateListingForm for submitting new scammers
- **Comments & Interactions**: Comment component with like/dislike functionality

### Backend Architecture

The backend leverages Supabase for data storage and authentication:

- **Authentication**: Supabase Auth with wallet-based authentication
- **Database**: PostgreSQL with tables for:
  - Scammers
  - Comments
  - User profiles
  - Interactions (likes, dislikes, views)
  - Leaderboard statistics
- **Storage**: Supabase Storage for images and evidence files

### Blockchain Integration

Solana blockchain integration enables:

1. **Wallet Authentication**: User authentication via Phantom wallet
2. **Token Management**: BOSC token implementation
3. **Bounty System**: Smart contract for managing bounties
4. **Immutable Records**: On-chain references to scammer data

## Database Schema

```
┌─────────────┐      ┌───────────────┐      ┌─────────────────┐
│   scammers  │      │   comments    │      │     profiles    │
├─────────────┤      ├───────────────┤      ├─────────────────┤
│ id          │◄─────┤ scammer_id    │      │ wallet_address  │
│ name        │      │ content       │◄─────┤ added_by        │
│ photo_url   │      │ author        │      │ display_name    │
│ accused_of  │      │ likes         │      │ username        │
│ links       │      │ dislikes      │      │ profile_pic_url │
│ aliases     │      │ created_at    │      │ bio             │
│ accomplices │      └───────────────┘      │ x_link          │
│ wallet_addr │                             │ website_link    │
│ added_by    │                             └─────────────────┘
│ date_added  │
│ likes       │      ┌───────────────────────────┐
│ dislikes    │      │ user_comment_interactions │
│ views       │      ├───────────────────────────┤
│ comments    │      │ id                        │
└─────────────┘      │ comment_id                │
                     │ user_id                   │
                     │ liked                     │
                     │ disliked                  │
                     │ last_updated              │
                     └───────────────────────────┘
```

## Smart Contract Details

### BOSC Token Contract

The BOSC token uses the ERC-20 standard from OpenZeppelin with additional functionality:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BOSCToken is ERC20, Ownable {
    // ... contract implementation
}
```

### Book of Scams Contract

The main contract handles the scammer registry and bounty system:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract BookOfScams {
    // ... contract implementation with functions for:
    // - Adding scammers
    // - Contributing to bounties
    // - Retrieving scammer information
}
```

## API Documentation

Book of Scams utilizes Supabase for data management, with the following key endpoints:

### Scammer Endpoints

- **GET /scammers**: Fetch all scammers
- **GET /scammers/:id**: Fetch a specific scammer
- **POST /scammers**: Create a new scammer
- **PUT /scammers/:id**: Update a scammer
- **DELETE /scammers/:id**: Delete a scammer

### Comment Endpoints

- **GET /comments?scammer_id=:id**: Fetch comments for a scammer
- **POST /comments**: Create a new comment
- **PUT /comments/:id**: Update a comment
- **DELETE /comments/:id**: Delete a comment

### Profile Endpoints

- **GET /profiles/:wallet_address**: Fetch a user profile
- **POST /profiles**: Create a user profile
- **PUT /profiles/:wallet_address**: Update a user profile

## Security Considerations

Book of Scams implements several security measures:

1. **Authentication**: Wallet-based authentication with signature verification
2. **Data Validation**: Client and server-side validation of all inputs
3. **Rate Limiting**: Prevention of spam submissions
4. **Content Moderation**: Review system for reported scammers
5. **Smart Contract Security**: Audited contracts with ownership controls

## Deployment Architecture

The application is deployed using the following architecture:

- **Frontend**: Static hosting on Vercel or similar platform
- **Backend**: Supabase hosted database and authentication
- **Blockchain**: Solana mainnet deployment of smart contracts

## Performance Optimizations

- **Code Splitting**: React.lazy and dynamic imports for page components
- **Image Optimization**: Responsive images with proper sizing
- **Pagination**: Efficient loading of large datasets
- **Caching**: Local storage for frequently accessed data
- **Debouncing**: Throttled API calls for search and filter operations

## Future Technical Roadmap

1. **Indexer Integration**: Enhanced blockchain data indexing
2. **Cross-Chain Support**: Expansion to additional blockchains
3. **AI-Powered Detection**: Machine learning for scam pattern recognition
4. **API Gateway**: Public API for third-party integrations
5. **Mobile Application**: Native mobile experience
