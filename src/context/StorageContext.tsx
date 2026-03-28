import { createContext } from "react";
import type { IFolder, IPrompt } from "../types";

/**
 * Interface for the Storage Context value.
 */
export interface IStorageContext {
  prompts: IPrompt[];
  folders: IFolder[];
  loading: boolean;
  addPrompt: (prompt: IPrompt) => void;
  addFolder: (folder: IFolder) => void;
  updatePrompt: (updated: IPrompt) => void;
  deletePrompt: (id: string) => void;
  refresh: () => void;
}

export const StorageContext = createContext<IStorageContext | undefined>(undefined);
