
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Link2, Coins, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditProfileButton } from "./EditProfileButton";
import { useWallet } from "@/context/WalletContext";
import { SolAmount } from '@/components/SolAmount';

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

  // Format the join date nicely
  const formattedDate = joinDate 
    ? new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
      }).format(joinDate) 
    : 'Unknown join date';

  // Format website URL for display
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
              <Badge variant="outline" className="bg-western-sand/20 border-western-wood/30 text-western-wood">
                Bounty Hunter
              </Badge>
              {address && (
                <Badge variant="outline" className="bg-western-accent/10 border-western-accent/30 text-western-accent text-xs">
                  <Coins className="h-3 w-3 mr-1" />
                  <SolAmount amount={displayBalance || 0} className="font-mono" />
                </Badge>
              )}
              {points > 0 && (
                <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-500 text-xs">
                  <Award className="h-3 w-3 mr-1" />
                  <span className="font-mono">{points.toLocaleString()} pts</span>
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {isCurrentUser && <EditProfileButton />}
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
      
      <div className="border-t border-western-wood/20 pt-4">
        <div className="flex space-x-6">
          <div>
            <span className="text-sm font-bold text-western-wood">0</span>
            <span className="text-sm text-western-wood/70 ml-1">Following</span>
          </div>
          <div>
            <span className="text-sm font-bold text-western-wood">0</span>
            <span className="text-sm text-western-wood/70 ml-1">Followers</span>
          </div>
          <div>
            <span className="text-sm font-bold text-western-wood">0</span>
            <span className="text-sm text-western-wood/70 ml-1">Reports</span>
          </div>
        </div>
      </div>
    </div>
  );
}
