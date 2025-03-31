
import { useState, useEffect } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ArrowDown, ArrowUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { useComments } from "@/hooks/useComments";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentSectionProps {
  scammerId: string;
}

export function CommentSection({ scammerId }: CommentSectionProps) {
  const [error, setError] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState<'newest' | 'oldest' | 'mostLiked'>('newest');
  
  const { 
    comments, 
    isLoading, 
    content, 
    setContent, 
    isSubmitting, 
    handleSubmit, 
    isConnected,
    connectWallet,
    hasProfile,
    profileChecked
  } = useComments(scammerId);

  useEffect(() => {
    // Check if the scammer exists to avoid commenting on non-existent records
    const verifyScammer = async () => {
      try {
        const { data, error } = await supabase
          .from('scammers')
          .select('id')
          .eq('id', scammerId)
          .maybeSingle();
          
        if (error || !data) {
          console.error("Error verifying scammer existence:", error);
          setError("This scammer listing might not exist in the database. Comments may not save correctly.");
        } else {
          setError(null);
        }
      } catch (e) {
        console.error("Failed to verify scammer:", e);
      }
    };
    
    verifyScammer();
    
    // Check if commenting is enabled
    if (!window.phantom?.solana) {
      setError("Phantom wallet extension is required to comment. Please install it to participate in discussions.");
    }
  }, [scammerId]);

  // Sort comments based on current sortMethod
  const sortedComments = [...comments].sort((a, b) => {
    if (sortMethod === 'newest') {
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    } else if (sortMethod === 'oldest') {
      return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
    } else if (sortMethod === 'mostLiked') {
      return (b.likes || 0) - (a.likes || 0);
    }
    return 0;
  });

  return (
    <div className="space-y-6 comments-section" id="comments">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-xl font-wanted text-western-accent">
              <MessageSquare className="h-5 w-5" />
              Comments
            </CardTitle>
            <Badge variant="outline" className="font-western">
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 font-serif">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {profileChecked && !hasProfile && isConnected && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You need to create a profile before commenting. 
                <a href="/profile" className="font-medium underline ml-1">
                  Go to your profile page
                </a>
              </AlertDescription>
            </Alert>
          )}
          
          {/* Full width comment input */}
          <div className="w-full">
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
          </div>
          
          {/* Sort buttons */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button 
                variant={sortMethod === 'newest' ? "default" : "outline"} 
                size="sm"
                onClick={() => setSortMethod('newest')}
                className={`text-xs font-western ${sortMethod === 'newest' ? 'bg-western-leather hover:bg-western-leather/90' : ''}`}
              >
                Newest <ArrowDown className="ml-1 h-3 w-3" />
              </Button>
              <Button 
                variant={sortMethod === 'oldest' ? "default" : "outline"} 
                size="sm"
                onClick={() => setSortMethod('oldest')}
                className={`text-xs font-western ${sortMethod === 'oldest' ? 'bg-western-leather hover:bg-western-leather/90' : ''}`}
              >
                Oldest <ArrowUp className="ml-1 h-3 w-3" />
              </Button>
              <Button 
                variant={sortMethod === 'mostLiked' ? "default" : "outline"} 
                size="sm"
                onClick={() => setSortMethod('mostLiked')}
                className={`text-xs font-western ${sortMethod === 'mostLiked' ? 'bg-western-leather hover:bg-western-leather/90' : ''}`}
              >
                Most Liked
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="py-4 text-center">
              <p className="text-muted-foreground">Loading comments...</p>
            </div>
          ) : comments.length > 0 ? (
            <div className="mt-6">
              <CommentList comments={sortedComments} />
            </div>
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
