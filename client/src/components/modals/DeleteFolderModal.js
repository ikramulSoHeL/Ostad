import React from "react";
import "./modal.scss";

const deleteFolderModal = ({ open, onClose, deleteId }) => {
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
              <span className="modalHeaderText">Delete Folder2</span>
            </div>

            <div className="modalButton">
              <button className="btn" onClick={onClose}>
                Cancel
              </button>
              <button className="btn">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default deleteFolderModal;
