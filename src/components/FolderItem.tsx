import React, { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Folder, ChevronRight, FolderOpen } from "lucide-react";
import type { IFolder, IPrompt } from "../types";
import { PromptItem } from "./PromptItem";
import { cn } from "../lib/utils";

/**
 * Interface for the FolderItem component props.
 */
interface IFolderItemProps {
  folder: IFolder;
  prompts: IPrompt[];
  subfolders: IFolder[];
  allFolders: IFolder[];
  allPrompts: IPrompt[];
  className?: string;
  newPromptId?: string | null;
  onUpdatePrompt?: (updated: IPrompt) => void;
  onDeletePrompt?: (id: string) => void;
}

/**
 * A collapsible folder component with glassmorphism style.
 * 
 * @param props - The component props.
 * @returns The FolderItem component.
 */
export const FolderItem: React.FC<IFolderItemProps> = ({
  folder,
  prompts,
  subfolders,
  allFolders,
  allPrompts,
  className,
  newPromptId,
  onUpdatePrompt,
  onDeletePrompt
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("w-full transition-all duration-300", className)}
    >
      <Collapsible.Trigger asChild>
        <div className="group flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all duration-200">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-celestial-violet/10 group-hover:bg-celestial-violet/20 shrink-0 transition-colors">
            {isOpen ? (
              <FolderOpen className="w-4 h-4 text-celestial-violet" />
            ) : (
              <Folder className="w-4 h-4 text-celestial-violet" />
            )}
          </div>
          
          <span className="text-sm font-semibold text-text-h truncate flex-1">
            {folder.name}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-text/20 group-hover:text-text/40 transition-colors">
              {prompts.length + subfolders.length}
            </span>
            <div className="w-4 h-4 flex items-center justify-center transition-transform duration-300" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              <ChevronRight className="w-4 h-4 text-text/20 group-hover:text-text/40" />
            </div>
          </div>
        </div>
      </Collapsible.Trigger>

      <Collapsible.Content className="pl-4 mt-1 border-l border-white/10 space-y-1 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out">
        <div className="pt-1 pb-1 space-y-1">
          {subfolders.map((sub) => (
            <FolderItem
              key={sub.id}
              folder={sub}
              prompts={allPrompts.filter((p) => p.folderId === sub.id)}
              subfolders={allFolders.filter((f) => f.parentId === sub.id)}
              allFolders={allFolders}
              allPrompts={allPrompts}
              newPromptId={newPromptId}
              onUpdatePrompt={onUpdatePrompt}
              onDeletePrompt={onDeletePrompt}
            />
          ))}

          {prompts.map((prompt) => (
            <PromptItem 
              key={prompt.id} 
              prompt={prompt} 
              initialEdit={prompt.id === newPromptId}
              onUpdate={onUpdatePrompt}
              onDelete={onDeletePrompt}
            />
          ))}

          {prompts.length === 0 && subfolders.length === 0 && (
            <div className="py-2 px-4 text-[10px] text-text/20 italic">
              Empty folder
            </div>
          )}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
