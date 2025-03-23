
import { Comment as CommentType } from "@/services/storage/commentService";
import { Comment } from "./Comment";

interface CommentListProps {
  comments: CommentType[];
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
