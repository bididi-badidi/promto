/**
 * Interface for a prompt object.
 */
export interface IPrompt {
  id: string;
  title: string;
  content: string;
  folderId?: string;
}

/**
 * Interface for a folder object containing prompts and subfolders.
 */
export interface IFolder {
  id: string;
  name: string;
  parentId?: string;
  isOpen?: boolean;
}
