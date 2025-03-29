
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Type definitions for our database schema
export type Profile = {
  id: string;
  wallet_address: string;
  display_name: string;
  username?: string;
  profile_pic_url?: string;
  created_at: string;
  x_link?: string;
  website_link?: string;
  bio?: string;
}

export type Scammer = {
  id: string;
  name: string;
  photo_url?: string;
  accused_of?: string;
  links: string[];
  aliases: string[];
  accomplices: string[];
  official_response?: string;
  bounty_amount: number;
  wallet_address?: string;
  date_added: string;
  added_by?: string;
  likes: number;
  dislikes: number;
  views: number;
  shares: number;
  comments: any[];
  deleted_at?: string;
  active: boolean;
}

export type Comment = {
  id: string;
  scammer_id: string;
  content: string;
  author: string;
  author_name: string;
  author_profile_pic?: string;
  created_at: string;
  likes: number;
  dislikes: number;
  views: number;
}

export type ScammerView = {
  id: string;
  scammer_id: string;
  ip_hash: string;
  created_at: string;
}

export type UserScammerInteraction = {
  id: string;
  user_id: string;
  scammer_id: string;
  liked: boolean;
  disliked: boolean;
  last_updated: string;
}

export type UserCommentInteraction = {
  id: string;
  user_id: string;
  comment_id: string;
  liked: boolean;
  disliked: boolean;
  last_updated: string;
}

export type LeaderboardStats = {
  id: string;
  wallet_address: string;
  total_reports: number;
  total_views: number;
  total_likes: number;
  total_comments: number;
  total_bounty: number;
  last_updated: string;
}

// Type-safe table accessors using the Database type
export const db = {
  profiles: () => supabase.from<Profile>('profiles'),
  scammers: () => supabase.from<Scammer>('scammers'),
  comments: () => supabase.from<Comment>('comments'),
  scammerViews: () => supabase.from<ScammerView>('scammer_views'),
  userScammerInteractions: () => supabase.from<UserScammerInteraction>('user_scammer_interactions'),
  userCommentInteractions: () => supabase.from<UserCommentInteraction>('user_comment_interactions'),
  leaderboardStats: () => supabase.from<LeaderboardStats>('leaderboard_stats'),
  deletedScammers: () => supabase.from<Scammer>('deleted_scammers')
}

// Helper utility to safely check if a property exists on a potentially null object
export function safeGet<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined {
  return obj ? obj[key] : undefined;
}

// Helper functions for safely handling null or undefined data from Supabase queries
export function safeSpread<T>(obj: T | null): Partial<T> {
  return obj ? { ...obj } : {};
}

export function safeArray<T>(arr: T[] | null): T[] {
  return arr || [];
}

// Helper to safely access nested properties
export function safeProp<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined {
  if (!obj) return undefined;
  return obj[key];
}

// Helper to safely access properties with default values
export function safeGetWithDefault<T, K extends keyof T, D>(obj: T | null | undefined, key: K, defaultValue: D): T[K] | D {
  if (!obj) return defaultValue;
  const value = obj[key];
  return value !== undefined && value !== null ? value : defaultValue;
}
