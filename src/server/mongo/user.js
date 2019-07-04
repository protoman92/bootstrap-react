const mongoose = require("mongoose");

/** @type {MongoSchemaDefinition<OmitKeys<AppUser, 'id'>>} */
const userSchemaDefinition = {
  firstName: { type: String, required: true, unique: false },
  lastName: { type: String, required: true, unique: false },
  username: { type: String, required: true, unique: true }
};

const userSchema = new mongoose.Schema(userSchemaDefinition, {
  strict: "throw",
  validateBeforeSave: true
});

exports.UserModel = mongoose.model("user", userSchema);
