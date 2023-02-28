const express = require("express");
const router = express.Router();
const Folder = require("../models/folder.schema");

// Create a new folder
router.post("/", async (req, res) => {
  try {
    const { name, parent } = req.body;
    console.log("name: ", name);
    console.log("parent: ", parent);

    const folder = new Folder({ name, parent });
    if (parent) {
      const parentFolder = await Folder.findById(parent);
      if (!parentFolder) {
        return res.status(404).json({ error: "Parent folder not found" });
      }
      parentFolder.children.push(folder);
      await parentFolder.save();
    }
    await folder.save();
    res.json(folder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all folders
router.get("/", async (req, res) => {
  try {
    const folders = await Folder.find({ parent: null }).populate("children");
    res.json(folders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a folder and its children
router.get("/:id", async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id).populate("children");
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }
    res.json(folder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a folder
router.put("/:id", async (req, res) => {
  try {
    const { name, parent } = req.body;
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }
    if (name) {
      folder.name = name;
    }
    if (parent !== undefined) {
      if (folder.parent) {
        const parentFolder = await Folder.findById(folder.parent);
        parentFolder.children.pull(folder);
        await parentFolder.save();
      }
      if (parent) {
        const newParentFolder = await Folder.findById(parent);
        if (!newParentFolder) {
          return res.status(404).json({ error: "Parent folder not found" });
        }
        newParentFolder.children.push(folder);
        await newParentFolder.save();
      }
      folder.parent = parent;
    }
    await folder.save();
    res.json(folder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a folder and its children
router.delete("/:id", async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }
    if (folder.parent) {
      const parentFolder = await Folder.findById(folder.parent);
      parentFolder.children.pull(folder);
      await parentFolder.save();
    }
    await Folder.deleteMany({ _id: { $in: folder.children } });
    await folder.remove();
    res.json({ message: "Folder deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
