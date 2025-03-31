
import { useState, useEffect } from "react";
import { BountyContributor } from "@/components/bounty/BountyContributorsList";

// Mock data for now - this would be replaced with actual API calls in production
const MOCK_CONTRIBUTORS: BountyContributor[] = [
  {
    id: "1",
    profileId: "user1",
    username: "BountyHunter",
    profilePicUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=BountyHunter",
    amount: 0.5,
    message: "This scammer needs to be stopped! Happy to contribute to the cause.",
    contributedAt: new Date(Date.now() - 3600000 * 24 * 2) // 2 days ago
  },
  {
    id: "2",
    profileId: "user2",
    username: "CryptoSheriff",
    profilePicUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoSheriff",
    amount: 1.2,
    message: "Adding to the bounty to help catch this fraudster.",
    contributedAt: new Date(Date.now() - 3600000 * 24) // 1 day ago
  },
  {
    id: "3",
    profileId: "user3",
    username: "BlockchainVigilante",
    profilePicUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=BlockchainVigilante",
    amount: 0.3,
    contributedAt: new Date(Date.now() - 3600000 * 12) // 12 hours ago
  }
];

export function useBountyContributors(scammerId: string) {
  const [contributors, setContributors] = useState<BountyContributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, this would fetch from an API or database
        // For now, we'll use mock data and simulate a network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter contributors by scammer ID in a real implementation
        setContributors(MOCK_CONTRIBUTORS);
        setError(null);
      } catch (err) {
        console.error("Error fetching bounty contributors:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch contributors"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, [scammerId]);

  return { contributors, isLoading, error };
}
