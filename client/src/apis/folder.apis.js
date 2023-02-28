import axios from "axios";

import {
  CREATE_FOLDER_URL,
  GET_FOLDER_URL,
  GET_ROOT_FOLDER_URL,
  GET_FOLDERBYID_URL,
} from "../utils/urls";

export const createFolder = (data) => {
  console.log("data", data);
  return axios({
    method: "POST",
    url: CREATE_FOLDER_URL,
    data: {
      name: data.name,
      parent: data.parent,
    },
  });
};

export const getFolder = () => {
  return axios({
    method: "GET",
    url: GET_FOLDER_URL,
  });
};

export const getRootFolder = () => {
  return axios({
    method: "GET",
    url: GET_ROOT_FOLDER_URL,
  });
};

export const getFolderById = (id) => {
  return axios({
    method: "GET",
    url: GET_FOLDERBYID_URL + "/" + id,
  });
};
