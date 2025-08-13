const express = require("express");

const {
  createCaption,
  getCaptionById,
  getCaptionsByPhoto,
  deleteCaption,
} = require("../controllers/captionsController");

const protect = require("../middlewares/authMiddleware");

const captionsRouter = express.Router();

captionsRouter.use(protect);

captionsRouter.get("/photo/:photoId", getCaptionsByPhoto);
captionsRouter.get("/:id", getCaptionById);
captionsRouter.post("/", createCaption);
captionsRouter.delete("/:id", deleteCaption);

module.exports = captionsRouter;
