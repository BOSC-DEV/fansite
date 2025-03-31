
import { MessageSquare } from "lucide-react";
import { InteractionButton } from "./InteractionButton";

interface CommentsButtonProps {
  count: number;
  onScrollToComments: (e: React.MouseEvent) => void;
}

export function CommentsButton({ count, onScrollToComments }: CommentsButtonProps) {
  return (
    <InteractionButton 
      icon={MessageSquare} 
      count={count} 
      onClick={onScrollToComments}
      title="View comments"
      isViewOrComment={true} // Mark as comment button to prevent greying out
    />
  );
}
