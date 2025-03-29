
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/database.types';
import { PostgrestQueryBuilder } from '@supabase/postgrest-js';

// Type definitions for our database schema
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
export type Scammer = Database['public']['Tables']['scammers']['Row'];
export type ScammerView = Database['public']['Tables']['scammer_views']['Row'];
export type UserScammerInteraction = Database['public']['Tables']['user_scammer_interactions']['Row'];
export type UserCommentInteraction = Database['public']['Tables']['user_comment_interactions']['Row'];
export type LeaderboardStats = Database['public']['Tables']['leaderboard_stats']['Row'];

// Type for table references to help with type checking
export type TableName = keyof Database['public']['Tables'];

// Helper to cast database calls with proper types
export function fromTable<T extends TableName>(table: T) {
  return supabase.from(table) as PostgrestQueryBuilder<Database['public'], Database['public']['Tables'][T]['Row'], Database['public']['Tables'][T]['Insert']>;
}

// Type-safe table accessors
export const db = {
  profiles: () => fromTable('profiles'),
  scammers: () => fromTable('scammers'),
  comments: () => fromTable('comments'),
  scammerViews: () => fromTable('scammer_views'),
  userScammerInteractions: () => fromTable('user_scammer_interactions'),
  userCommentInteractions: () => fromTable('user_comment_interactions'),
  leaderboardStats: () => fromTable('leaderboard_stats')
};

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

// TypeScript type guards
export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

// Helper for type casting
export function asType<T>(value: unknown): T {
  return value as T;
}

// Safely cast database response to a specific type
export function castResponse<T>(data: unknown): T | null {
  if (!data) return null;
  return data as T;
}

// Cast database array response to an array of a specific type
export function castArrayResponse<T>(data: unknown): T[] {
  if (!data || !Array.isArray(data)) return [];
  return data as T[];
}

// For safely working with database responses
export function processDbResponse<T>(data: unknown, defaultValue: T): T {
  if (!data) return defaultValue;
  return data as T;
}
