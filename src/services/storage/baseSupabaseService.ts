
import { supabase } from '@/lib/supabase';

// Helper function to safely convert JSON arrays to string arrays
export const safeJsonToStringArray = (jsonArray: any | null): string[] => {
  if (!jsonArray) return [];
  
  try {
    // If it's already a string array, return it
    if (Array.isArray(jsonArray) && jsonArray.every(item => typeof item === 'string')) {
      return jsonArray;
    }
    
    // If it's a string that looks like JSON, try to parse it
    if (typeof jsonArray === 'string') {
      if (jsonArray.startsWith('[') || jsonArray.startsWith('{')) {
        const parsed = JSON.parse(jsonArray);
        if (Array.isArray(parsed)) {
          return parsed.map(item => String(item));
        }
      }
      // If it's a single string value that's not JSON, return as a single-item array
      return [jsonArray];
    }
    
    // If it's already an array but not all strings, convert each item to string
    if (Array.isArray(jsonArray)) {
      return jsonArray.map(item => String(item));
    }
    
    // If it's an object, try to check if it has values we can extract
    if (typeof jsonArray === 'object' && jsonArray !== null) {
      // If it has numeric keys, it might be an array-like object
      const values = Object.values(jsonArray);
      if (values.length > 0) {
        return values.map(item => String(item));
      }
    }
    
    // If it's a single value of another type, return as a single-item array
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
