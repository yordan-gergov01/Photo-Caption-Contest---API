const express = require("express");

const {
  createPhoto,
  getPhotoById,
  getAllPhotos,
  deletePhoto,
} = require("../controllers/photosController");

const protect = require("../middlewares/authMiddleware");

const photosRouter = express.Router();

photosRouter.use(protect);

photosRouter.get("/", getAllPhotos);
photosRouter.get("/:id", getPhotoById);
photosRouter.post("/", createPhoto);
photosRouter.delete("/:id", deletePhoto);

module.exports = photosRouter;
