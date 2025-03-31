
// This is a stub file that should be modified to add the missing methods.
// For now, we'll export a basic object that other services can use.

import { profileService } from './localStorage/profileService';
import { scammerService } from './localStorage/scammerService';
import { commentService } from './localStorage/commentService';

// Expand the profile service with the missing methods
const extendedProfileService = {
  ...profileService,
  // Add the missing methods
  isUsernameAvailable: async (username: string): Promise<boolean> => {
    try {
      // Check if any profile with this username exists
      const profiles = await extendedProfileService.getAllProfiles();
      return !profiles.some(profile => 
        profile.username && profile.username.toLowerCase() === username.toLowerCase()
      );
    } catch (error) {
      console.error("Error checking username availability:", error);
      return false;
    }
  },
  
  getAllProfiles: async () => {
    try {
      // Retrieve all profiles from localStorage
      const allProfiles: any[] = [];
      // Iterate through localStorage keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('profile_')) {
          const profileData = localStorage.getItem(key);
          if (profileData) {
            try {
              allProfiles.push(JSON.parse(profileData));
            } catch (e) {
              console.error(`Error parsing profile data for key ${key}:`, e);
            }
          }
        }
      }
      return allProfiles;
    } catch (error) {
      console.error("Error getting all profiles:", error);
      return [];
    }
  },

  // Expose the original methods
  saveProfile: profileService.saveProfile,
  getProfile: profileService.getProfile,
  hasProfile: profileService.hasProfile
};

// Extend the comment service
const extendedCommentService = {
  ...commentService,
  // Add the missing getComments method
  getComments: (scammerId: string) => commentService.getCommentsForScammer(scammerId)
};

// Extend the scammer service
const extendedScammerService = {
  ...scammerService,
  // Ensure these methods exist
  deleteScammer: (id: string) => {
    const scammer = scammerService.getScammer(id);
    if (scammer) {
      // Implementation would depend on your needs
      console.log(`Deleting scammer ${id}`);
      // For now, just return true
      return true;
    }
    return false;
  },
  incrementScammerViews: (scammerId: string) => {
    scammerService.incrementScammerViews(scammerId);
    return true;
  },
  likeScammer: (scammerId: string) => {
    scammerService.likeScammer(scammerId);
    return true;
  },
  dislikeScammer: (scammerId: string) => {
    scammerService.dislikeScammer(scammerId);
    return true;
  },
  updateScammerStats: (scammerId: string, stats: { likes?: number; dislikes?: number; views?: number; shares?: number }) => {
    scammerService.updateScammerStats(scammerId, stats);
    return true;
  }
};

// Export the services
export const storageService = {
  profile: extendedProfileService,
  scammer: extendedScammerService,
  comment: extendedCommentService,
  
  // Convenience methods that delegate to the specific services
  saveProfile: (profile: any) => extendedProfileService.saveProfile(profile),
  getProfile: (walletAddress: string) => extendedProfileService.getProfile(walletAddress),
  hasProfile: (walletAddress: string) => extendedProfileService.hasProfile(walletAddress),
  
  getScammer: (id: string) => extendedScammerService.getScammer(id),
  getAllScammers: () => extendedScammerService.getAllScammers(),
  saveScammer: (scammer: any) => extendedScammerService.saveScammer(scammer),
  deleteScammer: (id: string) => extendedScammerService.deleteScammer(id),
  
  saveComment: (comment: any) => extendedCommentService.saveComment(comment),
  getComments: (scammerId: string) => extendedCommentService.getComments(scammerId),
  
  // Add the missing methods
  isUsernameAvailable: (username: string) => extendedProfileService.isUsernameAvailable(username),
  getAllProfiles: () => extendedProfileService.getAllProfiles(),
  
  // Add methods for incrementing scammer views and stats
  incrementScammerViews: (scammerId: string) => extendedScammerService.incrementScammerViews(scammerId),
  likeScammer: (scammerId: string) => extendedScammerService.likeScammer(scammerId),
  dislikeScammer: (scammerId: string) => extendedScammerService.dislikeScammer(scammerId),
  updateScammerStats: (scammerId: string, stats: { likes?: number; dislikes?: number; views?: number; shares?: number }) => 
    extendedScammerService.updateScammerStats(scammerId, stats)
};

export { profileService, scammerService, commentService };
