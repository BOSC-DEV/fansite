
import { useState, useEffect } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { storageService } from "@/services/storage/localStorageService";
import { Comment } from "@/services/storage/commentService";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";

interface CommentSectionProps {
  scammerId: string;
}

export function CommentSection({ scammerId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected } = useWallet();

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
      toast.error("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentAdded = () => {
    loadComments();
    toast.success("Your comment has been added!");
  };

  return (
    <Card className="bg-white/90 border-western-wood/10 shadow-sm">
      <CardHeader className="border-b border-western-wood/10 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-xl font-western text-western-accent">
            <MessageSquare className="h-5 w-5" />
            Discussion
          </CardTitle>
          <Badge variant="outline" className="bg-western-sand/20 text-western-wood">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <CommentForm 
          scammerId={scammerId} 
          onCommentAdded={handleCommentAdded} 
        />
        
        {isLoading ? (
          <div className="py-4 text-center">
            <div className="spinner"></div>
            <p className="text-muted-foreground mt-2">Loading comments...</p>
          </div>
        ) : comments.length > 0 ? (
          <CommentList comments={comments} />
        ) : (
          <div className="py-6 text-center bg-western-sand/10 rounded-lg">
            <MessageSquare className="h-10 w-10 mx-auto text-western-wood/30 mb-2" />
            <p className="text-western-wood/70">
              {isConnected ? 
                "No comments yet. Be the first to comment!" : 
                "No comments yet. Connect your wallet to comment."
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
