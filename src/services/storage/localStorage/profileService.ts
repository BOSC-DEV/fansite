
import { LocalStorageUtils, STORAGE_KEYS } from './localStorageUtils';

export interface UserProfile {
  displayName: string;
  profilePicUrl: string;
  walletAddress: string;
  createdAt: string;
  xLink?: string;
  websiteLink?: string;
  bio?: string;
  username?: string;
  points?: number; // Added points property
}

/**
 * Service for handling user profiles in localStorage
 */
export class ProfileService extends LocalStorageUtils {
  // Profile methods
  getProfile(walletAddress: string): UserProfile | null {
    return this.getItem<UserProfile>(`${STORAGE_KEYS.PROFILES}${walletAddress}`);
  }

  saveProfile(profile: UserProfile): void {
    this.setItem(`${STORAGE_KEYS.PROFILES}${profile.walletAddress}`, profile);
  }

  hasProfile(walletAddress: string): boolean {
    return localStorage.getItem(`${STORAGE_KEYS.PROFILES}${walletAddress}`) !== null;
  }
}

// Singleton instance
export const profileService = new ProfileService();
