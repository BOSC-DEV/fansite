
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Info, Terminal } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { useWallet } from "@/context/WalletContext";

export const MostWantedHeader = () => {
  const { isConnected } = useWallet();

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-hacker text-hacker-accent neon-glow mb-2">Terminal_Access: Most_Wanted</h1>
        <p className="text-hacker-text/80 max-w-xl font-mono">
          <Terminal className="inline-block h-4 w-4 mr-1 text-hacker-accent" />
          <span className="terminal-text">Browse registry of identified malicious actors</span>
        </p>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              asChild={isConnected} 
              className="w-full sm:w-auto bg-hacker-accent text-hacker-bg hover:bg-hacker-accent/90 flex items-center justify-center border border-hacker-border/20"
              onClick={!isConnected ? () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } : undefined}
              disabled={!isConnected}
            >
              {isConnected ? (
                <Link to="/create-listing">
                  <Plus className="mr-2 h-4 w-4" />
                  Report Scammer
                </Link>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Report Scammer
                </>
              )}
            </Button>
          </TooltipTrigger>
          {!isConnected && (
            <TooltipContent className="bg-hacker-card border-hacker-border text-hacker-text">
              <p className="flex items-center">
                <Info className="h-4 w-4 mr-2 text-hacker-accent" />
                Connect your wallet to report a scammer
              </p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
