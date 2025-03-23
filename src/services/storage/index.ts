
// Export all storage services

// Export interfaces
export type { UserProfile } from './profileService';
export type { ScammerListing } from './scammer/scammerTypes';

// Export services
export { storageService } from './storageService';
export { profileService } from './profileService';
export { scammerService } from './scammer/scammerService';

