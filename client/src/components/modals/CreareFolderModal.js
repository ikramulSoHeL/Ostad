import React, { useEffect, useState } from "react";
import "./modal.scss";

import { createFolder } from "../../apis/folder.apis";

const CreareFolderModal = ({ open, onClose, parentId }) => {
  const [name, setName] = useState("");

  const parent = parentId;
  // console.log("parent", parent);

  useEffect(() => {
    createFolderHandler();
  }, []);

  const createFolderHandler = () => {
    createFolder({ name, parent })
      .then((res) => {
        console.log("res", res);
        setName("");
        onClose();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  if (!open) return null;

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="container__m">
          <div className="top">
            <i className="fa-solid fa-times" onClick={onClose}></i>
          </div>

          <div className="">
            <div className="modalHeader">
              <span className="modalHeaderText">Add floder in Folder2</span>
            </div>

            <div className="modalInput">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Folder name"
              />
            </div>

            <div className="modalButton">
              <button className="btn" onClick={onClose}>
                Cancel
              </button>
              <button className="btn" onClick={createFolderHandler}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreareFolderModal;
