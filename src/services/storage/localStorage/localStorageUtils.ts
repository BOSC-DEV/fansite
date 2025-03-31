
// Common key prefixes and utility functions for localStorage

// Prefix for our localStorage keys
export const STORAGE_KEYS = {
  PROFILES: 'profile-',
  SCAMMERS: 'scammer-',
  COMMENTS: 'comment-',
  SCAMMER_LIST: 'scammer-list',
};

/**
 * Base utility class for localStorage services
 */
export class LocalStorageUtils {
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

  // Generic get method for localStorage
  protected getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Generic set method for localStorage
  protected setItem<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
