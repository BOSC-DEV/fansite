
import { useState, useEffect } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, ThumbsDown, Eye } from "lucide-react";
import { storageService, Comment } from "@/services/storage/localStorageService";
import { Badge } from "@/components/ui/badge";

interface CommentSectionProps {
  scammerId: string;
}

export function CommentSection({ scammerId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scammerStats, setScammerStats] = useState({
    likes: 0,
    dislikes: 0,
    views: 0
  });

  useEffect(() => {
    loadComments();
    loadScammerStats();
    
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

  const loadScammerStats = () => {
    const scammer = storageService.getScammer(scammerId);
    if (scammer) {
      setScammerStats({
        likes: scammer.likes || 0,
        dislikes: scammer.dislikes || 0,
        views: scammer.views || 0
      });
    }
  };

  const handleCommentAdded = () => {
    loadComments();
  };

  const handleLikeScammer = () => {
    storageService.likeScammer(scammerId);
    loadScammerStats();
  };

  const handleDislikeScammer = () => {
    storageService.dislikeScammer(scammerId);
    loadScammerStats();
  };

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="h-5 w-5" />
              Listing Stats
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button 
                onClick={handleLikeScammer}
                className="flex items-center space-x-1 text-sm hover:text-green-600 transition-colors"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{scammerStats.likes}</span>
              </button>

              <button 
                onClick={handleDislikeScammer}
                className="flex items-center space-x-1 text-sm hover:text-red-600 transition-colors"
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{scammerStats.dislikes}</span>
              </button>
            </div>

            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{scammerStats.views} views</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
