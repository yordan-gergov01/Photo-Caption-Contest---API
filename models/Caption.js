const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Photo = require("./Photo");

const Caption = sequelize.define(
  "captions",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

Caption.belongsTo(User, { foreignKey: "user_id" });
Caption.belongsTo(Photo, { foreignKey: "photo_id" });

module.exports = Caption;
