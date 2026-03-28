import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { PromptItem } from "../components/PromptItem";
import type { IPrompt } from "../types";

describe("PromptItem component", () => {
  const mockPrompt: IPrompt = {
    id: "1",
    title: "Test Prompt",
    content: "This is a test prompt content",
  };

  const mockOnUpdate = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it("renders the prompt title and content (truncated)", () => {
    render(<PromptItem prompt={mockPrompt} />);

    expect(screen.getByText("Test Prompt")).toBeInTheDocument();
    expect(screen.getByText("This is a test prompt content")).toBeInTheDocument();
  });

  it("copies the content when clicked", async () => {
    render(<PromptItem prompt={mockPrompt} />);

    // const container = screen.getByText('Test Prompt').closest('div[role="button"]') || screen.getByText('Test Prompt').parentElement?.parentElement;

    // The main div has onClick={handleCopy}
    fireEvent.click(screen.getByText("Test Prompt"));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("This is a test prompt content");

    // Check for "Check" icon after copy (simulated by checking if Check icon is present)
    // In the component, Check icon is shown when 'copied' is true
    // We can't easily check for the SVG but we can check if it's in the document if we had a way to identify it.
    // For now, verifying the clipboard call is good.
  });

  it("enters edit mode when the edit button is clicked", () => {
    render(<PromptItem prompt={mockPrompt} />);

    const editButton = screen.getByTitle("Edit Prompt");
    fireEvent.click(editButton);

    // Check for input and textarea
    expect(screen.getByPlaceholderText("Prompt Title")).toHaveValue("Test Prompt");
    expect(screen.getByPlaceholderText("Prompt Content")).toHaveValue("This is a test prompt content");
  });

  it("updates the prompt when edited and saved", () => {
    render(<PromptItem prompt={mockPrompt} onUpdate={mockOnUpdate} />);

    fireEvent.click(screen.getByTitle("Edit Prompt"));

    const titleInput = screen.getByPlaceholderText("Prompt Title");
    const contentInput = screen.getByPlaceholderText("Prompt Content");

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.change(contentInput, { target: { value: "Updated Content" } });

    fireEvent.click(screen.getByText("Save"));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      id: "1",
      title: "Updated Title",
      content: "Updated Content",
    });
  });

  it("deletes the prompt when the delete button is clicked in edit mode", () => {
    render(<PromptItem prompt={mockPrompt} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByTitle("Edit Prompt"));

    const deleteButton = screen.getByTitle("Delete Prompt");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("cancels editing when the cancel button is clicked", () => {
    render(<PromptItem prompt={mockPrompt} />);

    fireEvent.click(screen.getByTitle("Edit Prompt"));

    const titleInput = screen.getByPlaceholderText("Prompt Title");
    fireEvent.change(titleInput, { target: { value: "Changed" } });

    fireEvent.click(screen.getByText("Cancel"));

    // Should be back to non-edit mode
    expect(screen.queryByPlaceholderText("Prompt Title")).not.toBeInTheDocument();
    expect(screen.getByText("Test Prompt")).toBeInTheDocument();
  });
});
