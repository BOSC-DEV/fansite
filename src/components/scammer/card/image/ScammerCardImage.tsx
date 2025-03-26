
import { useState, useEffect, memo } from "react";
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
  comments = 0,
  scammerId,
  rank
}: ScammerCardImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoaded = (loaded: boolean, error: boolean) => {
    setImageLoaded(loaded);
    setImageError(error);
  };

  // Increment view count when component mounts, but only once
  useEffect(() => {
    if (scammerId) {
      // Increment view count
      const incrementViews = async () => {
        try {
          await scammerService.incrementScammerViews(scammerId);
        } catch (error) {
          console.error("Failed to increment views:", error);
        }
      };
      
      incrementViews();
    }
  }, [scammerId]);

  // Only attempt to scroll if we're on a detail page
  const scrollToComments = () => {
    if (scammerId) {
      const commentsSection = document.querySelector('.comments-section');
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  // Wrapper component to conditionally render Link
  const ImageWrapper = ({ children }: { children: React.ReactNode }) => {
    if (scammerId) {
      return (
        <Link to={`/scammer/${scammerId}`} className="block relative aspect-[16/9] overflow-hidden bg-muted cursor-pointer">
          {children}
        </Link>
      );
    }
    return (
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {children}
      </div>
    );
  };
  
  return (
    <ImageWrapper>
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
        comments={comments}
        onScrollToComments={scrollToComments}
      />
      
      <ScammerCardBadge 
        name={name} 
        rank={rank} 
      />
    </ImageWrapper>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const ScammerCardImage = memo(ScammerCardImageComponent);
