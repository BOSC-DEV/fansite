
import React from "react";
import { Card } from "@/components/ui/card";
import { UserProfile } from "@/services/storage";
import { Twitter, Globe, Copy, Award, HelpCircle } from "lucide-react";
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
              <p className="text-xs overflow-hidden text-ellipsis text-western-wood">{profile.walletAddress}</p>
              <button 
                onClick={() => copyToClipboard(profile.walletAddress)}
                className="text-western-wood hover:text-western-accent transition-colors"
                aria-label="Copy wallet address"
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
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex cursor-help">
                        <HelpCircle className="h-3.5 w-3.5 text-western-accent/70" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs bg-western-parchment text-western-wood border-western-accent/50 p-4">
                      <p className="font-medium mb-1">Score Algorithm</p>
                      <p className="text-xs mb-2">Your score is calculated based on:</p>
                      <ul className="text-xs list-disc pl-4 space-y-1">
                        <li>Profile age (days on BOSC)</li>
                        <li>Number of scammer reports submitted</li>
                        <li>Engagement on your reports (likes and views)</li>
                        <li>Bounties generated and spent</li>
                      </ul>
                      <p className="text-xs mt-2">Higher engagement and more contributions lead to a higher score!</p>
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
                    <Twitter size={16} />
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
