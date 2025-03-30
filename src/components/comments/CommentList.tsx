
import React from "react";
import { formatTimeAgo } from "@/utils/formatters";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ThumbsUp, ThumbsDown, EyeIcon, MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  author: string;
  author_name: string;
  author_profile_pic?: string;
  created_at: string;
  likes: number;
  dislikes: number;
  views: number;
  scammer_id?: string;
}

interface CommentListProps {
  comments: Comment[];
  showScammerLinks?: boolean;
}

export function CommentList({ comments, showScammerLinks = false }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return <div className="text-center py-4">No comments yet.</div>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border-b border-western-wood/10 pb-4 last:border-0">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.author_profile_pic || ''} alt={comment.author_name} />
              <AvatarFallback>
                {comment.author_name?.substring(0, 2) || 'AN'}
              </AvatarFallback>
            </Avatar>
            
            {/* Comment content */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link 
                    to={`/user/${comment.author}`} 
                    className="font-semibold hover:text-western-accent transition-colors"
                  >
                    {comment.author_name || "Anonymous"}
                  </Link>
                  
                  <span className="text-western-wood/50 text-xs">
                    {formatTimeAgo(comment.created_at)}
                  </span>
                </div>
                
                {showScammerLinks && comment.scammer_id && (
                  <Link
                    to={`/scammer/${comment.scammer_id}`}
                    className="text-xs text-western-wood/70 hover:text-western-accent transition-colors flex items-center gap-1"
                  >
                    <MessageSquare className="h-3 w-3" />
                    View Scammer
                  </Link>
                )}
              </div>
              
              <p className="text-western-wood">{comment.content}</p>
              
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-1 text-xs text-western-wood/70">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{comment.likes || 0}</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-western-wood/70">
                  <ThumbsDown className="h-3 w-3" />
                  <span>{comment.dislikes || 0}</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-western-wood/70">
                  <EyeIcon className="h-3 w-3" />
                  <span>{comment.views || 0} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
