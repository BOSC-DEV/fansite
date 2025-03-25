
import { useState } from 'react';
import { storageService } from "@/services/storage";
import { toast } from "sonner";
import { Scammer } from "@/lib/types";

export function useScammerStats(scammer: Scammer) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(scammer.likes || 0);
  const [dislikes, setDislikes] = useState(scammer.dislikes || 0);
  const [views, setViews] = useState(scammer.views || 0);

  const handleLike = async () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes(likes - 1);
      toast.info("Agreement removed");
    } else {
      if (isDisliked) {
        setIsDisliked(false);
        setDislikes(dislikes - 1);
      }
      setIsLiked(true);
      setLikes(likes + 1);
      toast.success("Agreed");
    }

    try {
      await storageService.updateScammerStats(scammer.id, {
        likes: isLiked ? likes - 1 : likes + 1,
        dislikes: isDisliked ? dislikes - 1 : dislikes,
      });
    } catch (error) {
      console.error("Error updating likes:", error);
      toast.error("Failed to update agreement");
    }
  };

  const handleDislike = async () => {
    if (isDisliked) {
      setIsDisliked(false);
      setDislikes(dislikes - 1);
      toast.info("Disagreement removed");
    } else {
      if (isLiked) {
        setIsLiked(false);
        setLikes(likes - 1);
      }
      setIsDisliked(true);
      setDislikes(dislikes + 1);
      toast.success("Disagreed");
    }

    try {
      await storageService.updateScammerStats(scammer.id, {
        likes: isLiked ? likes - 1 : likes,
        dislikes: isDisliked ? dislikes - 1 : dislikes + 1,
      });
    } catch (error) {
      console.error("Error updating dislikes:", error);
      toast.error("Failed to update disagreement");
    }
  };

  return {
    isLiked,
    isDisliked,
    likes,
    dislikes,
    views,
    handleLike,
    handleDislike
  };
}
