import React, { useState, useCallback } from "react";
import type { IFolder, IPrompt } from "../types";
import { StorageContext } from "./StorageContext";

/**
 * Provider component that handles all storage logic and state.
 *
 * @param props - Component props containing children.
 * @returns The StorageProvider component.
 */
export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prompts, setPrompts] = useState<IPrompt[]>([]);
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Loads data from storage.
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
        // Extension environment - Using SYNC storage
        chrome.storage.sync.get(["prompts", "folders"], (result: { prompts?: IPrompt[]; folders?: IFolder[] }) => {
          setPrompts(result.prompts || []);
          setFolders(result.folders || []);
          setLoading(false);
        });
      } else {
        // Fallback for local development
        const savedPrompts = localStorage.getItem("promto_prompts");
        const savedFolders = localStorage.getItem("promto_folders");
        setPrompts(savedPrompts ? JSON.parse(savedPrompts) : []);
        setFolders(savedFolders ? JSON.parse(savedFolders) : []);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error loading data from storage:", error);
      setLoading(false);
    }
  }, []);

  /**
   * Saves data to storage.
   */
  const saveData = useCallback((newPrompts: IPrompt[], newFolders: IFolder[]) => {
    try {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.set({ prompts: newPrompts, folders: newFolders });
      } else {
        localStorage.setItem("promto_prompts", JSON.stringify(newPrompts));
        localStorage.setItem("promto_folders", JSON.stringify(newFolders));
      }
    } catch (error) {
      console.error("Error saving data to storage:", error);
    }
  }, []);

  // Load initial data
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const addPrompt = (prompt: IPrompt) => {
    const updated = [...prompts, prompt];
    setPrompts(updated);
    saveData(updated, folders);
  };

  const addFolder = (folder: IFolder) => {
    const updated = [...folders, folder];
    setFolders(updated);
    saveData(prompts, updated);
  };

  const deletePrompt = (id: string) => {
    const updated = prompts.filter((p) => p.id !== id);
    setPrompts(updated);
    saveData(updated, folders);
  };

  const updatePrompt = (updatedPrompt: IPrompt) => {
    const updated = prompts.map((p) => (p.id === updatedPrompt.id ? updatedPrompt : p));
    setPrompts(updated);
    saveData(updated, folders);
  };

  const value = {
    prompts,
    folders,
    loading,
    addPrompt,
    addFolder,
    updatePrompt,
    deletePrompt,
    refresh: loadData,
  };

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
};
