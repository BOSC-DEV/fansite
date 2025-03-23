
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { storageService } from "@/services/storage/localStorageService";

interface CommentFormProps {
  scammerId: string;
  onCommentAdded: () => void;
}

export function CommentForm({ scammerId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected, connectWallet, address } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    
    if (!address) {
      toast.error("You must be connected with a wallet to comment");
      return;
    }
    
    // Check if user has a profile
    const profile = storageService.getProfile(address);
    if (!profile) {
      toast.error("You need to create a profile before commenting");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a new comment
      const commentId = uuidv4();
      const comment = {
        id: commentId,
        scammerId,
        content: content.trim(),
        author: address,
        authorName: profile.displayName,
        authorProfilePic: profile.profilePicUrl,
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0
      };
      
      // Save to localStorage
      storageService.saveComment(comment);
      
      toast.success("Comment added successfully");
      setContent("");
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-muted/30 rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Connect your wallet to comment on this listing
        </p>
        <Button onClick={connectWallet} variant="outline" size="sm">
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Share your thoughts about this scammer..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="resize-none"
      />
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting || !content.trim()}
          size="sm"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </form>
  );
}
