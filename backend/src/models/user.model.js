import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";
import bcrypt from "bcryptjs";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

/**
 * Compare a plaintext password with the user's hashed password
 * @param {string} password Plain text password
 * @returns {Promise<boolean>} true if match
 */
User.prototype.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
