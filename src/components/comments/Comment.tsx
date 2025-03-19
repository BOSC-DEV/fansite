
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export interface CommentType {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: Date;
}

interface CommentProps {
  comment: CommentType;
}

export function Comment({ comment }: CommentProps) {
  return (
    <div className="flex gap-4 py-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.authorAvatar} alt={comment.author} />
        <AvatarFallback className="bg-muted">
          {comment.author.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{comment.author}</p>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-card-foreground">{comment.content}</p>
      </div>
    </div>
  );
}
