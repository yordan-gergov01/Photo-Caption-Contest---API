const Photo = require("../models/Photo");
const User = require("../models/User");
const AppError = require("../utils/appError");

const createPhoto = async (req, res, next) => {
  try {
    const { url, description } = req.body;

    // here it needs validation with special validation library
    if (!url) {
      return next(new AppError("URL for photo is required.", 400));
    }

    const photo = await Photo.create({
      url,
      description,
      user_id: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: photo,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPhotos = async (req, res, next) => {
  try {
    const photos = await Photo.findAll({
      include: [{ model: User, attributes: ["id", "username", "email"] }],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      results: photos.length,
      data: photos,
    });
  } catch (error) {
    next(error);
  }
};

const getPhotoById = async (req, res, next) => {
  try {
    const photoId = req.params.id;

    const photo = await Photo.findByPk(photoId, {
      include: [{ model: User, attributes: ["id", "username", "email"] }],
    });

    if (!photo) {
      return next(new AppError("Photo not found.", 404));
    }

    res.status(200).json({
      status: "success",
      data: photo,
    });
  } catch (error) {
    next(error);
  }
};

const deletePhoto = async (req, res, next) => {
  try {
    const photoId = req.params.id;
    const photo = await Photo.findByPk(photoId);

    if (!photo) {
      return next(new AppError("Photo not found", 404));
    }

    if (photo.user_id !== req.user.id) {
      return next(
        new AppError("You are not allowed to delete this photo", 403)
      );
    }

    await photo.destroy();

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPhoto,
  getPhotoById,
  getAllPhotos,
  deletePhoto,
};
