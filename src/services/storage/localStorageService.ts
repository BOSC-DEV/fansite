
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
  }
};

// Export the services
export const storageService = {
  profile: extendedProfileService,
  scammer: scammerService,
  comment: commentService,
  
  // Convenience methods that delegate to the specific services
  saveProfile: (profile: any) => extendedProfileService.saveProfile(profile),
  getProfile: (walletAddress: string) => extendedProfileService.getProfile(walletAddress),
  hasProfile: (walletAddress: string) => extendedProfileService.hasProfile(walletAddress),
  
  getScammer: (id: string) => scammerService.getScammer(id),
  getAllScammers: () => scammerService.getAllScammers(),
  saveScammer: (scammer: any) => scammerService.saveScammer(scammer),
  deleteScammer: (id: string) => scammerService.deleteScammer(id),
  
  saveComment: (comment: any) => commentService.saveComment(comment),
  getComments: (scammerId: string) => commentService.getComments(scammerId),
  
  // Add the missing methods
  isUsernameAvailable: (username: string) => extendedProfileService.isUsernameAvailable(username),
  getAllProfiles: () => extendedProfileService.getAllProfiles()
};

export { profileService, scammerService, commentService };
