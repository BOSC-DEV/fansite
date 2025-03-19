
import { useState, useEffect } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { CommentType } from "./Comment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

// Mock data - in a real app, this would come from an API
const MOCK_COMMENTS: CommentType[] = [
  {
    id: "1",
    author: "0x1234...5678",
    content: "This person stole my entire JPG collection. I hope karma gets them.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: "2",
    author: "0xabcd...ef01",
    content: "They tried to sell me a 'rare opportunity' in their Discord. Classic scammer tactics.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
  },
  {
    id: "3",
    author: "0x7890...1234",
    content: "I recognize this wallet. They were banned from our community for similar behavior.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) // 1 week ago
  }
];

interface CommentSectionProps {
  scammerId: string;
}

export function CommentSection({ scammerId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch comments from an API
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setComments(MOCK_COMMENTS);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [scammerId]);

  const handleCommentAdded = () => {
    // In a real app, this would refetch comments from the API
    // For now, we'll just add a mock comment to the top of the list
    const newComment: CommentType = {
      id: `new-${Date.now()}`,
      author: "You",
      content: "Your comment has been added!",
      timestamp: new Date()
    };
    
    setComments([newComment, ...comments]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageSquare className="h-5 w-5" />
          Comments
        </CardTitle>
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
        ) : (
          <CommentList comments={comments} />
        )}
      </CardContent>
    </Card>
  );
}
