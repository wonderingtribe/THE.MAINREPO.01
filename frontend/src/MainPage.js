import { useState } from "react";

// Helper to generate random file size
const randomFileSize = () => Math.floor(Math.random() * 1000) + " KB";

export default function MainPage() {
  const [files, setFiles] = useState([
    { name: "index.html", size: randomFileSize(), modified: new Date() },
    { name: "style.css", size: randomFileSize(), modified: new Date() },
    { name: "script.js", size: randomFileSize(), modified: new Date() },
  ]);

  const [newFile, setNewFile] = useState("");
  const [newFolder, setNewFolder] = useState("");

  // Add new file
  const addFile = () => {
    if (newFile && !files.some(f => f.name === newFile)) {
      setFiles([...files, { name: newFile, size: randomFileSize(), modified: new Date() }]);
      setNewFile("");
    }
  };

  // Delete file
  const deleteFile = (name) => {
    setFiles(files.filter(f => f.name !== name));
  };

  // Rename file
  const renameFile = (oldName) => {
    const newName = prompt("Enter new file name:", oldName);
    if (newName && !files.some(f => f.name === newName)) {
      setFiles(files.map(f => f.name === oldName ? { ...f, name: newName, modified: new Date() } : f));
    }
  };

  // Duplicate file
  const duplicateFile = (name) => {
    const file = files.find(f => f.name === name);
    if (file) {
      let copyName = name.replace(/(\.\w+)$/, "_copy$1");
      setFiles([...files, { ...file, name: copyName, modified: new Date() }]);
    }
  };

  // Add folder (simulated as file ending with /)
  const addFolder = () => {
    if (newFolder && !files.some(f => f.name === newFolder + "/")) {
      setFiles([...files, { name: newFolder + "/", size: "-", modified: new Date() }]);
      setNewFolder("");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>WonderSpace File Manager</h1>

      {/* Create File */}
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="New file name..."
          value={newFile}
          onChange={(e) => setNewFile(e.target.value)}
        />
        <button onClick={addFile}>Create File</button>
      </div>

      {/* Create Folder */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="New folder name..."
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
        />
        <button onClick={addFolder}>Create Folder</button>
      </div>

      {/* File List */}
      <ul>
        {files.map((file) => (
          <li key={file.name} style={{ marginBottom: 5 }}>
            <strong>{file.name}</strong> | Size: {file.size} | Last Modified: {file.modified.toLocaleString()}
            <button onClick={() => deleteFile(file.name)} style={{ color: "red", marginLeft: 5 }}>Delete</button>
            <button onClick={() => renameFile(file.name)} style={{ marginLeft: 5 }}>Rename</button>
            <button onClick={() => duplicateFile(file.name)} style={{ marginLeft: 5 }}>Duplicate</button>
          </li>
        ))}
      </ul>
    </div>
  );
}