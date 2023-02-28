import React, { useState } from "react";
import axios from "axios";

function NewFolderForm({ parentId }) {
  const [name, setName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post("http://localhost:5001/api/folder", {
      name,
      parent: parentId,
    });
    console.log(response.data);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Folder name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Create Folder</button>
    </form>
  );
}

export default NewFolderForm;
