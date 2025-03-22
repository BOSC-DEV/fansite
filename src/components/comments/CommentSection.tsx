
import { useState, useEffect } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { CommentType } from "./Comment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface CommentSectionProps {
  scammerId: string;
}

export function CommentSection({ scammerId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        // This would connect to your actual API endpoint
        // const response = await fetch(`/api/comments/${scammerId}`);
        // const data = await response.json();
        // setComments(data);
        
        // Temporarily use empty array until backend is ready
        setComments([]);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [scammerId]);

  const handleCommentAdded = async () => {
    // In production, this would refetch comments from the API
    try {
      // const response = await fetch(`/api/comments/${scammerId}`);
      // const data = await response.json();
      // setComments(data);
      
      // For now, just refresh the empty comments array
      setComments([...comments]);
    } catch (error) {
      console.error("Error refreshing comments:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageSquare className="h-5 w-5" />
          Comments
        </CardTitle>
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
  );
}
