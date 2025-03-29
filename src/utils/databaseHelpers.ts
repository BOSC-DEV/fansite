
import { safeGet, safeSpread, safeArray, safeGetWithDefault } from '@/lib/supabase-helpers';

/**
 * Utility functions for working with database data
 */

// Re-export the utility functions from supabase-helpers
export { safeGet, safeSpread, safeArray, safeGetWithDefault };

// Type guard to check if an object has a property
export function hasProperty<T, K extends string>(obj: T, key: K): obj is T & Record<K, unknown> {
  return obj !== null && typeof obj === 'object' && key in obj;
}

// Type guard to check if a value is not null or undefined
export function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

// Safely get a DB record
export function safeGetRecord<T>(record: T | null): Partial<T> {
  if (!record) return {};
  return { ...record };
}

// Safely access object property and provide a type cast
export function safeGetAs<T, K extends keyof T, R>(obj: T | null | undefined, key: K): R | undefined {
  if (!obj) return undefined;
  const value = obj[key];
  return value as unknown as R;
}

// Create wrapper function to safely handle spread of potentially null objects
export function safeSpreader<T>(obj: T | null | undefined): Partial<T> {
  if (!obj) return {};
  return { ...obj as object } as Partial<T>;
}

// Safely cast a database response to an array of a specific type
export function safeTypeArray<T>(data: any[] | null): T[] {
  if (!data) return [];
  return data as T[];
}

// Process database data with type safety
export function processDbResult<T>(data: any | null, defaultValue: T): T {
  if (!data) return defaultValue;
  return data as T;
}
