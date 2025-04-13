
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
        
        <Toaster 
          position="top-center"
          richColors
          closeButton
          visibleToasts={3}
          toastOptions={{
            duration: 3000,
            style: { background: 'white', color: 'var(--color-foreground)' }
          }}
        />
      </Router>
    </HelmetProvider>
  );
}

export default App;
