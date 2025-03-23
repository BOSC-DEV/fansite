
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
