const User = require("../models/User");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ where: { userId } });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProfile;
