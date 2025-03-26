
// Re-export everything from new structure for backward compatibility
export * from './localStorage';
export { profileService } from './localStorage/profileService';
export { commentService } from './localStorage/commentService';
export { scammerService } from './localStorage/scammerService';

// For backward compatibility
export { scammerService as storageService } from './localStorage/scammerService';
export default scammerService;
