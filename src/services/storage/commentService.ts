
import { BaseSupabaseService } from './baseSupabaseService';

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

export class CommentService extends BaseSupabaseService {
  async saveComment(comment: Comment): Promise<boolean> {
    // Convert from client format to database format
    const dbComment = {
      id: comment.id,
      scammer_id: comment.scammerId,
      content: comment.content,
      author: comment.author,
      author_name: comment.authorName,
      author_profile_pic: comment.authorProfilePic,
      created_at: comment.createdAt,
      likes: comment.likes || 0,
      dislikes: comment.dislikes || 0
    };
    
    const result = await this.supabase
      .from('comments')
      .insert(dbComment);

    if (result.error) {
      console.error('Error saving comment:', result.error);
      return false;
    }
    
    return true;
  }

  async getComment(commentId: string): Promise<Comment | null> {
    const { data, error } = await this.supabase
      .from('comments')
      .select('*')
      .eq('id', commentId)
      .single();

    if (error || !data) {
      console.error('Error fetching comment:', error);
      return null;
    }

    // Convert from database format to client format
    return {
      id: data.id,
      scammerId: data.scammer_id || '',
      content: data.content,
      author: data.author,
      authorName: data.author_name,
      authorProfilePic: data.author_profile_pic || '',
      createdAt: data.created_at,
      likes: data.likes || 0,
      dislikes: data.dislikes || 0
    };
  }

  async getCommentsForScammer(scammerId: string): Promise<Comment[]> {
    const { data, error } = await this.supabase
      .from('comments')
      .select('*')
      .eq('scammer_id', scammerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      return [];
    }

    // Convert from database format to client format
    return data.map(item => ({
      id: item.id,
      scammerId: item.scammer_id || '',
      content: item.content,
      author: item.author,
      authorName: item.author_name,
      authorProfilePic: item.author_profile_pic || '',
      createdAt: item.created_at,
      likes: item.likes || 0,
      dislikes: item.dislikes || 0
    }));
  }

  async getCommentsByAuthor(author: string): Promise<Comment[]> {
    const { data, error } = await this.supabase
      .from('comments')
      .select('*')
      .eq('author', author)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching author comments:', error);
      return [];
    }

    // Convert from database format to client format
    return data.map(item => ({
      id: item.id,
      scammerId: item.scammer_id || '',
      content: item.content,
      author: item.author,
      authorName: item.author_name,
      authorProfilePic: item.author_profile_pic || '',
      createdAt: item.created_at,
      likes: item.likes || 0,
      dislikes: item.dislikes || 0
    }));
  }

  async likeComment(commentId: string): Promise<void> {
    const { data: comment } = await this.supabase
      .from('comments')
      .select('likes')
      .eq('id', commentId)
      .single();

    if (comment) {
      await this.supabase
        .from('comments')
        .update({ likes: (comment.likes || 0) + 1 })
        .eq('id', commentId);
    }
  }

  async dislikeComment(commentId: string): Promise<void> {
    const { data: comment } = await this.supabase
      .from('comments')
      .select('dislikes')
      .eq('id', commentId)
      .single();

    if (comment) {
      await this.supabase
        .from('comments')
        .update({ dislikes: (comment.dislikes || 0) + 1 })
        .eq('id', commentId);
    }
  }
}

export const commentService = new CommentService();
