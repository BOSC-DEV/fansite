
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CommentFormProps {
  scammerId: string;
  onCommentAdded: () => void;
  content: string;
  setContent: (content: string) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
}

export function CommentForm({ 
  scammerId, 
  onCommentAdded,
  content,
  setContent,
  isSubmitting,
  handleSubmit,
  isConnected,
  connectWallet
}: CommentFormProps) {
  const [connecting, setConnecting] = useState(false);
  
  const handleConnect = async () => {
    setConnecting(true);
    try {
      await connectWallet();
      toast.success("Wallet connected successfully");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setConnecting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-muted/30 rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Connect your wallet to comment on this listing
        </p>
        <Button 
          onClick={handleConnect} 
          variant="outline" 
          size="sm"
          disabled={connecting}
        >
          {connecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <Textarea
        placeholder="Share your thoughts about this scammer..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="resize-none w-full"
        disabled={isSubmitting}
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
