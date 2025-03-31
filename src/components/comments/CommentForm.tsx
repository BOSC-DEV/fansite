
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/WalletButton";
import { Loader2 } from "lucide-react";

interface CommentFormProps {
  scammerId: string;
  onCommentAdded?: () => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
}

export function CommentForm({
  content,
  setContent,
  isSubmitting,
  handleSubmit,
  isConnected,
  connectWallet
}: CommentFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px] resize-none focus:border-western-accent"
          disabled={isSubmitting || !isConnected}
        />
      </div>
      
      <div className="flex justify-end">
        {!isConnected ? (
          <WalletButton onClick={connectWallet} className="bg-western-leather hover:bg-western-leather/80 text-white">
            Connect Wallet to Comment
          </WalletButton>
        ) : (
          <Button 
            type="submit" 
            disabled={isSubmitting || !content.trim()}
            className="bg-western-leather hover:bg-western-leather/80 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              'Post Comment'
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
