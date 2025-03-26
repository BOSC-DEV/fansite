
import { useState, useEffect } from "react";
import { AlertCircle, Eye, ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { storageService } from "@/services/storage/localStorageService";

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
  const [localLikes, setLocalLikes] = useState(likes);
  const [localDislikes, setLocalDislikes] = useState(dislikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  
  // Check if user has already liked/disliked on component mount
  useEffect(() => {
    if (scammerId) {
      const userInteractions = localStorage.getItem(`scammer-interactions-${scammerId}`);
      if (userInteractions) {
        const { liked, disliked } = JSON.parse(userInteractions);
        setIsLiked(liked);
        setIsDisliked(disliked);
      }
    }
  }, [scammerId]);
  
  // Reset image states when image changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [photoUrl]);

  // Update local likes/dislikes when props change
  useEffect(() => {
    setLocalLikes(likes);
    setLocalDislikes(dislikes);
  }, [likes, dislikes]);

  const handleImageError = () => {
    console.log(`Image failed to load for scammer: ${name}`);
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!scammerId) return;

    if (isLiked) {
      // Unlike
      setIsLiked(false);
      setLocalLikes(prev => prev - 1);
      toast.info("Like removed");
    } else {
      // Like
      if (isDisliked) {
        // Remove dislike if present
        setIsDisliked(false);
        setLocalDislikes(prev => prev - 1);
      }
      setIsLiked(true);
      setLocalLikes(prev => prev + 1);
      toast.success("Liked scammer");
    }

    // Store interaction in localStorage
    localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
      liked: !isLiked, 
      disliked: isDisliked ? false : isDisliked 
    }));

    // Update in storage service
    try {
      storageService.updateScammerStats(scammerId, {
        likes: isLiked ? localLikes - 1 : localLikes + 1,
        dislikes: isDisliked ? localDislikes - 1 : localDislikes,
      });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!scammerId) return;

    if (isDisliked) {
      // Remove dislike
      setIsDisliked(false);
      setLocalDislikes(prev => prev - 1);
      toast.info("Dislike removed");
    } else {
      // Dislike
      if (isLiked) {
        // Remove like if present
        setIsLiked(false);
        setLocalLikes(prev => prev - 1);
      }
      setIsDisliked(true);
      setLocalDislikes(prev => prev + 1);
      toast.success("Disliked scammer");
    }

    // Store interaction in localStorage
    localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
      liked: isLiked ? false : isLiked, 
      disliked: !isDisliked 
    }));

    // Update in storage service
    try {
      storageService.updateScammerStats(scammerId, {
        likes: isLiked ? localLikes - 1 : localLikes,
        dislikes: isDisliked ? localDislikes - 1 : localDislikes + 1,
      });
    } catch (error) {
      console.error("Error updating dislikes:", error);
    }
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

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/scammer/${scammerId}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success("Link copied to clipboard", {
          description: "Share this scammer with others"
        });
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
        toast.error("Failed to copy link");
      });
  };

  // Ensure image has absolute URL for social sharing
  const getAbsoluteImageUrl = (url: string) => {
    if (url.startsWith('http')) {
      return url;
    }
    return `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // Fallback URL when image fails to load
  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`;
  
  // The image to display
  const displayImageUrl = imageError ? fallbackImageUrl : photoUrl;
  
  // Set absolute URL for use in SEO
  const absoluteImageUrl = getAbsoluteImageUrl(displayImageUrl);
  
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
        </div>
      )}
      <img
        src={displayImageUrl}
        alt={name}
        className={cn(
          "object-cover w-full h-full transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        data-absolute-url={absoluteImageUrl} // Store for potential SEO use
      />
      <div className="absolute top-0 right-0 p-2 flex space-x-2">
        <div 
          className={`flex items-center ${isLiked ? 'bg-green-600/80' : 'bg-black/60'} text-white py-1 px-2 rounded-full text-xs cursor-pointer hover:bg-black/80 transition-colors`}
          onClick={handleLike}
        >
          <ThumbsUp className="h-3 w-3 mr-1" />
          <span>{localLikes || 0}</span>
        </div>
        <div 
          className={`flex items-center ${isDisliked ? 'bg-red-600/80' : 'bg-black/60'} text-white py-1 px-2 rounded-full text-xs cursor-pointer hover:bg-black/80 transition-colors`}
          onClick={handleDislike}
        >
          <ThumbsDown className="h-3 w-3 mr-1" />
          <span>{localDislikes || 0}</span>
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
        {scammerId && (
          <div 
            className="flex items-center bg-black/60 text-white py-1 px-2 rounded-full text-xs cursor-pointer hover:bg-black/80"
            onClick={copyShareLink}
            title="Copy share link"
          >
            <Share2 className="h-3 w-3" />
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white truncate">{name}</h3>
          <Badge variant="destructive" className="ml-2 shrink-0">
            {rank ? `#${rank} Most Wanted` : 'Wanted'}
          </Badge>
        </div>
      </div>
      
      {/* Hidden metadata for Twitter crawlers */}
      <meta property="twitter:image" content={absoluteImageUrl} />
      <meta property="twitter:image:alt" content={`Profile image of ${name}`} />
      <meta property="og:image" content={absoluteImageUrl} />
    </div>
  );
}
