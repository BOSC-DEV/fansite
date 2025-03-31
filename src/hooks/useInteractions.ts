
import { useInteractionHandlers } from "./interactions/useInteractionHandlers";

interface UseInteractionsProps {
  scammerId?: string;
  initialLikes: number;
  initialDislikes: number;
}

/**
 * Main hook for interaction management
 * Composes smaller hooks for specific functionality
 */
export function useInteractions({ 
  scammerId, 
  initialLikes, 
  initialDislikes 
}: UseInteractionsProps) {
  return useInteractionHandlers({
    scammerId,
    initialLikes,
    initialDislikes
  });
}
