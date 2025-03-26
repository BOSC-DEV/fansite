
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { storageService } from "@/services/storage/localStorageService";
import { commentService } from "@/services/storage/commentService";
import { CommentList } from "@/components/comments/CommentList";
import { useWallet } from "@/context/WalletContext";
import { Skeleton } from "@/components/ui/skeleton";

export function CommentsTab() {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useWallet();

  useEffect(() => {
    async function loadComments() {
      setIsLoading(true);
      try {
        if (address) {
          // Try to load from Supabase first
          const userComments = await commentService.getCommentsByAuthor(address);
          if (userComments && userComments.length > 0) {
            setComments(userComments);
          } else {
            // Fallback to localStorage
            const localComments = storageService.getCommentsByAuthor(address);
            setComments(localComments);
          }
        }
      } catch (error) {
        console.error("Error loading user comments:", error);
        // Fallback to localStorage on error
        if (address) {
          const localComments = storageService.getCommentsByAuthor(address);
          setComments(localComments);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadComments();
  }, [address]);

  if (isLoading) {
    return (
      <>
        <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Comments</h2>
        <Card className="p-6">
          <Skeleton className="h-24 w-full mb-4" />
          <Skeleton className="h-24 w-full" />
        </Card>
      </>
    );
  }

  if (!comments.length) {
    return (
      <>
        <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Comments</h2>
        <Card className="p-6 text-center">
          <p className="text-western-sand">You haven't posted any comments yet</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Comments</h2>
      <Card className="p-6">
        <CommentList comments={comments} />
      </Card>
    </>
  );
}
