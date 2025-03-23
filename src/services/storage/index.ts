
// Export all services
export * from './profileService';
export * from './scammerService';
export * from './commentService';
export * from './storageService';

// Export a unified interface for backward compatibility
import { profileService } from './profileService';
import { scammerService } from './scammerService';
import { commentService } from './commentService';
import { storageService as fileStorageService } from './storageService';

// Create a unified service that combines all the individual services
// This maintains backward compatibility with existing code
export const storageService = {
  // Profile methods
  getProfile: profileService.getProfile.bind(profileService),
  saveProfile: profileService.saveProfile.bind(profileService),
  hasProfile: profileService.hasProfile.bind(profileService),
  getProfileByUsername: profileService.getProfileByUsername.bind(profileService),
  isUsernameAvailable: profileService.isUsernameAvailable.bind(profileService),
  
  // Scammer methods
  getAllScammers: scammerService.getAllScammers.bind(scammerService),
  saveScammer: scammerService.saveScammer.bind(scammerService),
  getScammer: scammerService.getScammer.bind(scammerService),
  incrementScammerViews: scammerService.incrementScammerViews.bind(scammerService),
  likeScammer: scammerService.likeScammer.bind(scammerService),
  dislikeScammer: scammerService.dislikeScammer.bind(scammerService),
  updateScammerStats: scammerService.updateScammerStats.bind(scammerService),
  
  // Comment methods
  saveComment: commentService.saveComment.bind(commentService),
  getComment: commentService.getComment.bind(commentService),
  getCommentsForScammer: commentService.getCommentsForScammer.bind(commentService),
  likeComment: commentService.likeComment.bind(commentService),
  dislikeComment: commentService.dislikeComment.bind(commentService),
  
  // Storage methods
  uploadProfileImage: fileStorageService.uploadProfileImage.bind(fileStorageService),
  ensureProfileImagesBucketExists: fileStorageService.ensureProfileImagesBucketExists.bind(fileStorageService)
};

// Also export as default for convenience
export default storageService;
