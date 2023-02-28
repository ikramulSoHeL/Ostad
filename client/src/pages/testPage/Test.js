import React from "react";
import "./test.scss";
import FolderTree from "./FolderTree";
// import NewFolderForm from "./NewFolderForm";

function Test() {
  return (
    <div className="testPage">
      <h1>Folder Structure</h1>
      <FolderTree />
      {/* <NewFolderForm /> */}
    </div>
  );
}

export default Test;
