const { default: mongoose } = require("mongoose");
const Folder = require("../models/folder.schema");

const createFolder = async (data) => {
  try {
    const { name, parent } = data;
    // console.log(parent);

    const newFolder = new Folder({
      name,
      parent,
    });
    await newFolder.save();

    const parentId = mongoose.Types.ObjectId(parent);
    // console.log(parentId);

    const updateParent = await Folder.findOneAndUpdate(
      parentId,
      { $push: { children: newFolder } },
      { new: true }
    );
    await updateParent.save();

    return {
      status: 201,
      message: "Folder created successfully",
      data: newFolder,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

const getRootFolder = async () => {
  try {
    const rootFolder = await Folder.findOne({ parent: null }).populate(
      "children"
    );
    // const rootFolder = await Folder.findOne({ parent: null });
    return {
      status: 200,
      message: "Root folder fetched successfully",
      data: rootFolder,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

const getFolders = async () => {
  try {
    const rootFolder = await Folder.findOne({ parent: null }).populate(
      "children"
    );

    const folders = await Folder.find({}).populate("children");
    return {
      status: 200,
      message: "Folders fetched successfully",
      data: folders,
      rootFolder,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

const getFolderById = async (id) => {
  try {
    const folder = await Folder.findById(id).populate("children");
    // const folder = await Folder.findById(id);
    return {
      status: 200,
      message: "Folder fetched successfully",
      data: folder,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

const getFolderByParentId = async (id) => {
  try {
    const folder = await Folder.findById(id).populate("children");
    return {
      status: 200,
      message: "Folder fetched successfully",
      data: folder,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

module.exports = {
  createFolder,
  getRootFolder,
  getFolders,
  getFolderById,
};
