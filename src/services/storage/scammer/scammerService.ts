
import { ScammerListing, ScammerStats } from './scammerTypes';
import { scammerDataService } from './scammerDataService';
import { scammerStatsService } from './scammerStatsService';

/**
 * Main scammer service that composes specialized services
 */
class ScammerService {
  // Data operations
  async saveScammer(scammer: ScammerListing): Promise<boolean> {
    return scammerDataService.saveScammer(scammer);
  }

  async getScammer(id: string): Promise<ScammerListing | null> {
    return scammerDataService.getScammer(id);
  }

  async getAllScammers(): Promise<ScammerListing[]> {
    return scammerDataService.getAllScammers();
  }

  // Stats operations
  async updateScammerStats(scammerId: string, stats: ScammerStats): Promise<boolean> {
    return scammerStatsService.updateScammerStats(scammerId, stats);
  }
  
  async incrementScammerViews(scammerId: string): Promise<boolean> {
    return scammerStatsService.incrementScammerViews(scammerId);
  }

  async likeScammer(scammerId: string): Promise<boolean> {
    return scammerStatsService.likeScammer(scammerId);
  }

  async dislikeScammer(scammerId: string): Promise<boolean> {
    return scammerStatsService.dislikeScammer(scammerId);
  }
}

// Export a singleton instance
export const scammerService = new ScammerService();
