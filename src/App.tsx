
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SiteFooter } from './components/layout/SiteFooter';
import Index from './pages/Index';
import ProfilePage from './pages/ProfilePage';
import ScammerDetail from './pages/ScammerDetail';
import EditListing from './pages/EditListing';
import UserProfilePage from './pages/UserProfilePage';
import MostWanted from './pages/MostWanted';
import CreateListing from './pages/CreateListing';
import NotFound from './pages/NotFound';
import Leaderboard from './pages/Leaderboard';
import { WalletProvider } from './context/WalletContext';
import { Toaster } from "sonner";
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <WalletProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/create-listing" element={<CreateListing />} />
                <Route path="/scammer/:id" element={<ScammerDetail />} />
                <Route path="/edit-scammer/:id" element={<EditListing />} />
                <Route path="/user/:username" element={<UserProfilePage />} />
                <Route path="/:username" element={<UserProfilePage />} />
                <Route path="/most-wanted" element={<MostWanted />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <SiteFooter />
            </div>
          </Router>
          
          <Toaster 
            position="top-center"
            richColors
            closeButton
            visibleToasts={3}
            toastOptions={{
              duration: 3000,
              style: { background: 'var(--color-background)', color: 'var(--color-foreground)' }
            }}
          />
        </WalletProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
