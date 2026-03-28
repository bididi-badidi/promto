import { useContext } from "react";
import { StorageContext } from "../context/StorageContext";

/**
 * Custom hook to use the Storage Context.
 * Components calling this hook will always see the same shared data.
 * 
 * @returns The storage context value.
 * @throws Error if used outside of a StorageProvider.
 */
export function useStorageContext() {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error("useStorageContext must be used within a StorageProvider");
  }
  return context;
}

/**
 * Alias for useStorageContext for easier usage.
 */
export const useStorage = useStorageContext;
