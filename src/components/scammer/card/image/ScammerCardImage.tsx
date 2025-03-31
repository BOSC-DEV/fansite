
import { useState, useEffect } from "react";
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

export function ScammerCardImage({ 
  name, 
  photoUrl, 
  likes, 
  dislikes, 
  views,
  comments = 0,
  scammerId,
  rank
}: ScammerCardImageProps) {
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
      scammerService.incrementScammerViews(scammerId);
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
  
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
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
    </div>
  );
}
