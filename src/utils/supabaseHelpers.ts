
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Safely execute a Supabase query with proper error handling
 * @param queryFn The function that performs the Supabase query
 * @returns The result of the query or an error object
 */
export async function safeSupabaseQuery<T>(queryFn: () => Promise<{ data: T | null; error: any }>): Promise<{ data: T | null; error: any }> {
  try {
    // Check if user is authenticated before making the query
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      console.warn("User not authenticated with Supabase");
      return { data: null, error: new Error("Authentication required") };
    }
    
    const result = await queryFn();
    return result;
  } catch (error) {
    console.error("Error executing Supabase query:", error);
    return { data: null, error };
  }
}

/**
 * Validate that the user is authenticated with Supabase
 * @returns True if authenticated, false otherwise
 */
export async function validateAuth(): Promise<boolean> {
  try {
    // Check authentication status
    const { data } = await supabase.auth.getSession();
    
    if (!data.session) {
      console.log("No active Supabase session found");
      return false;
    }
    
    // Verify session is still valid
    const isSessionExpired = data.session.expires_at 
      ? (new Date().getTime() / 1000) > data.session.expires_at 
      : false;
    
    if (isSessionExpired) {
      console.log("Supabase session has expired");
      return false;
    }

    // Verify token is still valid by getting the user
    try {
      const { data: userData, error } = await supabase.auth.getUser();
      
      if (error || !userData.user) {
        console.error("Error validating auth token:", error);
        return false;
      }
      
      console.log("User authenticated with Supabase");
      return true;
    } catch (error) {
      console.error("Exception getting auth user:", error);
      return false;
    }
  } catch (error) {
    console.error("Exception during auth validation:", error);
    return false;
  }
}

/**
 * Create a Supabase storage bucket if it doesn't exist
 * @param bucketName The name of the bucket to create
 * @returns True if bucket exists or was created successfully, false otherwise
 */
export async function ensureStorageBucketExists(bucketName: string): Promise<boolean> {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error("Error listing storage buckets:", listError);
      return false;
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === bucketName);
    
    if (bucketExists) {
      console.log(`Bucket '${bucketName}' already exists`);
      return true;
    }
    
    // Create bucket if it doesn't exist
    const { error: createError } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 2 * 1024 * 1024 // 2MB
    });
    
    if (createError) {
      console.error(`Error creating bucket '${bucketName}':`, createError);
      return false;
    }
    
    console.log(`Successfully created bucket '${bucketName}'`);
    return true;
  } catch (error) {
    console.error("Exception during bucket creation:", error);
    return false;
  }
}

/**
 * Attempts to establish authentication by connecting the wallet
 * @param connectWalletFn Function to connect the wallet
 * @returns True if authentication was successful, false otherwise
 */
export async function establishAuth(connectWalletFn: () => Promise<boolean>): Promise<boolean> {
  try {
    // First check if we're already authenticated
    const isAuthenticated = await validateAuth();
    if (isAuthenticated) {
      return true;
    }
    
    console.log("Not authenticated, attempting to reconnect wallet...");
    
    // Try to reconnect wallet to establish auth
    const reconnectSuccess = await connectWalletFn();
    if (!reconnectSuccess) {
      console.error("Failed to reconnect wallet");
      return false;
    }
    
    // Check auth again after reconnect
    const reconnectAuth = await validateAuth();
    return reconnectAuth;
  } catch (error) {
    console.error("Error establishing auth:", error);
    return false;
  }
}
