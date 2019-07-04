const { handleError } = require("./util");

/** @param {MongoModel.User} userModel */
function createUser(userModel) {
  return handleError(async ({ body }, res) => {
    const [{ _id: id, ...user }] = await userModel.create([body]).lean();
    res.status(200).json({ id, user });
  });
}

/** @param {MongoModel.User} userModel */
function getUser(userModel) {
  return handleError(async ({ params: { id } }, res) => {
    const { _id, ...user } = await userModel.findById(id).lean();
    res.status(200).json({ id, ...user });
  });
}

/** @param {MongoModel.User} userModel */
function updateUser(userModel) {
  return handleError(async ({ body, params: { id } }, res) => {
    const { _id, ...user } = await userModel
      .updateOne({ _id: id }, body)
      .lean();

    res.status(200).json({ id, ...user });
  });
}

/**
 * Create the user router.
 * @typedef Args
 * @property {HTTPClient} client
 * @property {MongoModel.User} userModel
 * @param {import('express').Router} router
 * @param {Args} args
 * @return {import('express').Router}
 */
module.exports = function(router, { userModel }) {
  router.post("", createUser(userModel));
  router.get("/:id", getUser(userModel));
  router.patch("/:id", updateUser(userModel));
  return router;
};
