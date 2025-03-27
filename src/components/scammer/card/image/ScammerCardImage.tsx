
import { useState, useEffect, memo, useCallback } from "react";
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

  // Debug the image URL
  useEffect(() => {
    console.log(`ScammerCardImage for ${name}:`, {
      photoUrl,
      hasPhoto: Boolean(photoUrl)
    });
  }, [name, photoUrl]);

  const handleImageLoaded = useCallback((loaded: boolean, error: boolean) => {
    setImageLoaded(loaded);
    setImageError(error);
  }, []);

  // Increment view count when component mounts, but only once and only after image loads
  useEffect(() => {
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
  const scrollToComments = () => {
    if (scammerId) {
      const commentsSection = document.querySelector('.comments-section');
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
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
