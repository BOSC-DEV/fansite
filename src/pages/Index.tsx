
import { useState } from "react";
import { Header } from "@/components/Header";
import { BookView } from "@/components/BookView";
import { MOCK_SCAMMERS } from "@/lib/types";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const scammers = MOCK_SCAMMERS.slice(0, 3); // Just show first few on the home page
  const totalPages = scammers.length;
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <>
      <Header />
      
      <main className="flex min-h-screen flex-col items-center justify-between p-8 sm:p-24">
        <div className="flex flex-col gap-8 w-full max-w-6xl">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-bosc">Book of Scams</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A decentralized registry of scammers and fraudsters, with bounties placed on their heads.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1">
              <BookView 
                scammers={scammers}
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            </div>
            
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">About Book of Scams</h2>
                  <p className="text-muted-foreground">
                    A permanent on-chain record of scammers and fraudsters, with community-funded bounties.
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">How It Works</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-bold text-bosc">1.</span>
                      <span>Connect your wallet to report scammers or contribute to bounties</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-bosc">2.</span>
                      <span>BOSC tokens are required to report new scammers to the registry</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-bosc">3.</span>
                      <span>Place bounties on scammers to incentivize action against them</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-bosc">4.</span>
                      <span>All listings and bounties are permanently recorded on the blockchain</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
