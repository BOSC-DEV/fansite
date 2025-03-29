import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Link2, Coins, Award, Gift, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditProfileButton } from "./EditProfileButton";
import { ShareProfileButton } from "./ShareProfileButton";
import { useWallet } from "@/context/WalletContext";
import { SolAmount } from '@/components/SolAmount';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface ProfileHeaderProps {
  username: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  joinDate?: Date;
  isCurrentUser: boolean;
  address?: string;
  walletBalance?: number;
  points?: number;
}

export function ProfileHeader({
  username,
  name,
  bio,
  avatarUrl,
  location,
  website,
  joinDate,
  isCurrentUser,
  address,
  walletBalance,
  points = 0
}: ProfileHeaderProps) {
  const { balance } = useWallet();
  const displayBalance = walletBalance !== undefined ? walletBalance : balance;

  const formattedDate = joinDate 
    ? new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
      }).format(joinDate) 
    : 'Unknown join date';

  const formatWebsiteUrl = (url: string) => {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          <Avatar className="h-20 w-20 border-2 border-western-wood bg-western-sand">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-western-accent/20 text-western-wood text-xl font-western">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="text-2xl font-bold text-western-wood font-western">{name || username}</h1>
            <p className="text-sm text-western-wood/70">@{username}</p>
            
            <div className="mt-1 flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="bg-western-accent/10 border-western-accent/30 text-western-accent text-xs cursor-help">
                      <Gift className="h-3 w-3 mr-1" />
                      <span className="font-mono">{points.toLocaleString()} score</span>
                      <HelpCircle className="h-3 w-3 ml-1 text-western-accent/70" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs bg-western-parchment text-western-wood border-western-accent/50 p-4">
                    <p className="font-medium mb-1">Score Algorithm</p>
                    <p className="text-xs mb-2">Score is calculated based on:</p>
                    <ul className="text-xs list-disc pl-4 space-y-1">
                      <li>Bounty spent + bounty generated</li>
                      <li>Profile age (days) × likes × views × comments</li>
                    </ul>
                    <p className="text-xs mt-2">Higher engagement and more contributions lead to a higher score!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {address && (
                <Badge variant="outline" className="bg-western-accent/10 border-western-accent/30 text-western-accent text-xs">
                  <Coins className="h-3 w-3 mr-1" />
                  <SolAmount amount={displayBalance || 0} className="font-mono" />
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isCurrentUser ? (
            <EditProfileButton profileAddress={address} size="sm" />
          ) : (
            <ShareProfileButton username={username} walletAddress={address} />
          )}
        </div>
      </div>
      
      {bio && (
        <p className="text-sm text-western-wood/90 max-w-2xl">
          {bio}
        </p>
      )}
      
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-western-wood/70">
        {location && (
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
        )}
        
        {website && (
          <div className="flex items-center">
            <Link2 className="h-4 w-4 mr-1" />
            <a 
              href={website.startsWith('http') ? website : `https://${website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-western-accent hover:underline"
            >
              {formatWebsiteUrl(website)}
            </a>
          </div>
        )}
        
        {joinDate && (
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>Joined {formattedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
