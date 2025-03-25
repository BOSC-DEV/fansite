
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import MostWanted from './pages/MostWanted';
import CreateListing from './pages/CreateListing';
import ScammerDetail from './pages/ScammerDetail';
import EditListing from './pages/EditListing';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner } from 'sonner';
import ProfilePage from './pages/ProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import Leaderboard from './pages/Leaderboard';
import MyReportsPage from './pages/MyReportsPage';
import MyBountiesPage from './pages/MyBountiesPage';
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <React.StrictMode>
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/most-wanted" element={<MostWanted />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/edit-listing/:id" element={<EditListing />} />
            <Route path="/scammer/:id" element={<ScammerDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/:username" element={<UserProfilePage />} />
            <Route path="/user/:walletAddress" element={<UserProfilePage />} />
            <Route path="/my-reports" element={<MyReportsPage />} />
            <Route path="/my-bounties" element={<MyBountiesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </Router>
      </WalletProvider>
    </React.StrictMode>
  );
}

export default App;
