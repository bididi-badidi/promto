import React from "react";
import { FileText } from "lucide-react";
import { PromptItem } from "./PromptItem";
import type { IPrompt } from "../types";

/**
 * Interface for the PromptList component props.
 */
interface IPromptListProps {
  prompts: IPrompt[];
  title?: string;
  newPromptId?: string | null;
  onUpdate?: (updated: IPrompt) => void;
  onDelete?: (id: string) => void;
}

/**
 * Displays a list of prompts.
 * 
 * @param props - The component props.
 * @returns The PromptList component.
 */
export const PromptList: React.FC<IPromptListProps> = ({ 
  prompts, 
  title = "Library",
  newPromptId,
  onUpdate,
  onDelete
}) => {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="inline-block p-3 rounded-full bg-white/5 mb-2">
          <FileText className="w-5 h-5 text-text/20" />
        </div>
        <p className="text-xs text-text/30 italic">No prompts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-text/40 px-2 uppercase tracking-[0.1em] mb-1">{title}</p>
      {prompts.map((prompt) => (
        <PromptItem 
          key={prompt.id} 
          prompt={prompt} 
          initialEdit={prompt.id === newPromptId}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
