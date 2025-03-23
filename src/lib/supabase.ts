
import { supabase } from '@/integrations/supabase/client';

// Export the supabase client
export { supabase };

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return true; // We now have hardcoded values from our Supabase project
};
