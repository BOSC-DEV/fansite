
import { useState, useEffect } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { storageService, Comment } from "@/services/storage/localStorageService";
import { Badge } from "@/components/ui/badge";

interface CommentSectionProps {
  scammerId: string;
}

export function CommentSection({ scammerId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComments();
    
    // Increment view count when component mounts
    storageService.incrementScammerViews(scammerId);
  }, [scammerId]);

  const loadComments = () => {
    setIsLoading(true);
    try {
      const loadedComments = storageService.getCommentsForScammer(scammerId);
      setComments(loadedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentAdded = () => {
    loadComments();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="h-5 w-5" />
              Comments
            </CardTitle>
            <Badge variant="outline">
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <CommentForm 
            scammerId={scammerId} 
            onCommentAdded={handleCommentAdded} 
          />
          
          {isLoading ? (
            <div className="py-4 text-center">
              <p className="text-muted-foreground">Loading comments...</p>
            </div>
          ) : comments.length > 0 ? (
            <CommentList comments={comments} />
          ) : (
            <div className="py-6 text-center">
              <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
