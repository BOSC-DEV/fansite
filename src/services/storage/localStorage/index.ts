
// Re-export all localStorage services
export * from './localStorageUtils';
export * from './profileService';
export * from './commentService';
export * from './scammerService';

// For backward compatibility, re-export scammerService as storageService
import { scammerService } from './scammerService';
export const storageService = scammerService;
