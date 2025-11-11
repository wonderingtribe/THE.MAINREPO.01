import { create } from "zustand";

export type FileNode = {
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileNode[];
  lastModified?: number;
  size?: number;
};

type FileStore = {
  main: FileNode;
  activeFile: string | null;
  createFile: (path: string, name: string, type: "file" | "folder") => void;
  renameFile: (path: string, newName: string) => void;
  deleteFile: (path: string) => void;
  updateContent: (path: string, content: string) => void;
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
  setActiveFile: (name: string) => void;
};

export const useFileStore = create<FileStore>((set, get) => ({
  main: { name: "main", type: "folder", children: [] },
  activeFile: null,

  createFile: (path, name, type) => {
    const fs = { ...get().main };
    const folder = findNode(fs, path);
    if (!folder || folder.type !== "folder") return;
    folder.children = folder.children || [];
    folder.children.push({
      name,
      type,
      content: type === "file" ? "" : undefined,
      children: type === "folder" ? [] : undefined,
      lastModified: Date.now(),
      size: 0,
    });
    set({ main: fs });
    get().saveToLocalStorage();
  },

  renameFile: (path, newName) => {
    const fs = { ...get().main };
    const node = findNode(fs, path);
    if (node) node.name = newName;
    set({ main: fs });
    get().saveToLocalStorage();
  },

  deleteFile: (path) => {
    const fs = { ...get().main };
    deleteNode(fs, path);
    set({ main: fs });
    get().saveToLocalStorage();
  },

  updateContent: (path, content) => {
    const fs = { ...get().main };
    const node = findNode(fs, path);
    if (node && node.type === "file") {
      node.content = content;
      node.lastModified = Date.now();
      node.size = content.length;
    }
    set({ main: fs });
    get().saveToLocalStorage();
  },

  loadFromLocalStorage: () => {
    const data = localStorage.getItem("wonderspace_main");
    if (data) set({ main: JSON.parse(data) });
  },

  saveToLocalStorage: () => {
    const { main } = get();
    localStorage.setItem("wonderspace_main", JSON.stringify(main));
  },

  setActiveFile: (name) => set({ activeFile: name }),
}));

function findNode(node: FileNode, path: string): FileNode | undefined {
  if (path === node.name) return node;
  if (!node.children) return undefined;
  const parts = path.split("/").filter(Boolean);
  let current: FileNode | undefined = node;
  for (const part of parts.slice(1)) {
    current = current?.children?.find((c) => c.name === part);
    if (!current) return undefined;
  }
  return current;
}

function deleteNode(node: FileNode, path: string): void {
  if (!node.children) return;
  const parts = path.split("/").filter(Boolean);
  if (parts.length < 2) return;
  const target = parts.pop();
  const parent = findNode(node, parts.join("/"));
  if (parent?.children)
    parent.children = parent.children.filter((c) => c.name !== target);
}