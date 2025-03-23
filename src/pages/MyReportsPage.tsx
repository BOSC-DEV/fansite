
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { useWallet } from "@/context/WalletContext";
import { storageService } from "@/services/storage";
import { Scammer } from "@/lib/types";
import { ScammerGrid } from "@/components/scammer/ScammerGrid";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

export function MyReportsPage() {
  const { isConnected, address } = useWallet();
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserReports = async () => {
      if (!isConnected || !address) {
        navigate("/");
        return;
      }

      setIsLoading(true);
      try {
        const allScammers = await storageService.getAllScammers();
        const userScammers = allScammers.filter(
          scammer => scammer.addedBy === address
        );
        
        // Convert to Scammer type with Date objects
        const convertedScammers = userScammers.map(scammer => ({
          ...scammer,
          dateAdded: new Date(scammer.dateAdded)
        }));
        
        setScammers(convertedScammers);
      } catch (error) {
        console.error("Error fetching user reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserReports();
  }, [isConnected, address, navigate]);

  return (
    <div className="min-h-screen old-paper">
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-between w-full max-w-4xl">
            <h1 className="text-3xl font-bold font-wanted text-western-accent mb-2">
              My Reports
            </h1>
            <Button 
              onClick={() => navigate("/create-listing")}
              className="bg-western-accent text-western-parchment hover:bg-western-accent/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Report
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-pulse h-10 w-10 rounded-full bg-western-accent/30"></div>
          </div>
        ) : scammers.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            <ScammerGrid scammers={scammers} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 max-w-md mx-auto text-center">
            <FileText className="h-16 w-16 mb-4 text-western-sand/60" />
            <h2 className="text-xl font-western text-western-accent mb-2">No Reports Found</h2>
            <p className="text-western-sand mb-6">You haven't submitted any scammer reports yet.</p>
            <Button 
              onClick={() => navigate("/create-listing")}
              className="bg-western-accent text-western-parchment hover:bg-western-accent/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Report
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyReportsPage;
