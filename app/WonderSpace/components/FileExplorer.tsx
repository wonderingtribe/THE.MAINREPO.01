"use client";
import React from "react";
import { useFileStore } from "../store/useFileStore";
import { Folder, File, Plus, Trash2 } from "lucide-react";

export default function FileExplorer() {
  const { main, createFile, deleteFile, setActiveFile } = useFileStore();

  const renderTree = (node: any, path = node.name) => {
    if (node.type === "folder") {
      return (
        <div key={path} className="ml-2">
          <div className="flex items-center font-semibold text-blue-500">
            <Folder size={16} className="mr-1" /> {node.name}
          </div>
          <div className="ml-4">
            {node.children?.map((child: any) =>
              renderTree(child, `${path}/${child.name}`)
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={path}
          className="flex items-center text-gray-200 hover:text-white cursor-pointer"
          onClick={() => setActiveFile(path)}
        >
          <File size={14} className="mr-1" /> {node.name}
        </div>
      );
    }
  };

  return (
    <div className="p-2 bg-gray-800 h-full text-sm overflow-auto rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => createFile("main", "newFile.js", "file")}
          className="flex items-center bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500"
        >
          <Plus size={14} className="mr-1" /> File
        </button>
        <button
          onClick={() => deleteFile("main/newFile.js")}
          className="flex items-center bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
        >
          <Trash2 size={14} className="mr-1" /> Delete
        </button>
      </div>
      {renderTree(main)}
    </div>
  );
}