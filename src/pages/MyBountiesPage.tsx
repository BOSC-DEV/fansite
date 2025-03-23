
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { useWallet } from "@/context/WalletContext";
import { storageService } from "@/services/storage";
import { Scammer } from "@/lib/types";
import { ScammerGrid } from "@/components/scammer/ScammerGrid";
import { Button } from "@/components/ui/button";
import { Coins, Plus } from "lucide-react";

export function MyBountiesPage() {
  const { isConnected, address } = useWallet();
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 9;
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBounties = async () => {
      if (!isConnected || !address) {
        navigate("/");
        return;
      }

      setIsLoading(true);
      try {
        // For now, we'll use a dummy implementation that shows all scammers
        // In a real implementation, this would filter to show only scammers with bounties funded by the user
        const allScammers = await storageService.getAllScammers();
        
        // Convert to Scammer type with Date objects
        const convertedScammers = allScammers.map(scammer => ({
          ...scammer,
          dateAdded: new Date(scammer.dateAdded)
        }));
        
        // Filter for scammers with bounties funded by this user
        // This is a placeholder - in a real implementation, this would check
        // if the user has funded a bounty for each scammer
        const userBounties: Scammer[] = [];
        
        setScammers(userBounties);
        setTotalPages(Math.max(1, Math.ceil(userBounties.length / ITEMS_PER_PAGE)));
      } catch (error) {
        console.error("Error fetching user bounties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserBounties();
  }, [isConnected, address, navigate]);

  // Calculate paginated scammers
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedScammers = scammers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen old-paper">
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-between w-full max-w-4xl">
            <h1 className="text-3xl font-bold font-wanted text-western-accent mb-2">
              My Bounties
            </h1>
            <Button 
              onClick={() => navigate("/most-wanted")}
              className="bg-western-accent text-western-parchment hover:bg-western-accent/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Bounty
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-pulse h-10 w-10 rounded-full bg-western-accent/30"></div>
          </div>
        ) : scammers.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            <ScammerGrid 
              paginatedScammers={paginatedScammers}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 max-w-md mx-auto text-center">
            <Coins className="h-16 w-16 mb-4 text-western-sand/60" />
            <h2 className="text-xl font-western text-western-accent mb-2">No Bounties Found</h2>
            <p className="text-western-sand mb-6">You haven't funded any bounties yet.</p>
            <Button 
              onClick={() => navigate("/most-wanted")}
              className="bg-western-accent text-western-parchment hover:bg-western-accent/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Explore Most Wanted List
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyBountiesPage;
