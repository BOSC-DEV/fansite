
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { db, Comment, safeSpread } from "@/lib/supabase-helpers";
import { useWallet } from "@/context/WalletContext";
import { CommentList } from "@/components/comments/CommentList";
import { toast } from "sonner";

export function CommentsTab() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useWallet();

  useEffect(() => {
    async function loadComments() {
      setIsLoading(true);
      try {
        if (address) {
          console.log("Fetching comments for address:", address);
          
          // Get comments from Supabase
          const { data: userComments, error } = await db.comments()
            .select('*')
            .eq('author', address)
            .order('created_at', { ascending: false });
            
          if (error) {
            console.error("Error fetching comments:", error);
            toast.error("Error loading comments");
            throw error;
          }
          
          if (userComments && userComments.length > 0) {
            console.log("Found comments in Supabase:", userComments.length);
            
            // Ensure all comments have a valid created_at field
            const validatedComments = userComments.map(comment => {
              if (!comment.created_at || comment.created_at === 'Invalid Date') {
                // Use current timestamp if the date is invalid
                return { ...safeSpread(comment), created_at: new Date().toISOString() };
              }
              return comment;
            }) as Comment[];
            
            setComments(validatedComments);
          } else {
            console.log("No comments found for this user");
            setComments([]);
          }
        }
      } catch (error) {
        console.error("Error loading user comments:", error);
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadComments();
  }, [address]);

  if (isLoading) {
    return (
      <>
        <h2 className="text-xl font-bold mb-4 font-wanted text-western-accent">Comments</h2>
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
        <h2 className="text-xl font-bold mb-4 font-wanted text-western-accent">Comments</h2>
        <Card className="p-6 text-center">
          <p className="text-western-sand font-serif">You haven't posted any comments yet</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4 font-wanted text-western-accent">Comments</h2>
      <Card className="p-6">
        <CommentList comments={comments} showScammerLinks={true} />
      </Card>
    </>
  );
}
