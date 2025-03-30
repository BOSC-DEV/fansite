
import { supabase } from '@/integrations/supabase/client';

// Export the supabase client
export { supabase };

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return true; // We now have hardcoded values from our Supabase project
};

// Helper function to bypass RLS for operations
export const createAdminClient = () => {
  // This is just a placeholder because we can't access the service role key in the browser
  // The real admin operations should be done via RPC functions
  return supabase;
};
