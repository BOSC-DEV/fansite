
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
      .eq('wallet_address', walletAddress)
      .single();

    if (error || !data) {
      console.error('Error fetching profile:', error);
      return null;
    }

    // Convert snake_case to camelCase for client-side usage
    return {
      id: data.id,
      displayName: data.display_name,
      profilePicUrl: data.profile_pic_url || '',
      walletAddress: data.wallet_address,
      createdAt: data.created_at,
      xLink: data.x_link || '',
      websiteLink: data.website_link || '',
      bio: data.bio || ''
    };
  }

  async saveProfile(profile: UserProfile): Promise<boolean> {
    // Convert from camelCase to snake_case for database
    const dbProfile = {
      id: profile.id,
      display_name: profile.displayName,
      profile_pic_url: profile.profilePicUrl,
      wallet_address: profile.walletAddress,
      created_at: profile.createdAt,
      x_link: profile.xLink || null,
      website_link: profile.websiteLink || null,
      bio: profile.bio || null
    };
    
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('wallet_address', profile.walletAddress)
      .single();

    let result;
    
    if (existingProfile) {
      // Update
      result = await supabase
        .from('profiles')
        .update(dbProfile)
        .eq('wallet_address', profile.walletAddress);
    } else {
      // Insert
      result = await supabase
        .from('profiles')
        .insert(dbProfile);
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
      .eq('wallet_address', walletAddress)
      .single();

    return !error && !!data;
  }

  // Scammer listing methods
  async getAllScammers(): Promise<ScammerListing[]> {
    const { data, error } = await supabase
      .from('scammers')
      .select('*')
      .order('date_added', { ascending: false });

    if (error) {
      console.error('Error fetching scammers:', error);
      return [];
    }

    // Convert from database format to client format
    return data.map(item => ({
      id: item.id,
      name: item.name,
      photoUrl: item.photo_url,
      accusedOf: item.accused_of,
      links: Array.isArray(item.links) ? item.links : (item.links ? [String(item.links)] : []),
      aliases: Array.isArray(item.aliases) ? item.aliases : (item.aliases ? [String(item.aliases)] : []),
      accomplices: Array.isArray(item.accomplices) ? item.accomplices : (item.accomplices ? [String(item.accomplices)] : []),
      officialResponse: item.official_response || '',
      bountyAmount: Number(item.bounty_amount) || 0,
      walletAddress: item.wallet_address,
      dateAdded: item.date_added,
      addedBy: item.added_by,
      likes: item.likes || 0,
      dislikes: item.dislikes || 0,
      views: item.views || 0
    }));
  }

  async saveScammer(scammer: ScammerListing): Promise<boolean> {
    // Convert from client format to database format
    const dbScammer = {
      id: scammer.id,
      name: scammer.name,
      photo_url: scammer.photoUrl,
      accused_of: scammer.accusedOf,
      links: scammer.links,
      aliases: scammer.aliases,
      accomplices: scammer.accomplices,
      official_response: scammer.officialResponse,
      bounty_amount: scammer.bountyAmount,
      wallet_address: scammer.walletAddress,
      date_added: scammer.dateAdded,
      added_by: scammer.addedBy,
      likes: scammer.likes || 0,
      dislikes: scammer.dislikes || 0,
      views: scammer.views || 0
    };
    
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
        .update(dbScammer)
        .eq('id', scammer.id);
    } else {
      // Insert
      result = await supabase
        .from('scammers')
        .insert(dbScammer);
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

    // Convert from database format to client format
    return {
      id: data.id,
      name: data.name,
      photoUrl: data.photo_url,
      accusedOf: data.accused_of,
      links: Array.isArray(data.links) ? data.links : (data.links ? [String(data.links)] : []),
      aliases: Array.isArray(data.aliases) ? data.aliases : (data.aliases ? [String(data.aliases)] : []),
      accomplices: Array.isArray(data.accomplices) ? data.accomplices : (data.accomplices ? [String(data.accomplices)] : []),
      officialResponse: data.official_response || '',
      bountyAmount: Number(data.bounty_amount) || 0,
      walletAddress: data.wallet_address,
      dateAdded: data.date_added,
      addedBy: data.added_by,
      likes: data.likes || 0,
      dislikes: data.dislikes || 0,
      views: data.views || 0
    };
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
    
    const result = await supabase
      .from('comments')
      .insert(dbComment);

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

    // Convert from database format to client format
    return {
      id: data.id,
      scammerId: data.scammer_id,
      content: data.content,
      author: data.author,
      authorName: data.author_name,
      authorProfilePic: data.author_profile_pic,
      createdAt: data.created_at,
      likes: data.likes || 0,
      dislikes: data.dislikes || 0
    };
  }

  async getCommentsForScammer(scammerId: string): Promise<Comment[]> {
    const { data, error } = await supabase
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
      scammerId: item.scammer_id,
      content: item.content,
      author: item.author,
      authorName: item.author_name,
      authorProfilePic: item.author_profile_pic,
      createdAt: item.created_at,
      likes: item.likes || 0,
      dislikes: item.dislikes || 0
    }));
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
