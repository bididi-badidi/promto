import React, { useState } from "react";
import { FileText, Copy, Check, Edit2, Save, Trash2 } from "lucide-react";
import type { IPrompt } from "../types";
import { cn } from "../lib/utils";

/**
 * Interface for the PromptItem component props.
 */
interface IPromptItemProps {
  prompt: IPrompt;
  className?: string;
  initialEdit?: boolean;
  onUpdate?: (updated: IPrompt) => void;
  onDelete?: (id: string) => void;
}

/**
 * A prompt item component that supports copying, editing, and deleting.
 * Redesigned for glassmorphism and compact layout.
 *
 * @param props - The component props.
 * @returns The PromptItem component.
 */
export const PromptItem: React.FC<IPromptItemProps> = ({
  prompt,
  className,
  initialEdit = false,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(initialEdit);
  const [editTitle, setEditTitle] = useState(prompt.title);
  const [editContent, setEditContent] = useState(prompt.content);
  const [copied, setCopied] = useState(false);

  /**
   * Copies the prompt content to the clipboard.
   */
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditing) return;

    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  /**
   * Saves the edited prompt.
   */
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdate) {
      onUpdate({
        ...prompt,
        title: editTitle,
        content: editContent,
      });
    }
    setIsEditing(false);
  };

  /**
   * Cancels editing and reverts changes.
   */
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditTitle(prompt.title);
    setEditContent(prompt.content);
    setIsEditing(false);

    // If it was a new empty prompt and cancelled, maybe delete it?
    // For now just close the editor.
  };

  /**
   * Deletes the prompt.
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(prompt.id);
    }
  };

  /**
   * Enters edit mode.
   */
  const enterEditMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div
        className={cn(
          "flex flex-col gap-2 p-3 rounded-xl bg-white/10 border border-celestial-violet/30 shadow-lg animate-in fade-in zoom-in-95 duration-200",
          className,
        )}
      >
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Prompt Title"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-semibold text-text-h focus:outline-none focus:ring-1 focus:ring-celestial-violet/50"
          autoFocus
        />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Prompt Content"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-text h-24 focus:outline-none focus:ring-1 focus:ring-celestial-violet/50 resize-none"
        />
        <div className="flex items-center justify-between mt-1">
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
            title="Delete Prompt"
            data-testid={`delete-prompt-${prompt.id}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-text/60 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
              data-testid="save-prompt-btn"
            >
              <Save className="w-3.5 h-3.5" />
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCopy}
      className={cn(
        "group flex items-center w-full text-left gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 cursor-pointer active:scale-[0.98] transition-all duration-200 shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-celestial-violet/50",
        className,
      )}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient opacity-80 group-hover:opacity-100 shrink-0 transition-opacity">
        <FileText className="w-4 h-4 text-white" />
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-semibold text-text-h truncate group-hover:text-celestial-violet transition-colors">
          {prompt.title}
        </span>
        <span className="text-[10px] text-text/40 truncate leading-tight">{prompt.content}</span>
      </div>

      <div className="shrink-0 flex items-center gap-1">
        <button
          onClick={enterEditMode}
          className="p-1.5 rounded-lg text-text/10 group-hover:text-text/30 hover:bg-white/5 hover:text-celestial-violet transition-all"
          title="Edit Prompt"
          data-testid={`edit-prompt-${prompt.id}`}
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <div className="flex items-center justify-center w-6 h-6">
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500 animate-in zoom-in-50 duration-200" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-text/10 group-hover:text-text/30 transition-colors" />
          )}
        </div>
      </div>
    </div>
  );
};
