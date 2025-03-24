
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
      toast.info("Like removed");
    } else {
      if (isDisliked) {
        setIsDisliked(false);
        setDislikes(dislikes - 1);
      }
      setIsLiked(true);
      setLikes(likes + 1);
      toast.success("Scammer liked");
    }

    try {
      await storageService.updateScammerStats(scammer.id, {
        likes: isLiked ? likes - 1 : likes + 1,
        dislikes: isDisliked ? dislikes - 1 : dislikes,
      });
    } catch (error) {
      console.error("Error updating likes:", error);
      toast.error("Failed to update likes");
    }
  };

  const handleDislike = async () => {
    if (isDisliked) {
      setIsDisliked(false);
      setDislikes(dislikes - 1);
      toast.info("Dislike removed");
    } else {
      if (isLiked) {
        setIsLiked(false);
        setLikes(likes - 1);
      }
      setIsDisliked(true);
      setDislikes(dislikes + 1);
      toast.success("Scammer disliked");
    }

    try {
      await storageService.updateScammerStats(scammer.id, {
        likes: isLiked ? likes - 1 : likes,
        dislikes: isDisliked ? dislikes - 1 : dislikes + 1,
      });
    } catch (error) {
      console.error("Error updating dislikes:", error);
      toast.error("Failed to update dislikes");
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
