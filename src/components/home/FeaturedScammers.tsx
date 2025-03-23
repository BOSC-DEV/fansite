
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scammer } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { ScammerTable } from "@/components/scammer/ScammerTable";
import { useWallet } from "@/context/WalletContext";

export const FeaturedScammers = () => {
  const [featuredScammers, setFeaturedScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { chainId } = useWallet();

  useEffect(() => {
    const fetchFeaturedScammers = async () => {
      setIsLoading(true);
      try {
        // In production, this would fetch from your contract or API
        // For now, use sample data for preview purposes
        const sampleData: Scammer[] = [
          {
            id: "1",
            name: "John Doe",
            photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            accusedOf: "Rug pull on DeFi project",
            links: ["https://twitter.com/example"],
            aliases: ["Crypto King", "DeFi Developer"],
            accomplices: ["Jane Smith"],
            officialResponse: "",
            bountyAmount: 15000,
            walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
            dateAdded: new Date("2023-10-15"),
            addedBy: "admin"
          },
          {
            id: "2",
            name: "Alice Cooper",
            photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            accusedOf: "Fake NFT collection scam",
            links: ["https://opensea.io/example"],
            aliases: ["NFT Queen", "Digital Artist"],
            accomplices: [],
            officialResponse: "I deny all allegations.",
            bountyAmount: 8000,
            walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
            dateAdded: new Date("2023-12-05"),
            addedBy: "moderator"
          },
          {
            id: "3",
            name: "Bob Johnson",
            photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
            accusedOf: "Fake token airdrop and phishing",
            links: ["https://etherscan.io/example"],
            aliases: ["Airdrop Master"],
            accomplices: ["Charlie Davis"],
            officialResponse: "",
            bountyAmount: 12000,
            walletAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
            dateAdded: new Date("2024-01-25"),
            addedBy: "admin"
          },
          {
            id: "4",
            name: "Eva Green",
            photoUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
            accusedOf: "Ponzi scheme with staking protocol",
            links: ["https://github.com/example"],
            aliases: ["Staking Pro", "DeFi Expert"],
            accomplices: [],
            officialResponse: "",
            bountyAmount: 20000,
            walletAddress: "0xdef1234567890abcdef1234567890abcdef123456",
            dateAdded: new Date("2024-02-10"),
            addedBy: "moderator"
          },
          {
            id: "5",
            name: "Frank Williams",
            photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            accusedOf: "Wallet drainer through malicious smart contract",
            links: ["https://bscscan.com/example"],
            aliases: ["Smart Contract Genius"],
            accomplices: ["Grace Miller"],
            officialResponse: "These accusations are unfounded.",
            bountyAmount: 18000,
            walletAddress: "0x567890abcdef1234567890abcdef1234567890ab",
            dateAdded: new Date("2024-03-01"),
            addedBy: "admin"
          }
        ];
        
        setFeaturedScammers(sampleData);
      } catch (error) {
        console.error("Error fetching featured scammers:", error);
        setFeaturedScammers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedScammers();
  }, [chainId]);

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

  // Always one page for featured scammers
  const totalPages = 1;
  const itemsPerPage = 5;

  return (
    <section className="py-16 bg-western-parchment/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-wanted text-western-accent uppercase tracking-wide">Most Wanted</h2>
            <p className="text-western-wood">Recently added high-profile scammers</p>
          </div>
          <Button asChild variant="ghost" className="gap-1 hover:animate-wiggle border-2 border-dashed border-western-wood/50">
            <Link to="/most-wanted">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <div className="wanted-poster-border paper-texture rounded-sm">
          {isLoading ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">Loading scammers...</p>
            </div>
          ) : featuredScammers.length > 0 ? (
            <ScammerTable 
              paginatedScammers={featuredScammers}
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No scammers have been reported yet.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/create-listing">Report a Scammer</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
