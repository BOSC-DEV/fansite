
import { useState, useEffect } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { storageService, Comment } from "@/services/storage/localStorageService";
import { Badge } from "@/components/ui/badge";
import { useComments } from "@/hooks/useComments";

interface CommentSectionProps {
  scammerId: string;
}

export function CommentSection({ scammerId }: CommentSectionProps) {
  const { 
    comments, 
    isLoading, 
    content, 
    setContent, 
    isSubmitting, 
    handleSubmit, 
    isConnected,
    connectWallet
  } = useComments(scammerId);

  useEffect(() => {
    // Increment view count when component mounts
    storageService.incrementScammerViews(scammerId);
  }, [scammerId]);

  return (
    <div className="space-y-6 comments-section" id="comments">
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
            onCommentAdded={() => {}} 
            content={content}
            setContent={setContent}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            isConnected={isConnected}
            connectWallet={connectWallet}
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
