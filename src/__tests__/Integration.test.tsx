import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { StorageProvider } from "../context/StorageContextProvider";
import App from "../App";

describe("App Integration and Storage", () => {
  // Mock chrome.storage.sync
  const chromeStorageMock = (() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let store: Record<string, any> = {};
    return {
      get: vi.fn((keys, cb) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: Record<string, any> = {};
        if (Array.isArray(keys)) {
          keys.forEach((key) => {
            result[key] = store[key];
          });
        } else if (typeof keys === "string") {
          result[keys] = store[keys];
        } else {
          // Object with defaults
          Object.keys(keys).forEach((key) => {
            result[key] = store[key] !== undefined ? store[key] : keys[key];
          });
        }
        cb(result);
      }),
      set: vi.fn((data, cb) => {
        Object.assign(store, data);
        cb?.();
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();

  beforeEach(() => {
    chromeStorageMock.clear();
    vi.clearAllMocks();

    vi.stubGlobal("chrome", {
      storage: {
        sync: chromeStorageMock,
      },
    });

    // Ensure localStorage is NOT used by mocking it as empty/unused
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  it("loads prompts from chrome.storage.sync on mount", async () => {
    const mockPrompts = [{ id: "1", title: "Saved Prompt", content: "Saved Content" }];
    chromeStorageMock.set({ prompts: mockPrompts }, () => {});

    render(
      <StorageProvider>
        <App />
      </StorageProvider>,
    );

    // Wait for the prompt to appear
    await waitFor(() => {
      expect(screen.getByText("Saved Prompt")).toBeInTheDocument();
    });
  });

  it("adds a new prompt and saves it to chrome.storage.sync", async () => {
    render(
      <StorageProvider>
        <App />
      </StorageProvider>,
    );

    // Find and click the "Add Prompt" button
    const addPromptButton = screen.getByTitle("Add Prompt");
    fireEvent.click(addPromptButton);

    // A new PromptItem should appear in edit mode
    const titleInput = screen.getByPlaceholderText("Prompt Title");
    const contentInput = screen.getByPlaceholderText("Prompt Content");

    fireEvent.change(titleInput, { target: { value: "New Prompt" } });
    fireEvent.change(contentInput, { target: { value: "New Content" } });

    // Save button
    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    // Check if it's rendered in the list
    expect(screen.getByText("New Prompt")).toBeInTheDocument();

    // Check if chrome.storage.sync.set was called
    expect(chromeStorageMock.set).toHaveBeenCalledWith(
      expect.objectContaining({
        prompts: expect.arrayContaining([expect.objectContaining({ title: "New Prompt" })]),
      }),
    );
  });

  it("edits a prompt and persists the update", async () => {
    const mockPrompts = [{ id: "1", title: "Saved Prompt", content: "Saved Content" }];
    chromeStorageMock.set({ prompts: mockPrompts }, () => {});

    render(
      <StorageProvider>
        <App />
      </StorageProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Saved Prompt")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("edit-prompt-1"));
    fireEvent.change(screen.getByPlaceholderText("Prompt Title"), {
      target: { value: "Updated Title" },
    });
    fireEvent.click(screen.getByTestId("save-prompt-btn"));

    expect(screen.getByText("Updated Title")).toBeInTheDocument();

    expect(chromeStorageMock.set).toHaveBeenCalledWith(
      expect.objectContaining({
        prompts: expect.arrayContaining([expect.objectContaining({ id: "1", title: "Updated Title" })]),
      }),
    );
  });

  it("deletes a prompt and removes it from storage", async () => {
    const mockPrompts = [{ id: "1", title: "Saved Prompt", content: "Saved Content" }];
    chromeStorageMock.set({ prompts: mockPrompts }, () => {});

    render(
      <StorageProvider>
        <App />
      </StorageProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Saved Prompt")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("edit-prompt-1"));
    const deleteBtn = screen.getByTestId("delete-prompt-1");
    fireEvent.click(deleteBtn);

    expect(screen.queryByText("Saved Prompt")).not.toBeInTheDocument();

    expect(chromeStorageMock.set).toHaveBeenCalledWith(
      expect.objectContaining({
        prompts: [],
      }),
    );
  });

  it("searches for prompts", async () => {
    const mockPrompts = [
      { id: "1", title: "Apple", content: "Fruit" },
      { id: "2", title: "Banana", content: "Fruit" },
    ];
    chromeStorageMock.set({ prompts: mockPrompts }, () => {});

    render(
      <StorageProvider>
        <App />
      </StorageProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search library...");
    fireEvent.change(searchInput, { target: { value: "Apple" } });

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  it("loads and displays folders", async () => {
    const mockFolders = [{ id: "f1", name: "Work Prompts" }];
    const mockPrompts = [{ id: "p1", title: "Email Template", content: "Hello...", folderId: "f1" }];
    chromeStorageMock.set({ folders: mockFolders, prompts: mockPrompts }, () => {});

    render(
      <StorageProvider>
        <App />
      </StorageProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Work Prompts")).toBeInTheDocument();
    });

    const folderButton = screen.getByText("Work Prompts");
    fireEvent.click(folderButton);

    await waitFor(() => {
      expect(screen.getByText("Email Template")).toBeInTheDocument();
    });
  });

  it("shows empty state when no prompts exist", async () => {
    chromeStorageMock.set({ prompts: [], folders: [] }, () => {});
    render(
      <StorageProvider>
        <App />
      </StorageProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/no prompts found/i)).toBeInTheDocument();
    });
  });
});
