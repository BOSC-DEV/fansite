
import { supabase } from '@/lib/supabase';

// Helper function to safely convert JSON arrays to string arrays
export const safeJsonToStringArray = (jsonArray: any | null): string[] => {
  if (!jsonArray) return [];
  
  // If it's already an array, map each item to string
  if (Array.isArray(jsonArray)) {
    return jsonArray.map(item => String(item));
  }
  
  // If it's a single value, return as a single-item array
  return [String(jsonArray)];
};

// Base class with common supabase functionality
export class BaseSupabaseService {
  protected supabase = supabase;
}
