
import React from "react";
import { Card } from "@/components/ui/card";
import { UserProfile } from "@/services/storage";
import { Globe, Copy, Award, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface InfoTabProps {
  profile: UserProfile;
}

export function InfoTab({ profile }: InfoTabProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Wallet address copied to clipboard");
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Profile Information</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-western-wood">Display Name</h3>
            <p className="text-western-wood">{profile.displayName}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-western-wood">Username</h3>
            <p className="text-western-wood">@{profile.username}</p>
          </div>
          
          {profile.bio && (
            <div>
              <h3 className="text-sm font-medium text-western-wood">Bio</h3>
              <p className="text-western-wood">{profile.bio}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-western-wood">Wallet Address</h3>
            <div className="flex items-center gap-2">
              <p className="text-western-wood font-mono">{formatAddress(profile.walletAddress)}</p>
              <button 
                onClick={() => copyToClipboard(profile.walletAddress)}
                className="text-western-wood hover:text-western-accent transition-colors"
                aria-label="Copy wallet address"
                title="Copy wallet address"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
          
          {profile.points !== undefined && (
            <div>
              <h3 className="text-sm font-medium text-western-wood flex items-center gap-1">
                Score
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button className="inline-flex cursor-help">
                        <HelpCircle className="h-3.5 w-3.5 text-western-accent/70" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs bg-western-parchment text-western-wood border-western-accent/50 p-4">
                      <p className="font-medium mb-1">Score Calculation</p>
                      <p className="text-xs mb-2">Your score is calculated based on:</p>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li>Reports: 10 points each</li>
                        <li>Likes: 2 points each</li>
                        <li>Views: 1 point each</li>
                        <li>Comments: 3 points each</li>
                        <li>Bounty generated: Added to total</li>
                        <li>Bounty spent: Added to total</li>
                      </ul>
                      <p className="text-xs mt-2">Everyone starts with at least 1 point!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h3>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <p className="text-western-wood font-medium">{profile.points.toLocaleString()} score</p>
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-western-wood">Joined</h3>
            <p className="text-western-wood">{new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
          
          {(profile.xLink || profile.websiteLink) && (
            <div>
              <h3 className="text-sm font-medium text-western-wood">Links</h3>
              <div className="flex space-x-4 mt-2">
                {profile.xLink && (
                  <a href={profile.xLink} target="_blank" rel="noopener noreferrer" 
                     className="text-western-wood hover:text-western-accent transition-colors flex items-center gap-2">
                    <img 
                      src="/lovable-uploads/b26a0095-6dd4-4425-9294-0b6ee067135a.png" 
                      alt="X (Twitter)" 
                      className="h-4 w-4" 
                    />
                    <span>X / Twitter</span>
                  </a>
                )}
                {profile.websiteLink && (
                  <a href={profile.websiteLink} target="_blank" rel="noopener noreferrer"
                     className="text-western-wood hover:text-western-accent transition-colors flex items-center gap-2">
                    <Globe size={16} />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
