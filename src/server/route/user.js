const { handleError } = require("./util");

/** @param {MongoModel.User} userModel */
function createUser(userModel) {
  return handleError(async ({ body }, res) => {
    const [user] = await userModel.create([body]);
    res.status(200).json(user);
  });
}

/** @param {MongoModel.User} userModel */
function getUser(userModel) {
  return handleError(async ({ params: { id } }, res) => {
    const { _id, ...user } = await userModel.findById(id).lean();
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
  return router;
};
