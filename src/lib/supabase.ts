
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

// Function to sign up with email
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await supabase.auth.signUp({
      email,
      password,
    });
    return result;
  } catch (error) {
    console.error("Error signing up with email:", error);
    return { error };
  }
};

// Function to sign in with email
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return result;
  } catch (error) {
    console.error("Error signing in with email:", error);
    return { error };
  }
};

// Function to send email verification
export const sendEmailVerification = async (email: string) => {
  try {
    const result = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return result;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { error };
  }
};
