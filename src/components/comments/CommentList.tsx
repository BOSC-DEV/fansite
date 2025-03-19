
import { Comment, CommentType } from "./Comment";
import { Separator } from "@/components/ui/separator";

interface CommentListProps {
  comments: CommentType[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <Comment comment={comment} />
          {index < comments.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
