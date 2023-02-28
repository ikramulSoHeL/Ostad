import axios from "axios";
import React, { useState } from "react";

// import NewFolderForm from "./NewFolderForm";

function Folder({ folder, onNewFolder }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState([]);

  async function fetchChildren() {
    const response = await axios.get(
      `http://localhost:5001/api/folders/${folder._id}`
    );
    setChildren(response.data);
    console.log(response.data);
  }

  function handleNewFolder(newFolder) {
    setChildren((prevChildren) => [...prevChildren, newFolder]);
    onNewFolder(newFolder);
  }

  return (
    <div>
      <div onClick={() => setIsExpanded(!isExpanded)}>
        {folder.name}
        {isExpanded ? "-" : "+"}
      </div>
      {isExpanded && (
        <div style={{ marginLeft: "20px" }}>
          {children.map((child) => (
            <Folder
              key={child._id}
              folder={child}
              onNewFolder={handleNewFolder}
            />
          ))}
          {/* <NewFolderForm parent={folder._id} onNewFolder={handleNewFolder} /> */}
        </div>
      )}
    </div>
  );
}

export default Folder;
