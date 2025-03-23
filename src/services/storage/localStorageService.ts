
import { v4 as uuidv4 } from 'uuid';
import { ScammerListing } from './scammer/scammerTypes';

class LocalStorageService {
  private storageKey = 'bosc_scammers';

  getScammers(): ScammerListing[] {
    const scammersStr = localStorage.getItem(this.storageKey);
    if (!scammersStr) return [];
    
    try {
      return JSON.parse(scammersStr);
    } catch (e) {
      console.error('Failed to parse scammers from localStorage', e);
      return [];
    }
  }

  saveScammer(scammer: ScammerListing): boolean {
    try {
      const scammers = this.getScammers();
      const existingIndex = scammers.findIndex(s => s.id === scammer.id);
      
      if (existingIndex >= 0) {
        // Update existing
        scammers[existingIndex] = scammer;
      } else {
        // Add new
        scammers.push(scammer);
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(scammers));
      return true;
    } catch (e) {
      console.error('Failed to save scammer to localStorage', e);
      return false;
    }
  }

  getScammer(id: string): ScammerListing | null {
    const scammers = this.getScammers();
    return scammers.find(s => s.id === id) || null;
  }

  incrementScammerViews(id: string): boolean {
    const scammer = this.getScammer(id);
    if (!scammer) return false;
    
    scammer.views = (scammer.views || 0) + 1;
    return this.saveScammer(scammer);
  }
  
  likeScammer(id: string): boolean {
    const scammer = this.getScammer(id);
    if (!scammer) return false;
    
    scammer.likes = (scammer.likes || 0) + 1;
    return this.saveScammer(scammer);
  }
  
  dislikeScammer(id: string): boolean {
    const scammer = this.getScammer(id);
    if (!scammer) return false;
    
    scammer.dislikes = (scammer.dislikes || 0) + 1;
    return this.saveScammer(scammer);
  }
  
  // Helper function to generate a simple hash for IP address
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

export const storageService = new LocalStorageService();
