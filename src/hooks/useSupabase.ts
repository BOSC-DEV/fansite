
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { db, castResponse, castArrayResponse } from '@/lib/supabase-helpers';
import { toast } from 'sonner';
import { extractErrorMessage } from '@/utils/databaseHelpers';

/**
 * Hook to provide type-safe access to Supabase client with error handling
 */
export function useSupabase() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Execute a Supabase query with proper loading state and error handling
   */
  const executeQuery = async <T>(
    queryFn: () => Promise<{ data: any; error: any }>,
    options: { 
      onSuccess?: (data: T) => void;
      onError?: (error: any) => void;
      errorMessage?: string;
      loadingState?: boolean;
    } = {}
  ): Promise<T | null> => {
    const { 
      onSuccess, 
      onError,
      errorMessage = 'Database operation failed',
      loadingState = true
    } = options;
    
    if (loadingState) setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await queryFn();
      
      if (error) {
        const errorMsg = extractErrorMessage(error);
        setError(errorMsg);
        if (onError) onError(error);
        console.error(errorMessage, error);
        toast.error(errorMessage);
        return null;
      }
      
      const typedData = castResponse<T>(data);
      if (onSuccess && typedData) onSuccess(typedData);
      return typedData;
    } catch (err) {
      const errorMsg = extractErrorMessage(err);
      setError(errorMsg);
      if (onError) onError(err);
      console.error(errorMessage, err);
      toast.error(errorMessage);
      return null;
    } finally {
      if (loadingState) setIsLoading(false);
    }
  };

  return {
    supabase,
    db,
    isLoading,
    error,
    executeQuery,
    castResponse,
    castArrayResponse
  };
}
