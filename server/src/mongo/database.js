const mongoose = require("mongoose");
const { requireTruthy } = require("../util");

module.exports = async function() {
  let uri = requireTruthy(process.env.MONGODB_URL);
  await mongoose.connect(uri, { useNewUrlParser: true });
};
