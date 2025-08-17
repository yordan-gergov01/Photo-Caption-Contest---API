const Photo = require("../models/Photo");
const User = require("../models/User");

const AppError = require("../utils/appError");
const cache = require("../utils/NodeCache");

const createPhoto = async (req, res, next) => {
  try {
    const { url, description } = req.body;

    // here it needs validation with special validation library
    if (!url) {
      return next(new AppError("URL for photo is required.", 400));
    }

    cache.del("all_photos");

    const photo = await Photo.create({
      url,
      description,
      user_id: req.user.id,
    });

    cache.set(`photo_${photo.dataValues.id}`, photo);

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
    const cachedPhotos = cache.get("all_photos");

    if (cachedPhotos) {
      return res.status(200).json({
        status: "success",
        data: cachedPhotos,
        cached: true,
      });
    }
    const photos = await Photo.findAll({
      include: [{ model: User, attributes: ["id", "username", "email"] }],
      order: [["created_at", "DESC"]],
    });

    cache.set("all_photos", photos);

    res.status(200).json({
      status: "success",
      results: photos.length,
      data: photos,
      cached: false,
    });
  } catch (error) {
    next(error);
  }
};

const getPhotoById = async (req, res, next) => {
  try {
    const photoId = req.params.id;

    const cachedPhoto = cache.get(`photo_${photoId}`);

    if (cachedPhoto) {
      return res.status(200).json({
        status: "success",
        data: cachedPhoto,
        cached: true,
      });
    }

    const photo = await Photo.findByPk(photoId, {
      include: [{ model: User, attributes: ["id", "username", "email"] }],
    });

    if (!photo) {
      return next(new AppError("Photo not found.", 404));
    }

    cache.set(`photo_${photoId}`, photo);
    res.status(200).json({
      status: "success",
      data: photo,
      cached: false,
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

    cache.del(`photo_${photoId}`);

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
