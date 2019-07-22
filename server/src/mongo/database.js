const mongoose = require("mongoose");
const { requireTruthy } = require("../util");

/** @param {string} [mongoURL] */
module.exports = async function(mongoURL) {
  let uri = requireTruthy(mongoURL || process.env.MONGODB_URL);
  await mongoose.connect(uri, { useNewUrlParser: true });
};
