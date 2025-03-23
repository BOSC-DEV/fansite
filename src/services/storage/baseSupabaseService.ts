
import { supabase } from '@/lib/supabase';

// Helper function to safely convert JSON arrays to string arrays
export const safeJsonToStringArray = (jsonArray: any | null): string[] => {
  if (!jsonArray) return [];
  
  try {
    // If it's a string that looks like JSON, try to parse it
    if (typeof jsonArray === 'string' && (jsonArray.startsWith('[') || jsonArray.startsWith('{'))) {
      const parsed = JSON.parse(jsonArray);
      if (Array.isArray(parsed)) {
        return parsed.map(item => String(item));
      }
      return [String(parsed)];
    }
    
    // If it's already an array, map each item to string
    if (Array.isArray(jsonArray)) {
      return jsonArray.map(item => String(item));
    }
    
    // If it's a single value, return as a single-item array
    return [String(jsonArray)];
  } catch (error) {
    console.error("Error parsing JSON array:", error, jsonArray);
    return [];
  }
};

// Base class with common supabase functionality
export class BaseSupabaseService {
  protected supabase = supabase;
}
