import React, { useState, useEffect } from "react";
import axios from "axios";

function FolderTree() {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5001/api/folders");
      setFolders(response.data);
    }
    fetchData();
  }, []);

  async function handleFolderClick(folder) {
    if (selectedFolder && folder._id === selectedFolder._id) {
      setSelectedFolder(null);
    } else {
      setSelectedFolder(folder);
    }
  }

  async function handleAddFolder() {
    const response = await axios.post("http://localhost:5001/api/folders", {
      name: newFolderName,
      parentId: selectedFolder ? selectedFolder._id : null,
    });
    const newFolder = response.data;
    setFolders([...folders, newFolder]);
    setSelectedFolder(newFolder);
    setNewFolderName("");
  }

  async function handleDeleteFolder(folder) {
    await axios.delete(`http://localhost:5001/api/folders/${folder._id}`);
    setFolders(folders.filter((f) => f._id !== folder._id));
    setSelectedFolder(null);
  }

  function renderFolder(folder) {
    return (
      <div key={folder._id} style={{ marginLeft: 10 }}>
        <div onClick={() => handleFolderClick(folder)}>
          {folder.name} ({folder.children.length})
        </div>
        {selectedFolder && selectedFolder._id === folder._id && (
          <>
            {folder.children.map(renderFolder)}
            <div style={{ display: "flex", marginTop: 5 }}>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              <button onClick={handleAddFolder}>Add Folder</button>
              <button onClick={() => handleDeleteFolder(folder)}>Delete</button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>Folder Tree</h1>
      {folders.map(renderFolder)}
    </div>
  );
}

export default FolderTree;
