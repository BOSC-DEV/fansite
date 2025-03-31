import { Scammer } from "@/lib/types";

// Types for our localStorage data structures
export interface UserProfile {
  displayName: string;
  profilePicUrl: string;
  walletAddress: string;
  createdAt: string;
  xLink?: string;
  websiteLink?: string;
  bio?: string;
  username?: string;
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
  comments: string[]; // Array of comment IDs
  likes: number;
  dislikes: number;
  views: number;
}

// Prefix for our localStorage keys
const STORAGE_KEYS = {
  PROFILES: 'profile-',
  SCAMMERS: 'scammer-',
  COMMENTS: 'comment-',
  SCAMMER_LIST: 'scammer-list',
};

class LocalStorageService {
  // Profile methods
  getProfile(walletAddress: string): UserProfile | null {
    const profile = localStorage.getItem(`${STORAGE_KEYS.PROFILES}${walletAddress}`);
    return profile ? JSON.parse(profile) : null;
  }

  saveProfile(profile: UserProfile): void {
    localStorage.setItem(
      `${STORAGE_KEYS.PROFILES}${profile.walletAddress}`,
      JSON.stringify(profile)
    );
  }

  hasProfile(walletAddress: string): boolean {
    return localStorage.getItem(`${STORAGE_KEYS.PROFILES}${walletAddress}`) !== null;
  }

  // Scammer listing methods
  getScammerList(): string[] {
    const list = localStorage.getItem(STORAGE_KEYS.SCAMMER_LIST);
    return list ? JSON.parse(list) : [];
  }

  addScammerToList(scammerId: string): void {
    const list = this.getScammerList();
    if (!list.includes(scammerId)) {
      list.push(scammerId);
      localStorage.setItem(STORAGE_KEYS.SCAMMER_LIST, JSON.stringify(list));
    }
  }

  saveScammer(scammer: ScammerListing): void {
    localStorage.setItem(`${STORAGE_KEYS.SCAMMERS}${scammer.id}`, JSON.stringify(scammer));
    this.addScammerToList(scammer.id);
  }

  getScammer(scammerId: string): ScammerListing | null {
    const scammer = localStorage.getItem(`${STORAGE_KEYS.SCAMMERS}${scammerId}`);
    return scammer ? JSON.parse(scammer) : null;
  }

  getAllScammers(): ScammerListing[] {
    const scammerIds = this.getScammerList();
    return scammerIds
      .map(id => this.getScammer(id))
      .filter((scammer): scammer is ScammerListing => scammer !== null)
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }

  incrementScammerViews(scammerId: string): void {
    const scammer = this.getScammer(scammerId);
    if (scammer) {
      scammer.views += 1;
      this.saveScammer(scammer);
    }
  }

  // Comment methods
  saveComment(comment: Comment): void {
    localStorage.setItem(`${STORAGE_KEYS.COMMENTS}${comment.id}`, JSON.stringify(comment));
    
    // Add comment ID to scammer's comments array
    const scammer = this.getScammer(comment.scammerId);
    if (scammer) {
      if (!scammer.comments) {
        scammer.comments = [];
      }
      scammer.comments.push(comment.id);
      this.saveScammer(scammer);
    }
  }

  getComment(commentId: string): Comment | null {
    const comment = localStorage.getItem(`${STORAGE_KEYS.COMMENTS}${commentId}`);
    return comment ? JSON.parse(comment) : null;
  }

  getCommentsForScammer(scammerId: string): Comment[] {
    const scammer = this.getScammer(scammerId);
    if (!scammer || !scammer.comments) return [];
    
    return scammer.comments
      .map(id => this.getComment(id))
      .filter((comment): comment is Comment => comment !== null)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Likes and dislikes methods
  likeScammer(scammerId: string): void {
    const scammer = this.getScammer(scammerId);
    if (scammer) {
      scammer.likes = (scammer.likes || 0) + 1;
      this.saveScammer(scammer);
    }
  }

  dislikeScammer(scammerId: string): void {
    const scammer = this.getScammer(scammerId);
    if (scammer) {
      scammer.dislikes = (scammer.dislikes || 0) + 1;
      this.saveScammer(scammer);
    }
  }

  updateScammerStats(scammerId: string, stats: { likes?: number; dislikes?: number; views?: number }): void {
    const scammer = this.getScammer(scammerId);
    if (scammer) {
      if (stats.likes !== undefined) {
        scammer.likes = stats.likes;
      }
      if (stats.dislikes !== undefined) {
        scammer.dislikes = stats.dislikes;
      }
      if (stats.views !== undefined) {
        scammer.views = stats.views;
      }
      this.saveScammer(scammer);
    }
  }

  likeComment(commentId: string): void {
    const comment = this.getComment(commentId);
    if (comment) {
      comment.likes = (comment.likes || 0) + 1;
      localStorage.setItem(`${STORAGE_KEYS.COMMENTS}${commentId}`, JSON.stringify(comment));
    }
  }

  dislikeComment(commentId: string): void {
    const comment = this.getComment(commentId);
    if (comment) {
      comment.dislikes = (comment.dislikes || 0) + 1;
      localStorage.setItem(`${STORAGE_KEYS.COMMENTS}${commentId}`, JSON.stringify(comment));
    }
  }

  // IP tracking utility for view counting
  hashIpAddress(ip: string): string {
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
      const char = ip.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
  }
}

// Create a singleton instance
export const storageService = new LocalStorageService();
export default storageService;
