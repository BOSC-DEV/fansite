
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Info } from "lucide-react";
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
        <h1 className="text-3xl font-wanted text-western-accent mb-2">Most Wanted Scammers</h1>
        <p className="text-western-wood max-w-xl">Browse the list of reported scammers in the crypto space</p>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              asChild={isConnected} 
              className="w-full sm:w-auto bg-western-accent hover:bg-western-accent/90 text-western-parchment flex items-center justify-center"
              onClick={!isConnected ? () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } : undefined}
              disabled={!isConnected}
            >
              {isConnected ? (
                <Link to="/create-listing">
                  <Plus className="mr-2 h-4 w-4" />
                  Report a Scammer
                </Link>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Report a Scammer
                </>
              )}
            </Button>
          </TooltipTrigger>
          {!isConnected && (
            <TooltipContent>
              <p className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Connect your wallet to report a scammer
              </p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
