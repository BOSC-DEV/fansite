
import { Comment, CommentType } from "./Comment";

interface CommentListProps {
  comments: any[];
  showScammerLinks?: boolean; // Whether to show links to scammer listings
}

export function CommentList({ comments, showScammerLinks = false }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => {
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
          scammerId: comment.scammer_id // Include the scammer ID
        };
        
        return <Comment 
          key={comment.id} 
          comment={normalizedComment} 
          showScammerLink={showScammerLinks}
        />;
      })}
    </div>
  );
}
