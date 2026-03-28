import React from "react";
import { FolderItem } from "./FolderItem";
import type { IFolder, IPrompt } from "../types";

/**
 * Interface for the FolderList component props.
 */
interface IFolderListProps {
  folders: IFolder[];
  prompts: IPrompt[];
  newPromptId?: string | null;
  onUpdatePrompt?: (updated: IPrompt) => void;
  onDeletePrompt?: (id: string) => void;
}

/**
 * Displays a list of top-level folders and their nested contents.
 * 
 * @param props - The component props.
 * @returns The FolderList component.
 */
export const FolderList: React.FC<IFolderListProps> = ({ 
  folders, 
  prompts,
  newPromptId,
  onUpdatePrompt,
  onDeletePrompt
}) => {
  const topLevelFolders = folders.filter((f) => !f.parentId);

  if (topLevelFolders.length === 0) return null;

  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-text/40 px-2 uppercase tracking-[0.1em] mb-1">Folders</p>
      {topLevelFolders.map((folder) => (
        <FolderItem
          key={folder.id}
          folder={folder}
          prompts={prompts.filter((p) => p.folderId === folder.id)}
          subfolders={folders.filter((f) => f.parentId === folder.id)}
          allFolders={folders}
          allPrompts={prompts}
          newPromptId={newPromptId}
          onUpdatePrompt={onUpdatePrompt}
          onDeletePrompt={onDeletePrompt}
          className="mb-1"
        />
      ))}
    </div>
  );
};
