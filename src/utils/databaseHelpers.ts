
/**
 * Utility functions for working with database data
 */

// Safely get a property from a potentially null or undefined object
export function safeGet<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined {
  if (!obj) return undefined;
  return obj[key];
}

// Safely spread an object, returning an empty object if the input is null or undefined
export function safeSpread<T>(obj: T | null | undefined): Partial<T> {
  if (!obj) return {};
  return { ...obj };
}

// Safely get an array, returning an empty array if the input is null or undefined
export function safeArray<T>(arr: T[] | null | undefined): T[] {
  if (!arr) return [];
  return [...arr];
}

// Safely access a property with a default value
export function safeGetWithDefault<T, K extends keyof T, D>(
  obj: T | null | undefined,
  key: K,
  defaultValue: D
): T[K] | D {
  if (!obj) return defaultValue;
  const value = obj[key];
  return value !== undefined && value !== null ? value : defaultValue;
}

// Safely wrap a database response to ensure we have a valid array
export function safeDBResponse<T>(data: T[] | null): T[] {
  return data || [];
}

// Type guard to check if an object has a property
export function hasProperty<T, K extends string>(obj: T, key: K): obj is T & Record<K, unknown> {
  return obj !== null && typeof obj === 'object' && key in obj;
}

// Type guard to check if a value is not null or undefined
export function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
