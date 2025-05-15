'use client';

// Interfaces for localStorage data structures
export interface UserSettings {
  sidebarCollapsed?: boolean; // Example: For a main sidebar
  editorLeftSidebarCategory?: string; // Last selected category in editor's left sidebar
  editorRightSidebarCollapsed?: boolean; // Example: For editor's right tool sidebar
  defaultZoomLevel?: number; // User's preferred default zoom if different from app default
  activeEditingTool?: string; // Currently selected editing tool in left sidebar
  // Add other UI preferences as needed
}

export interface RecentFileMetadata {
  documentId: string;
  filename: string;
  fileType: string; // MIME type
  category: string; // Editor category like 'pdf', 'office', etc.
  lastAccessed: number; // Timestamp
}

export interface EditorDocumentState {
  pdfDataUri?: string; // Base64 or object URL for PDF content
  documentId?: string; // The ID of the document being edited
  category?: string; // The category of the document (pdf, office, etc.)
  lastEdited?: string; // ISO timestamp of last edit
  lastPageNumber?: number;
  zoomLevel?: number;
  lastSelectedTool?: string; // For a specific document type/category
  pdfStorageSkipped?: boolean; // Indicates if PDF data was skipped due to size
  // Add other per-document editor states as needed
}

// Constants for localStorage keys
export const LOCAL_STORAGE_KEYS = {
  USER_SETTINGS: 'app_user_settings',
  RECENT_FILES: 'app_recent_files',
  EDITOR_STATE: 'app_editor_state',
  // For EditorDocumentState, the key will likely be dynamic, e.g., `editor_state_${documentId}`
};

// Estimated localStorage limit (varies by browser, but 5MB is a conservative estimate)
export const LOCAL_STORAGE_LIMIT = 5 * 1024 * 1024; // 5MB in bytes

/**
 * Checks approximate size of data to be stored
 * @param value The value to estimate size for
 * @returns The estimated size in bytes
 */
export const estimateDataSize = (value: unknown): number => {
  try {
    const serialized = JSON.stringify(value);
    // Multiply by 2 as JS strings use UTF-16 encoding (2 bytes per character)
    return serialized.length * 2;
  } catch (error) {
    console.error('Error estimating data size:', error);
    return 0;
  }
};

/**
 * Checks if there's enough storage space available for the given data
 * @param dataSize Size of data in bytes
 * @returns Boolean indicating if there's enough space
 */
export const hasEnoughStorageSpace = (dataSize: number): boolean => {
  try {
    // If the data is larger than our conservative estimate, don't even try
    if (dataSize > LOCAL_STORAGE_LIMIT) {
      return false;
    }

    // Try to actually check available space
    const testKey = `storage_test_${Date.now()}`;
    // Create a string of the appropriate size (half the size because each char is 2 bytes)
    const testValue = new Array(Math.ceil(dataSize / 2) + 1).join('a'); 
    
    try {
      localStorage.setItem(testKey, testValue);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  } catch {
    // If anything goes wrong, assume there isn't enough space
    return false;
  }
};

/**
 * Safely sets an item in the browser's localStorage.
 * Handles potential errors, including when localStorage is unavailable or full.
 * @param key The key under which to store the value.
 * @param value The value to store. Will be JSON.stringified.
 * @returns Boolean indicating if storage was successful
 */
export const setLocalStorageItem = <T>(key: string, value: T): boolean => {
  if (typeof window === 'undefined') {
    console.warn('localStorage is not available. Skipping setItem.');
    return false;
  }

  try {
    // First, estimate the size of the data
    const serializedValue = JSON.stringify(value);
    const estimatedSize = serializedValue.length * 2; // Rough size in bytes
    
    // For very large values (especially PDF data), check if we'll exceed quota
    if (estimatedSize > 2 * 1024 * 1024) { // If larger than 2MB
      console.warn(`Value for "${key}" is very large (${Math.round(estimatedSize/1024/1024)}MB), may exceed quota.`);
      
      // For PDF data, we might want to skip localStorage entirely
      if (key === LOCAL_STORAGE_KEYS.EDITOR_STATE && 
          (value as any)?.pdfDataUri?.startsWith('data:application/pdf')) {
        console.warn('Skipping localStorage for PDF data due to size constraints.');
        return false; // Skip storage but don't throw error
      }
    }
    
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error setting item "${key}" in localStorage:`, error);
    
    // Handle quota exceeded error specifically
    if (error instanceof DOMException && 
        (error.code === 22 || // Chrome quota exceeded
         error.code === 1014 || // Firefox quota exceeded
         error.name === 'QuotaExceededError' ||
         error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
      
      // For PDF data URI which is typically very large
      if (key === LOCAL_STORAGE_KEYS.EDITOR_STATE && 
          (value as any)?.pdfDataUri?.length > 100000) { // Large PDF data
        
        // Try to store just the metadata without the PDF data
        try {
          const metadataOnly = {
            ...(value as any),
            pdfDataUri: undefined, // Don't store the actual PDF data
            pdfStorageSkipped: true // Flag that PDF data was too large
          };
          localStorage.setItem(key, JSON.stringify(metadataOnly));
          console.warn('Stored metadata only, PDF data was too large for localStorage');
          return false; // Storage was partial
        } catch {
          // Even metadata storage failed
          console.error('Failed to store even metadata');
          return false;
        }
      }
    }
    
    return false; // Storage failed
  }
};

/**
 * Safely retrieves an item from the browser's localStorage.
 * Handles potential errors and parses the JSON string back to its original type.
 * @param key The key of the item to retrieve.
 * @returns The retrieved item, or null if not found or an error occurs.
 */
export const getLocalStorageItem = <T>(key: string): T | null => {
  if (typeof window === 'undefined') {
    console.warn('localStorage is not available. Skipping getItem.');
    return null;
  }
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Error getting item "${key}" from localStorage:`, error);
    return null;
  }
};

/**
 * Safely removes an item from the browser's localStorage.
 * @param key The key of the item to remove.
 */
export const removeLocalStorageItem = (key: string): void => {
  if (typeof window === 'undefined') {
    console.warn('localStorage is not available. Skipping removeItem.');
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item "${key}" from localStorage:`, error);
  }
};

// Example usage (optional - for demonstration or testing within this file if needed):
/*
if (typeof window !== 'undefined') {
  // Test setting an item
  setLocalStorageItem('testSetting', { message: 'Hello, localStorage!', count: 1 });

  // Test getting an item
  type TestType = { message: string; count: number };
  const retrievedItem = getLocalStorageItem<TestType>('testSetting');
  console.log('Retrieved item:', retrievedItem);

  // Test removing an item
  // removeLocalStorageItem('testSetting');
  // console.log('Item after removal:', getLocalStorageItem<TestType>('testSetting'));

  // Test getting a non-existent item
  // console.log('Non-existent item:', getLocalStorageItem('doesNotExist'));
}
*/ 