
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, UserCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { storageService } from "@/services/storage/localStorageService";
import { Comment as CommentType } from "@/services/storage/commentService";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

interface CommentProps {
  comment: CommentType;
}

export function Comment({ comment }: CommentProps) {
  const [likes, setLikes] = useState(comment.likes || 0);
  const [dislikes, setDislikes] = useState(comment.dislikes || 0);
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "some time ago";
    }
  };

  const handleLike = () => {
    storageService.likeComment(comment.id);
    setLikes(prev => prev + 1);
  };

  const handleDislike = () => {
    storageService.dislikeComment(comment.id);
    setDislikes(prev => prev + 1);
  };

  return (
    <Card className="border-western-wood/20 bg-western-parchment/50">
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.authorProfilePic} alt={comment.authorName} />
            <AvatarFallback className="bg-western-sand text-western-wood">
              <UserCircle2 className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <Link 
              to={`/user/${comment.author}`} 
              className="text-sm font-medium hover:text-western-accent transition-colors"
            >
              {comment.authorName}
            </Link>
            <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 px-4">
        <p className="text-sm whitespace-pre-line">{comment.content}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-2 px-4">
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={handleLike}
                  className="flex items-center space-x-1 text-xs hover:text-green-600 transition-colors"
                >
                  <ThumbsUp className="h-3 w-3" />
                  <span>{likes}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Like this comment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={handleDislike}
                  className="flex items-center space-x-1 text-xs hover:text-red-600 transition-colors"
                >
                  <ThumbsDown className="h-3 w-3" />
                  <span>{dislikes}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dislike this comment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
}
