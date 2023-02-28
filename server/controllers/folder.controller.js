const FolderServices = require("../services/folder.service");

const createFolderController = async (req, res) => {
  FolderServices.createFolder(req.body)
    .then((data) => {
      return res.status(data?.status || 200).send({
        data: data?.data,
        message: data?.message,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
};

const getRootFolderController = async (req, res) => {
  FolderServices.getRootFolder()
    .then((data) => {
      return res.status(data?.status || 200).send({
        data: data?.data,
        message: data?.message,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
};

const getFoldersController = async (req, res) => {
  FolderServices.getFolders()
    .then((data) => {
      return res.status(data?.status || 200).send({
        data: data?.data,
        message: data?.message,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
};

const getFolderByIdController = async (req, res) => {
  FolderServices.getFolderById(req.params.id)
    .then((data) => {
      return res.status(data?.status || 200).send({
        data: data?.data,
        message: data?.message,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
};

module.exports = {
  createFolderController,
  getRootFolderController,
  getFoldersController,
  getFolderByIdController,
};
