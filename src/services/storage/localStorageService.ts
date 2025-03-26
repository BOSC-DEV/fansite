
// Re-export everything from new structure for backward compatibility
export * from './localStorage';
export { profileService } from './localStorage/profileService';
export { commentService } from './localStorage/commentService';
export { scammerService } from './localStorage/scammerService';

// For backward compatibility
import { scammerService as localScammerService } from './localStorage/scammerService';
export { localScammerService as storageService };
export default localScammerService;
