import React, { useEffect, useState } from "react";
import "./homePage.scss";

// import folders from "./data";
import CreareFolderModal from "../../components/modals/CreareFolderModal";
import DeleteFolderModal from "../../components/modals/DeleteFolderModal";

import { getRootFolder } from "../../apis/folder.apis";

const HomePage = () => {
  const [opneCreateFolder, setOpneCreateFolder] = useState(false);
  const [opneDeleteFolder, setOpneDeleteFolder] = useState(false);
  const [selected, setSelected] = useState(null);

  const [rootFloder, setRootFolder] = useState({});

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  useEffect(() => {
    fetchRootdata();
  }, [rootFloder]);

  const fetchRootdata = async () => {
    getRootFolder()
      .then((res) => {
        setRootFolder(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="homePage">
      <div className="homePage__header">
        <span>Folder Structure</span>
      </div>

      <div className="homePage__container">
        <div className="wrapper1">
          {
            <div className="folderContainer">
              <div className="folderRow">
                <div className="item1" onClick={() => toggle(0)}>
                  <i className="fas fa-folder"></i>
                  <span>{rootFloder.name}</span>
                  {selected === 0 ? (
                    <i className="fas fa-chevron-up"></i>
                  ) : (
                    <i className="fas fa-chevron-down"></i>
                  )}
                </div>

                {/* <div className="item2">
                  <i
                    className="fa-solid fa-times"
                    onClick={() => setOpneDeleteFolder(true)}
                  />

                  <DeleteFolderModal
                    open={opneDeleteFolder}
                    onClose={() => setOpneDeleteFolder(false)}
                    deleteId={rootFloder._id}
                  />
                </div> */}

                <button
                  className="addFolderBtn"
                  onClick={() => setOpneCreateFolder(true)}
                >
                  <i className="fas fa-plus" />
                  <span>New</span>
                </button>

                <CreareFolderModal
                  open={opneCreateFolder}
                  onClose={() => setOpneCreateFolder(false)}
                  parentId={rootFloder._id}
                />
              </div>

              <div className={selected === 0 ? "content1 show1" : "content1"}>
                <>
                  {rootFloder.children
                    ? rootFloder.children.map((child, index) => {
                        return (
                          <div
                            className="folderRow"
                            key={index}
                            style={{ paddingLeft: 20, boxSizing: "border-box" }}
                          >
                            <div className="item1">
                              <i className="fas fa-folder"></i>
                              <span>{child.name}</span>
                              {selected === 0 ? (
                                <i className="fas fa-chevron-up"></i>
                              ) : (
                                <i className="fas fa-chevron-down"></i>
                              )}
                            </div>

                            <div className="item2">
                              <i
                                className="fa-solid fa-times"
                                onClick={() => setOpneDeleteFolder(true)}
                              />

                              <DeleteFolderModal
                                open={opneDeleteFolder}
                                onClose={() => setOpneDeleteFolder(false)}
                              />
                            </div>
                          </div>
                        );
                      })
                    : null}
                </>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default HomePage;
