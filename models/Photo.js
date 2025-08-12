const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Photo = sequelize.define(
  "photos",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

Photo.belongsTo(User, { foreignKey: "user_id" });

module.exports = Photo;
