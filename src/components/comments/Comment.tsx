
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, UserCircle2, ExternalLink, Eye } from "lucide-react";
import { formatTimeAgo } from "@/utils/formatters";
import { Link } from "react-router-dom";
import { useCommentInteractions } from "@/hooks/comments/useCommentInteractions";
import { useCommentsViewTracking } from "@/hooks/comments/useCommentsViewTracking";

export interface CommentType {
  id: string;
  content: string;
  author: string;
  authorName: string;
  authorProfilePic: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  views: number;
  scammerId?: string;
}

interface CommentProps {
  comment: CommentType;
  showScammerLink?: boolean;
}

export function Comment({ comment, showScammerLink = false }: CommentProps) {
  const { 
    likes, 
    dislikes,
    isLiked,
    isDisliked,
    handleLike,
    handleDislike
  } = useCommentInteractions({
    commentId: comment.id,
    initialLikes: comment.likes,
    initialDislikes: comment.dislikes
  });

  // Use the dedicated hook for view tracking
  useCommentsViewTracking(comment.id);

  // Use our safe formatTimeAgo utility instead of direct date-fns usage
  const formatDate = (dateString: string) => {
    try {
      // Handle potential invalid date strings
      if (!dateString || dateString === 'Invalid Date') {
        return 'Recently';
      }
      return formatTimeAgo(dateString);
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return 'Recently';
    }
  };

  return (
    <Card className="border-western-wood/30 bg-transparent">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.authorProfilePic} alt={comment.authorName} />
            <AvatarFallback className="bg-western-sand text-western-wood">
              <UserCircle2 className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{comment.authorName}</p>
            <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
          </div>
          {showScammerLink && comment.scammerId && (
            <Link 
              to={`/scammer/${comment.scammerId}`} 
              className="flex items-center text-xs text-western-accent hover:underline"
            >
              <span className="mr-1">View Listing</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2 px-4">
        <p className="text-sm">{comment.content}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-2 px-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-1 text-xs transition-colors ${isLiked ? 'text-green-600' : 'hover:text-green-600'}`}
            aria-label="Like comment"
          >
            <ThumbsUp className="h-3 w-3" />
            <span>{likes || 0}</span>
          </button>
          <button 
            onClick={handleDislike}
            className={`flex items-center space-x-1 text-xs transition-colors ${isDisliked ? 'text-red-600' : 'hover:text-red-600'}`}
            aria-label="Dislike comment"
          >
            <ThumbsDown className="h-3 w-3" />
            <span>{dislikes || 0}</span>
          </button>
          <div className="flex items-center space-x-1 text-xs text-western-wood/70">
            <Eye className="h-3 w-3" />
            <span>{comment.views || 0}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
