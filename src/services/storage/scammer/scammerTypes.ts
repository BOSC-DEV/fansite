
import { Json } from '@/integrations/supabase/types';

export interface ScammerListing {
  id: string;
  name: string;
  photoUrl: string;
  accusedOf: string;
  links: string[];
  aliases: string[];
  accomplices: string[];
  officialResponse: string;
  bountyAmount: number;
  walletAddress: string;
  dateAdded: string;
  addedBy: string;
  likes: number;
  dislikes: number;
  views: number;
  comments?: string[];
  xLink?: string;
}

export interface ScammerDbRecord {
  id: string;
  name: string;
  photo_url: string;
  accused_of: string;
  links: Json;
  aliases: Json;
  accomplices: Json;
  official_response: string;
  bounty_amount: number;
  wallet_address: string;
  date_added: string;
  added_by: string;
  likes: number;
  dislikes: number;
  views: number;
  comments?: Json;
  x_link?: string;
}

export interface ScammerStats {
  likes?: number;
  dislikes?: number;
  views?: number;
}

export interface UserScammerInteraction {
  userId: string;
  scammerId: string;
  liked: boolean;
  disliked: boolean;
  lastUpdated: string;
}

export interface ScammerView {
  scammerId: string;
  ipHash: string;
  viewedAt: string;
}
