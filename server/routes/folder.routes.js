const {
  createFolderController,
  getFoldersController,
  getRootFolderController,
  getFolderByIdController,
} = require("../controllers/folder.controller");

const router = require("express").Router();

router.post("/", createFolderController);
router.get("/root", getRootFolderController);
router.get("/", getFoldersController);
router.get("/:id", getFolderByIdController);

module.exports = router;
