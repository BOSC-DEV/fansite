
import { LocalStorageUtils, STORAGE_KEYS } from './localStorageUtils';

export interface ScammerListing {
  id: string;
  name: string;
  photoUrl: string;
  accusedOf: string;
  links: string[];
  aliases: string[];
  accomplices: string[];
  officialResponse: string;
  bountyAmount: number;
  walletAddress: string;
  dateAdded: string; // ISO string
  addedBy: string;
  comments: string[]; // Array of comment IDs
  likes: number;
  dislikes: number;
  views: number;
  shares: number;
}

/**
 * Service for handling scammer listings in localStorage
 */
export class ScammerService extends LocalStorageUtils {
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
    this.setItem(`${STORAGE_KEYS.SCAMMERS}${scammer.id}`, scammer);
    this.addScammerToList(scammer.id);
  }

  getScammer(scammerId: string): ScammerListing | null {
    return this.getItem<ScammerListing>(`${STORAGE_KEYS.SCAMMERS}${scammerId}`);
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

  incrementScammerShares(scammerId: string): void {
    const scammer = this.getScammer(scammerId);
    if (scammer) {
      scammer.shares = (scammer.shares || 0) + 1;
      this.saveScammer(scammer);
    }
  }

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

  updateScammerStats(scammerId: string, stats: { likes?: number; dislikes?: number; views?: number; shares?: number }): void {
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
      if (stats.shares !== undefined) {
        scammer.shares = stats.shares;
      }
      this.saveScammer(scammer);
    }
  }
}

// Singleton instance
export const scammerService = new ScammerService();
