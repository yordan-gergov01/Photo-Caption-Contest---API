const Caption = require("../models/Caption");
const User = require("../models/User");
const Photo = require("../models/Photo");
const AppError = require("../utils/appError");

const createCaption = async (req, res, next) => {
  try {
    const { text, photo_id } = req.body;

    // here it needs validation with special validation library
    if (!text || !photo_id) {
      return next(new AppError("Text and photo_id are required.", 400));
    }

    const caption = await Caption.create({
      text,
      photo_id,
      user_id: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: caption,
    });
  } catch (error) {
    next(error);
  }
};

const getCaptionsByPhoto = async (req, res, next) => {
  try {
    const photoId = req.params.photo_id;

    const captions = await Caption.findAll({
      where: { photoId },
      include: [
        { model: User, attributes: ["id", "username", "email"] },
        { model: Photo, attributes: ["id", "url", "description"] },
      ],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      results: captions.length,
      data: captions,
    });
  } catch (error) {
    next(error);
  }
};

const getCaptionById = async (req, res, next) => {
  try {
    const caption = await Caption.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "username", "email"] },
        { model: Photo, attributes: ["id", "url", "description"] },
      ],
    });

    if (!caption) {
      return next(new AppError("Caption not found.", 404));
    }

    res.status(200).json({
      status: "success",
      data: caption,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCaption = async (req, res, next) => {
  try {
    const caption = await Caption.findByPk(req.params.id);

    if (!caption) {
      return next(new AppError("Caption not found.", 404));
    }

    if (caption.user_id !== req.user.id) {
      return next(
        new AppError("You are not allowed to delete this caption.", 403)
      );
    }

    await caption.destroy();

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCaption,
  getCaptionById,
  getCaptionsByPhoto,
  deleteCaption,
};
