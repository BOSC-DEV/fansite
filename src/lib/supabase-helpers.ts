
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/database.types';

// Type definitions for our database schema
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
export type Scammer = Database['public']['Tables']['scammers']['Row'];
export type ScammerView = Database['public']['Tables']['scammer_views']['Row'];
export type UserScammerInteraction = Database['public']['Tables']['user_scammer_interactions']['Row'];
export type UserCommentInteraction = Database['public']['Tables']['user_comment_interactions']['Row'];
export type LeaderboardStats = Database['public']['Tables']['leaderboard_stats']['Row'];

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
