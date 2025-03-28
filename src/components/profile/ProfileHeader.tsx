
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Link2, Coins, Award, Gift, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditProfileButton } from "./EditProfileButton";
import { useWallet } from "@/context/WalletContext";
import { SolAmount } from '@/components/SolAmount';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GlowingEffect } from '@/components/ui/glowing-effect';

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
  const {
    balance
  } = useWallet();
  const displayBalance = walletBalance !== undefined ? walletBalance : balance;

  // Format the join date nicely
  const formattedDate = joinDate ? new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(joinDate) : 'Unknown join date';

  // Format website URL for display
  const formatWebsiteUrl = (url: string) => {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-hacker-border bg-hacker-dark">
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback className="bg-hacker-accent/20 text-hacker-accent text-xl font-hacker">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <GlowingEffect 
              glow={true}
              disabled={false}
              spread={40}
              borderWidth={2}
              variant="matrix"
              blur={5}
            />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-hacker-accent font-hacker">{name || username}</h1>
            <p className="text-sm text-hacker-text/70">@{username}</p>
            
            <div className="mt-1 flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="bg-hacker-dark/10 border-hacker-border/30 text-hacker-accent text-xs cursor-help relative">
                      <Gift className="h-3 w-3 mr-1" />
                      <span className="font-mono">{points.toLocaleString()} score</span>
                      <HelpCircle className="h-3 w-3 ml-1 text-hacker-accent/70" />
                      <GlowingEffect 
                        glow={true}
                        disabled={false}
                        spread={20}
                        borderWidth={1}
                        variant="matrix"
                        blur={3}
                      />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-hacker-dark text-hacker-text border-hacker-border/50 p-4">
                    <p className="font-medium mb-1">Score Algorithm</p>
                    <p className="text-xs mb-2">Score is calculated based on:</p>
                    <ul className="text-xs list-disc pl-4 space-y-1">
                      <li>Profile age (days)</li>
                      <li>Number of reports submitted</li>
                      <li>Engagement (likes × views)</li>
                      <li>Bounties generated and spent</li>
                    </ul>
                    <p className="text-xs mt-2">Higher engagement and more contributions lead to a higher score!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {address && (
                <Badge variant="outline" className="bg-hacker-dark/10 border-hacker-border/30 text-hacker-accent text-xs relative">
                  <Coins className="h-3 w-3 mr-1" />
                  <SolAmount amount={displayBalance || 0} className="font-mono" />
                  <GlowingEffect 
                    glow={true}
                    disabled={false}
                    spread={20}
                    borderWidth={1}
                    variant="matrix"
                    blur={3}
                  />
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {isCurrentUser && <EditProfileButton />}
      </div>
      
      {bio && <p className="text-sm text-hacker-text/90 max-w-2xl px-[20px] font-mono">
          {bio}
        </p>}
      
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-hacker-text/70 font-mono">
        {location && <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>}
        
        {website && <div className="flex items-center px-[20px]">
            <Link2 className="h-4 w-4 mr-1" />
            <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="hover:text-hacker-accent hover:underline px-0">
              {formatWebsiteUrl(website)}
            </a>
          </div>}
        
        {joinDate && <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>Joined {formattedDate}</span>
          </div>}
      </div>
    </div>
  );
}
