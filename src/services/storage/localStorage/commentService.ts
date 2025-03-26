
import { LocalStorageUtils, STORAGE_KEYS } from './localStorageUtils';
import { scammerService } from './scammerService';

export interface Comment {
  id: string;
  scammerId: string;
  content: string;
  author: string; // wallet address
  authorName: string;
  authorProfilePic: string;
  createdAt: string;
  likes: number;
  dislikes: number;
}

/**
 * Service for handling comments in localStorage
 */
export class CommentService extends LocalStorageUtils {
  // Comment methods
  saveComment(comment: Comment): void {
    this.setItem(`${STORAGE_KEYS.COMMENTS}${comment.id}`, comment);
    
    // Add comment ID to scammer's comments array
    const scammer = scammerService.getScammer(comment.scammerId);
    if (scammer) {
      if (!scammer.comments) {
        scammer.comments = [];
      }
      scammer.comments.push(comment.id);
      scammerService.saveScammer(scammer);
    }
  }

  getComment(commentId: string): Comment | null {
    return this.getItem<Comment>(`${STORAGE_KEYS.COMMENTS}${commentId}`);
  }

  getCommentsForScammer(scammerId: string): Comment[] {
    const scammer = scammerService.getScammer(scammerId);
    if (!scammer || !scammer.comments) return [];
    
    return scammer.comments
      .map(id => this.getComment(id))
      .filter((comment): comment is Comment => comment !== null)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Get comments by author
  getCommentsByAuthor(author: string): Comment[] {
    try {
      // Get all comments from localStorage
      const allCommentsString = localStorage.getItem('comments');
      if (!allCommentsString) {
        return [];
      }
      
      const allComments: Comment[] = JSON.parse(allCommentsString);
      
      // Filter comments by author
      return allComments.filter(comment => comment.author === author)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error("Error getting comments by author:", error);
      return [];
    }
  }

  likeComment(commentId: string): void {
    const comment = this.getComment(commentId);
    if (comment) {
      comment.likes = (comment.likes || 0) + 1;
      this.setItem(`${STORAGE_KEYS.COMMENTS}${commentId}`, comment);
    }
  }

  dislikeComment(commentId: string): void {
    const comment = this.getComment(commentId);
    if (comment) {
      comment.dislikes = (comment.dislikes || 0) + 1;
      this.setItem(`${STORAGE_KEYS.COMMENTS}${commentId}`, comment);
    }
  }
}

// Singleton instance
export const commentService = new CommentService();
