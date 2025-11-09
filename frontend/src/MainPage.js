import { useState } from "react";

export default function MainPage() {
  const [files, setFiles] = useState(["index.html", "style.css", "script.js"]);
  const [newFile, setNewFile] = useState("");

  const addFile = () => {
    if (newFile && !files.includes(newFile)) {
      setFiles([...files, newFile]);
      setNewFile("");
    }
  };

  const deleteFile = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>WonderSpace File Manager</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Enter file name..."
          value={newFile}
          onChange={(e) => setNewFile(e.target.value)}
        />
        <button onClick={addFile}>Create File</button>
      </div>

      <ul>
        {files.map((file) => (
          <li key={file}>
            {file}{" "}
            <button onClick={() => deleteFile(file)} style={{ color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}