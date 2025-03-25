
import { useState, useEffect } from "react";
import { AlertCircle, Eye, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScammerCardImageProps {
  name: string;
  photoUrl: string;
  likes: number;
  dislikes: number;
  views: number;
  comments?: number;
  scammerId?: string;
}

export function ScammerCardImage({ 
  name, 
  photoUrl, 
  likes, 
  dislikes, 
  views,
  comments = 0,
  scammerId
}: ScammerCardImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Reset image states when image changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [photoUrl]);

  const handleImageError = () => {
    console.log(`Image failed to load for scammer: ${name}`);
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const scrollToComments = () => {
    // Only attempt to scroll if we're on a detail page
    if (scammerId) {
      const commentsSection = document.querySelector('.comments-section');
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're not on a detail page, navigate to the detail page with a hash
      window.location.href = `/scammer/${scammerId}#comments`;
    }
  };

  // Fallback URL when image fails to load
  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`;
  
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
        </div>
      )}
      <img
        src={imageError ? fallbackImageUrl : photoUrl}
        alt={name}
        className={cn(
          "object-cover w-full h-full transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
      <div className="absolute top-0 right-0 p-2 flex space-x-2">
        <div className="flex items-center bg-black/60 text-white py-1 px-2 rounded-full text-xs">
          <ThumbsUp className="h-3 w-3 mr-1" />
          <span>{likes || 0}</span>
        </div>
        <div className="flex items-center bg-black/60 text-white py-1 px-2 rounded-full text-xs">
          <ThumbsDown className="h-3 w-3 mr-1" />
          <span>{dislikes || 0}</span>
        </div>
        <div className="flex items-center bg-black/60 text-white py-1 px-2 rounded-full text-xs">
          <Eye className="h-3 w-3 mr-1" />
          <span>{views || 0}</span>
        </div>
        <div 
          className="flex items-center bg-black/60 text-white py-1 px-2 rounded-full text-xs cursor-pointer hover:bg-black/80"
          onClick={scrollToComments}
        >
          <MessageSquare className="h-3 w-3 mr-1" />
          <span>{comments}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white truncate">{name}</h3>
          <Badge variant="destructive" className="ml-2 shrink-0">
            Wanted
          </Badge>
        </div>
      </div>
    </div>
  );
}
