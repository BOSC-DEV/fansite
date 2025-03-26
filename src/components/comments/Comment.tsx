
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, UserCircle2 } from "lucide-react";
import { formatTimeAgo } from "@/utils/formatters";
import { commentService } from "@/services/storage/localStorageService";

export interface CommentType {
  id: string;
  content: string;
  author: string;
  authorName: string;
  authorProfilePic: string;
  createdAt: string;
  likes: number;
  dislikes: number;
}

interface CommentProps {
  comment: CommentType;
}

export function Comment({ comment }: CommentProps) {
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

  const handleLike = () => {
    commentService.likeComment(comment.id);
  };

  const handleDislike = () => {
    commentService.dislikeComment(comment.id);
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
          <div>
            <p className="text-sm font-medium">{comment.authorName}</p>
            <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 px-4">
        <p className="text-sm">{comment.content}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-2 px-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLike}
            className="flex items-center space-x-1 text-xs hover:text-green-600 transition-colors"
          >
            <ThumbsUp className="h-3 w-3" />
            <span>{comment.likes || 0}</span>
          </button>
          <button 
            onClick={handleDislike}
            className="flex items-center space-x-1 text-xs hover:text-red-600 transition-colors"
          >
            <ThumbsDown className="h-3 w-3" />
            <span>{comment.dislikes || 0}</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
