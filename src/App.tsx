
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { SiteFooter } from './components/layout/SiteFooter';
import Index from './pages/Index';
import ProfilePage from './pages/ProfilePage';
import CreateListingForm from './components/CreateListingForm';
import ScammerDetail from './pages/ScammerDetail';
import EditListing from './pages/EditListing';
import UserProfilePage from './pages/UserProfilePage';
import MostWanted from './pages/MostWanted';
import CreateListing from './pages/CreateListing';
import { WalletProvider } from './context/WalletContext';
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <WalletProvider>
        <Router>
          <Header />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/scammer/:id" element={<ScammerDetail />} />
              <Route path="/edit-scammer/:id" element={<EditListing />} />
              <Route path="/user/:username" element={<UserProfilePage />} />
              <Route path="/:username" element={<UserProfilePage />} />
              <Route path="/most-wanted" element={<MostWanted />} />
            </Routes>
          </main>
          <SiteFooter />
        </Router>
      </WalletProvider>
      
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
    </>
  )
}

export default App
