const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "users",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    freezeTableName: true,
    updatedAt: false,
  }
);

module.exports = User;
