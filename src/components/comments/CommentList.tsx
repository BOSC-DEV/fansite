
import { useState } from "react";
import { Comment, CommentType } from "./Comment";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

interface CommentListProps {
  comments: any[];
  showScammerLinks?: boolean; // Whether to show links to scammer listings
}

export function CommentList({ comments, showScammerLinks = false }: CommentListProps) {
  const [sortMethod, setSortMethod] = useState<'newest' | 'oldest' | 'mostLiked'>('newest');
  
  // Sort comments based on current sortMethod
  const sortedComments = [...comments].sort((a, b) => {
    if (sortMethod === 'newest') {
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    } else if (sortMethod === 'oldest') {
      return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
    } else if (sortMethod === 'mostLiked') {
      return (b.likes || 0) - (a.likes || 0);
    }
    return 0;
  });

  return (
    <div>
      {/* Comments list */}
      <div className="space-y-4">
        {sortedComments.map((comment) => {
          // Convert from database format to CommentType format
          const normalizedComment: CommentType = {
            id: comment.id,
            content: comment.content,
            author: comment.author,
            authorName: comment.author_name || "Anonymous",
            authorProfilePic: comment.author_profile_pic || "",
            createdAt: comment.created_at,
            likes: comment.likes || 0,
            dislikes: comment.dislikes || 0,
            views: comment.views || 0,
            scammerId: comment.scammer_id // Include the scammer ID
          };
          
          return <Comment 
            key={comment.id} 
            comment={normalizedComment} 
            showScammerLink={showScammerLinks}
          />;
        })}
      </div>
    </div>
  );
}
