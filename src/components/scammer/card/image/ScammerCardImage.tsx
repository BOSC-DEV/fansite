
import { useState, useEffect, memo, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ScammerImageLoader } from "./ScammerImageLoader";
import { InteractionsBar } from "./InteractionsBar";
import { ScammerCardBadge } from "./ScammerCardBadge";
import { scammerService } from "@/services/storage/scammer/scammerService";

interface ScammerCardImageProps {
  name: string;
  photoUrl: string;
  likes: number;
  dislikes: number;
  views: number;
  shares: number;
  comments?: number;
  scammerId?: string;
  rank?: number;
}

const ScammerCardImageComponent = ({ 
  name, 
  photoUrl, 
  likes, 
  dislikes, 
  views,
  shares,
  comments = 0,
  scammerId,
  rank
}: ScammerCardImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hasAttemptedViewIncrement, setHasAttemptedViewIncrement] = useState(false);
  const mounted = useRef(true);
  const instanceId = useRef(`scammer-card-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

  // Set up when component mounts and clean up when it unmounts
  useEffect(() => {
    mounted.current = true;
    
    // Debug the image URL
    console.log(`ScammerCardImage mounted for ${name}:`, {
      photoUrl,
      hasPhoto: Boolean(photoUrl),
      instanceId: instanceId.current
    });
    
    return () => {
      mounted.current = false;
    };
  }, [name, photoUrl]);

  // Reset state when photoUrl changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    setHasAttemptedViewIncrement(false);
  }, [photoUrl]);

  const handleImageLoaded = useCallback((loaded: boolean, error: boolean) => {
    if (!mounted.current) return;
    
    setImageLoaded(loaded);
    setImageError(error);
    
    console.log(`Image state updated for ${name}:`, { loaded, error, instanceId: instanceId.current });
  }, [name]);

  // Increment view count when component mounts, but only once and only after image loads
  useEffect(() => {
    if (!mounted.current) return;
    
    if (scammerId && imageLoaded && !hasAttemptedViewIncrement) {
      // Increment view count
      const incrementViews = async () => {
        try {
          setHasAttemptedViewIncrement(true);
          await scammerService.incrementScammerViews(scammerId);
        } catch (error) {
          console.error("Failed to increment views:", error);
        }
      };
      
      incrementViews();
    }
  }, [scammerId, imageLoaded, hasAttemptedViewIncrement]);

  // Only attempt to scroll if we're on a detail page
  const scrollToComments = useCallback(() => {
    if (scammerId) {
      const commentsSection = document.querySelector('.comments-section');
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [scammerId]);
  
  return (
    <Link 
      to={scammerId ? `/scammer/${scammerId}` : "#"} 
      className="block relative aspect-square overflow-hidden bg-muted cursor-pointer w-full"
    >
      <ScammerImageLoader 
        name={name} 
        photoUrl={photoUrl} 
        onImageLoaded={handleImageLoaded} 
      />
      
      <InteractionsBar 
        scammerId={scammerId}
        likes={likes}
        dislikes={dislikes}
        views={views}
        shares={shares}
        comments={comments}
        onScrollToComments={scrollToComments}
      />
      
      <ScammerCardBadge 
        name={name} 
        rank={rank} 
      />
    </Link>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const ScammerCardImage = memo(ScammerCardImageComponent);
