
import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { ScammerImageLoader } from "./ScammerImageLoader";
import { InteractionsBar } from "./InteractionsBar";
import { ScammerCardBadge } from "./ScammerCardBadge";
import { scammerService } from "@/services/storage/scammer/scammerService";
import { toast } from "sonner";

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
  const [viewIncremented, setViewIncremented] = useState(false);

  // Debug the image URL
  useEffect(() => {
    console.log(`ScammerCardImage for ${name}:`, {
      photoUrl,
      hasPhoto: Boolean(photoUrl)
    });
  }, [name, photoUrl]);

  const handleImageLoaded = (loaded: boolean, error: boolean) => {
    setImageLoaded(loaded);
    setImageError(error);
    
    // If there was an error loading the image, but we still need to show the card
    if (error && !imageLoaded) {
      console.log(`Using fallback for ${name} in ScammerCardImage`);
    }
  };

  // Increment view count when component mounts, but only once
  useEffect(() => {
    if (scammerId && !viewIncremented) {
      // Increment view count
      const incrementViews = async () => {
        try {
          await scammerService.incrementScammerViews(scammerId);
          setViewIncremented(true);
        } catch (error) {
          console.error("Failed to increment views:", error);
        }
      };
      
      incrementViews();
    }
  }, [scammerId, viewIncremented]);

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
