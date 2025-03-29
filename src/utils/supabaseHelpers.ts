
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Tests if Supabase Row Level Security (RLS) policies are correctly applied
 * by attempting to read from a table with RLS enabled
 */
export async function testRLSPolicies(): Promise<boolean> {
  // First check if we have a valid session
  const { data: sessionData } = await supabase.auth.getSession();
  const hasValidSession = !!sessionData?.session;
  
  console.log("Testing RLS policies. Valid session:", hasValidSession);
  
  if (!hasValidSession) {
    console.warn("No valid session found, RLS policies may not apply correctly");
    return false;
  }
  
  try {
    // Attempt to read from profiles table, which has RLS enabled
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
      
    if (error) {
      console.error("RLS test failed:", error);
      return false;
    }
    
    console.log("RLS test succeeded. Data accessible:", !!data);
    return true;
  } catch (error) {
    console.error("Exception during RLS test:", error);
    return false;
  }
}

/**
 * Validate if current user is authenticated properly for Supabase RLS
 */
export async function validateAuth(): Promise<boolean> {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error("Auth validation error:", error);
    return false;
  }
  
  return !!data.user;
}

/**
 * Helper function to safely handle Supabase errors
 */
export function handleSupabaseError(error: any, fallbackMessage = "An error occurred"): string {
  if (!error) return fallbackMessage;
  
  // Check for RLS violations
  if (typeof error.message === 'string' && error.message.includes("row-level security")) {
    return "Authentication error: You don't have permission to perform this action";
  }
  
  // Check for network errors
  if (error.code === "NETWORK_ERROR" || error.message?.includes("network")) {
    return "Network error: Please check your connection";
  }
  
  // Return the actual error message if available
  return error.message || error.error_description || fallbackMessage;
}

/**
 * Safely execute a Supabase query with proper error handling
 */
export async function safeSupabaseQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  options: {
    errorToast?: boolean;
    errorMessage?: string;
  } = {}
): Promise<{ data: T | null; error: any }> {
  const { errorToast = true, errorMessage = "Operation failed" } = options;
  
  try {
    const result = await queryFn();
    
    if (result.error && errorToast) {
      const message = handleSupabaseError(result.error, errorMessage);
      toast.error(message);
    }
    
    return result;
  } catch (error) {
    if (errorToast) {
      const message = handleSupabaseError(error, errorMessage);
      toast.error(message);
    }
    
    return { data: null, error };
  }
}
