import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { SiteFooter } from './components/layout/SiteFooter';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CreateListingForm from './components/CreateListingForm';
import ScammerDetailsPage from './pages/ScammerDetailsPage';
import EditScammerPage from './pages/EditScammerPage';
import UserDetailsPage from './pages/UserDetailsPage';
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
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create-listing" element={<CreateListingForm />} />
              <Route path="/scammer/:scammerId" element={<ScammerDetailsPage />} />
              <Route path="/edit-scammer/:scammerId" element={<EditScammerPage />} />
              <Route path="/user/:walletAddress" element={<UserDetailsPage />} />
              <Route path="/:username" element={<UserDetailsPage />} />
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
