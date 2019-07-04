const mongoose = require("mongoose");

/** @type {MongoSchemaDefinition<OmitKeys<AppUser, 'id'>>} */
const userSchemaDefinition = {
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }
};

const userSchema = new mongoose.Schema(userSchemaDefinition);
exports.UserModel = mongoose.model("user", userSchema);
