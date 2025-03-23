
import { supabase } from '@/lib/supabase';
import { Scammer } from "@/lib/types";

// Types for our data structures
export interface UserProfile {
  id?: string;
  displayName: string;
  profilePicUrl: string;
  walletAddress: string;
  createdAt: string;
  xLink?: string;
  websiteLink?: string;
  bio?: string;
}

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

export interface ScammerListing extends Omit<Scammer, 'dateAdded'> {
  dateAdded: string; // ISO string
  comments?: string[]; // Array of comment IDs
  likes: number;
  dislikes: number;
  views: number;
}

class SupabaseService {
  // Profile methods
  async getProfile(walletAddress: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('walletAddress', walletAddress)
      .single();

    if (error || !data) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data as UserProfile;
  }

  async saveProfile(profile: UserProfile): Promise<boolean> {
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('walletAddress', profile.walletAddress)
      .single();

    let result;
    
    if (existingProfile) {
      // Update
      result = await supabase
        .from('profiles')
        .update(profile)
        .eq('walletAddress', profile.walletAddress);
    } else {
      // Insert
      result = await supabase
        .from('profiles')
        .insert(profile);
    }

    if (result.error) {
      console.error('Error saving profile:', result.error);
      return false;
    }
    
    return true;
  }

  async hasProfile(walletAddress: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('walletAddress', walletAddress)
      .single();

    return !error && !!data;
  }

  // Scammer listing methods
  async getAllScammers(): Promise<ScammerListing[]> {
    const { data, error } = await supabase
      .from('scammers')
      .select('*')
      .order('dateAdded', { ascending: false });

    if (error) {
      console.error('Error fetching scammers:', error);
      return [];
    }

    return data as ScammerListing[];
  }

  async saveScammer(scammer: ScammerListing): Promise<boolean> {
    // Check if scammer exists
    const { data: existingScammer } = await supabase
      .from('scammers')
      .select('id')
      .eq('id', scammer.id)
      .single();

    let result;
    
    if (existingScammer) {
      // Update
      result = await supabase
        .from('scammers')
        .update(scammer)
        .eq('id', scammer.id);
    } else {
      // Insert
      result = await supabase
        .from('scammers')
        .insert(scammer);
    }

    if (result.error) {
      console.error('Error saving scammer:', result.error);
      return false;
    }
    
    return true;
  }

  async getScammer(scammerId: string): Promise<ScammerListing | null> {
    const { data, error } = await supabase
      .from('scammers')
      .select('*')
      .eq('id', scammerId)
      .single();

    if (error || !data) {
      console.error('Error fetching scammer:', error);
      return null;
    }

    return data as ScammerListing;
  }

  async incrementScammerViews(scammerId: string): Promise<void> {
    const { data: scammer } = await supabase
      .from('scammers')
      .select('views')
      .eq('id', scammerId)
      .single();

    if (scammer) {
      await supabase
        .from('scammers')
        .update({ views: (scammer.views || 0) + 1 })
        .eq('id', scammerId);
    }
  }

  // Comment methods
  async saveComment(comment: Comment): Promise<boolean> {
    const result = await supabase
      .from('comments')
      .insert(comment);

    if (result.error) {
      console.error('Error saving comment:', result.error);
      return false;
    }
    
    return true;
  }

  async getComment(commentId: string): Promise<Comment | null> {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('id', commentId)
      .single();

    if (error || !data) {
      console.error('Error fetching comment:', error);
      return null;
    }

    return data as Comment;
  }

  async getCommentsForScammer(scammerId: string): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('scammerId', scammerId)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      return [];
    }

    return data as Comment[];
  }

  // Likes and dislikes methods
  async likeScammer(scammerId: string): Promise<void> {
    const { data: scammer } = await supabase
      .from('scammers')
      .select('likes')
      .eq('id', scammerId)
      .single();

    if (scammer) {
      await supabase
        .from('scammers')
        .update({ likes: (scammer.likes || 0) + 1 })
        .eq('id', scammerId);
    }
  }

  async dislikeScammer(scammerId: string): Promise<void> {
    const { data: scammer } = await supabase
      .from('scammers')
      .select('dislikes')
      .eq('id', scammerId)
      .single();

    if (scammer) {
      await supabase
        .from('scammers')
        .update({ dislikes: (scammer.dislikes || 0) + 1 })
        .eq('id', scammerId);
    }
  }

  async likeComment(commentId: string): Promise<void> {
    const { data: comment } = await supabase
      .from('comments')
      .select('likes')
      .eq('id', commentId)
      .single();

    if (comment) {
      await supabase
        .from('comments')
        .update({ likes: (comment.likes || 0) + 1 })
        .eq('id', commentId);
    }
  }

  async dislikeComment(commentId: string): Promise<void> {
    const { data: comment } = await supabase
      .from('comments')
      .select('dislikes')
      .eq('id', commentId)
      .single();

    if (comment) {
      await supabase
        .from('comments')
        .update({ dislikes: (comment.dislikes || 0) + 1 })
        .eq('id', commentId);
    }
  }
}

// Create a singleton instance
export const storageService = new SupabaseService();
export default storageService;
