import React, { useState } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { useStorageContext } from "../hooks/useStorage";
import { FolderList } from "./FolderList";
import { PromptList } from "./PromptList";
import { cn } from "../lib/utils";

/**
 * Interface for the PromptLibrary component props.
 */
interface IPromptLibraryProps {
  className?: string;
}

/**
 * The main component for managing and displaying the prompt library.
 * Now using StorageContext to share state across components.
 *
 * @param props - The component props.
 * @returns The PromptLibrary component.
 */
export const PromptLibrary: React.FC<IPromptLibraryProps> = ({ className }) => {
  const { prompts, folders, loading, addPrompt, addFolder, updatePrompt, deletePrompt } = useStorageContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [newPromptId, setNewPromptId] = useState<string | null>(null);

  const filteredPrompts = prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const orphanPrompts = filteredPrompts.filter((p) => !p.folderId);

  /**
   * Adds a new prompt and enters edit mode immediately.
   */
  const handleAddPrompt = () => {
    const id = Date.now().toString();
    const newPrompt = {
      id,
      title: "",
      content: "",
    };
    addPrompt(newPrompt);
    setNewPromptId(id);

    // Reset search so we can see the new prompt
    setSearchQuery("");
  };

  /**
   * Adds a new folder.
   */
  const handleAddFolder = () => {
    const id = Date.now().toString();
    addFolder({
      id,
      name: `New Folder`,
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-none h-full w-full glass overflow-hidden shadow-2xl transition-all",
        className,
      )}
    >
      {/* Header */}
      <div className="p-5 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gradient leading-tight">Promto</h2>
          <div className="flex gap-2">
            <button
              onClick={handleAddFolder}
              title="Add Folder"
              className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-text/60 hover:text-celestial-violet hover:bg-white/10 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddPrompt}
              title="Add Prompt"
              className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient text-white shadow-lg hover:scale-110 active:scale-95 transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/30 group-focus-within:text-celestial-violet transition-colors" />
          <input
            type="text"
            placeholder="Search library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm placeholder:text-text/30 focus:outline-none focus:ring-1 focus:ring-celestial-violet/30 focus:bg-white/10 transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-celestial-violet animate-spin" />
          </div>
        ) : searchQuery ? (
          <PromptList
            prompts={filteredPrompts}
            title="Search Results"
            onUpdate={updatePrompt}
            onDelete={deletePrompt}
          />
        ) : (
          <>
            {/* Folder Section */}
            <FolderList
              folders={folders}
              prompts={filteredPrompts}
              newPromptId={newPromptId}
              onUpdatePrompt={updatePrompt}
              onDeletePrompt={deletePrompt}
            />

            {/* Orphan Prompts Section */}
            <PromptList
              prompts={orphanPrompts}
              title="Library"
              newPromptId={newPromptId}
              onUpdate={updatePrompt}
              onDelete={deletePrompt}
            />
          </>
        )}
      </div>
    </div>
  );
};
